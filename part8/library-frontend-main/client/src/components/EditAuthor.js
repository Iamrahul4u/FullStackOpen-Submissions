import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, UPDATE_BIRTH } from "../queries";
import React from "react";
import Select from "react-select";

function EditAuthor() {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  const [updateBirth] = useMutation(UPDATE_BIRTH, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const authors = useQuery(ALL_AUTHORS);
  const options = authors.data.allAuthors.map((author) => {
    return { value: author.name, label: author.name };
  });
  function handleSubmit() {
    updateBirth({ variables: { name: selectedValue, setBornTo: born } });
    setBorn("");
    setName("");
  }
  return (
    <div>
      name
      <Select
        options={options}
        onChange={(selectedOption) => setSelectedValue(selectedOption.value)}
      />
      <br />
      born
      <input
        type='text'
        value={born}
        onChange={({ target }) => setBorn(() => Number(target.value))}
      />
      <br />
      <button onClick={() => handleSubmit()}>Update</button>
    </div>
  );
}

export default EditAuthor;
