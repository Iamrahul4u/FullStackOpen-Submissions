// const mongoose = require("mongoose");

// if (process.argv.length < 3) {
//   console.log("give password as argument");
//   process.exit(1);
// }

// const password = process.argv[2];
// const name = process.argv[3];
// const number = process.argv[4];
// const url = `mongodb+srv://iamrahulgupta4u:${password}@cluster0.byvahhi.mongodb.net/Person?retryWrites=true&w=majority`;
// mongoose.set("strictQuery", false);
// mongoose.connect(url);

// const noteSchema = new mongoose.Schema({
//   name: String,
//   number: Number,
// });

// const Person = mongoose.model("person", noteSchema);

// if (process.argv.length < 4) {
//   Person.find({}).then((persons) => {
//     console.log("phonebook:");
//     persons.forEach((person) => {
//       console.log(person.name, person.number);
//     });
//   });
// } else {
//   const person = new Person({
//     name: name,
//     number: number,
//   });
//   person.save().then(() => {
//     console.log("note saved!");
//     mongoose.connection.close();
//   });
// }

const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);
await mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const phoneSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

phoneSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", phoneSchema);
