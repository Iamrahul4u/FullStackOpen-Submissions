import { useQuery } from "@apollo/client";
import { ALL_BOOKS, GET_GENRES } from "../queries";
import { useEffect, useState } from "react";

const Books = () => {
  const result = useQuery(ALL_BOOKS);
  const genres = useQuery(GET_GENRES);

  function handleGenre(genre) {
    result.refetch({ genre: genre });
  }
  if (result.loading) {
    return <div>Loading...</div>;
  }
  const books = result.data.allBooks;
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres &&
        genres.data.getGenres.map((genre) => {
          return (
            <button key={genre} onClick={() => handleGenre(genre)}>
              {genre}
            </button>
          );
        })}
    </div>
  );
};

export default Books;
