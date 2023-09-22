import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks/useField";

const CreateNew = ({ addNew, handleNotification }) => {
  const content = useField("content");
  const author = useField("author");
  const info = useField("info");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    handleNotification(`a new anecdote ${content.value} created!`);
    navigate("/");
  };
  function handleReset(e) {
    e.preventDefault();
    content.onReset();
    author.onReset();
    info.onReset();
  }
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button type='button' onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
