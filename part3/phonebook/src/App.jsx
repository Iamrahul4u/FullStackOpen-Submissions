import { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import axios from "axios";
import {
  addPerson,
  deletePerson,
  getPerson,
  updatePerson,
} from "./services/personapi";
import Notification from "./components/Notification";

const initialError = { error: "", success: true };
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [errorMessage, setError] = useState(initialError);

  function handleAdd() {
    // check if the person exist or not
    const isExist = persons.some((person) => person.name === newName);
    console.log(isExist);
    if (isExist) {
      window.confirm(
        `${newName} is already added to phonebook,replace the old number with a new one`
      );
      const id = persons.find((person) => person.name === newName).id;
      // find the person to be updated
      const person = persons.find((n) => n.name === newName);
      // find the id to be updated
      const updatedPerson = { ...person, number: phoneNum };

      // updating the person and setting the new persons array using map
      updatePerson(id, updatedPerson).then((res) =>
        setPersons(persons.map((person) => (person.id !== id ? person : res)))
      );
    } else {
      const newnumber = {
        name: newName,
        number: phoneNum,
      };
      // if new person then simply add it to the array
      addPerson(newnumber)
        .then((res) => {
          setPersons([...persons, res]);
          setError({
            ...errorMessage,
            error: `Added ${newName}`,
            success: true,
          });
        })
        .catch((error) =>
          setError({
            ...errorMessage,
            error: error.response.data.error,
            success: false,
          })
        );
    }
    setTimeout(() => {
      setError(initialError);
    }, 5000);
    setNewName("");
    setPhoneNum("");
  }
  function handleSearch(e) {
    e.preventDefault();
    setResults(() =>
      persons.filter((person) =>
        person.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }
  function handleDelete(person) {
    const isDelete = window.confirm(`Delete ${person.name}`);
    if (isDelete) {
      try {
        deletePerson(person.id);
        setPersons(persons.filter((n) => n.name !== person.name));
      } catch (err) {
        setError({
          ...errorMessage,
          error: `Information of ${newName} has already been removed from server`,
          success: false,
        });
        setTimeout(() => {
          setError(initialError);
        }, 5000);
      }
    }
  }
  useEffect(() => {
    getPerson()
      .then((res) => setPersons(res))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      {errorMessage.error && <Notification message={errorMessage} />}
      <Filter query={query} setQuery={setQuery} onSearch={handleSearch} />
      <h2>add a new</h2>
      <PersonForm
        onAdd={handleAdd}
        newName={newName}
        setNewName={setNewName}
        phoneNum={phoneNum}
        setPhoneNum={setPhoneNum}
      />
      <h2>Numbers</h2>
      {query?.length > 0 ? (
        <Persons persons={results} onDelete={handleDelete} />
      ) : (
        <Persons persons={persons} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default App;
