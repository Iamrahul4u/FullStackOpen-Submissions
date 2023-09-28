const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { mongoose, mongo, connect } = require("mongoose");
const Book = require("./models/books");
const jwt = require("jsonwebtoken");
const Author = require("./models/authors");
const { GraphQLError } = require("graphql");
const { User } = require("./models/User");
require("dotenv").config();

mongoose.set("strictQuery", false);
const MONGODB_URI = process.env.MONGODB_URI;
console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.log("error", error.message);
  });
const randomGenerator = () => {
  return Math.floor(Math.random() * 1000000000);
};

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Author{
    name: String!
    id:ID!
    born: Int
    bookCount:Int!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genre:String,author:String):[Book!]!
    allAuthors:[Author!]!
    me: User

    }
  type Mutation{
    addBook(title:String!,author:String!,published:Int!,genres:[String!]!):Book!
    editAuthor(name:String!,setBornTo:Int! ):Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.genre) {
        return (await Book.find({})).filter((book) =>
          book.genres.includes(args.genre)
        );
      } else {
        return books;
      }
    },
    allAuthors: () => {
      return authors.map((author) => {
        const bookCount = books.filter(
          (book) => book.author === author.name
        ).length;
        return {
          ...author,
          bookCount,
        };
      });
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
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
