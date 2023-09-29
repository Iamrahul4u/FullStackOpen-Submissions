const Book = require("../models/books");
const Author = require("../models/authors");
const { User } = require("../models/User");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    getGenres: async () => {
      const genres = await Book.distinct("genres");
      return genres;
    },
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate("author");
      if (args.genre) {
        return books.filter((book) => book.genres.includes(args.genre));
      } else {
        return books;
      }
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      const books = await Book.find({}).populate("author");
      const authorsCount = authors.map((author) => {
        const bookCount = books.filter((book) => {
          return book.author.name === author.name;
        }).length;

        return {
          ...author.toObject(),
          bookCount,
        };
      });
      return authorsCount;
    },
    recommend: async (root, args, context) => {
      const books = await Book.find({}).populate("author");
      return books.filter((book) =>
        book.genres.includes(context.currentUser.favoriteGenre)
      );
    },
    me: (root, args, context) => {
      console.log(context.currentUser);
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      try {
        const existingAuthor = await Author.findOne({ name: args.author });
        let author;

        if (!existingAuthor) {
          author = await new Author({ name: args.author }).save();
        } else {
          author = existingAuthor;
        }

        const newBook = await new Book({
          title: args.title,
          author: author._id,
          published: args.published,
          genres: args.genres,
        }).save();

        pubsub.publish("BOOK_ADDED", { bookOnAdded: newBook });
        return newBook;
      } catch (error) {
        throw new GraphQLError("Saving Book Failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      }
    },

    editAuthor: async (root, { name, setBornTo }) => {
      try {
        const existingAuthor = await Author.findOne({ name });
        if (!existingAuthor) {
          return null;
        }
        existingAuthor.born = setBornTo;
        await existingAuthor.save();
        return existingAuthor;
      } catch {
        console.log("error");
      }
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      console.log(user);
      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      console.log(userForToken);
      let token = jwt.sign(userForToken, process.env.JWT_SECRET);
      console.log(token);
      return { value: token };
    },
  },
  Subscription: {
    bookOnAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
