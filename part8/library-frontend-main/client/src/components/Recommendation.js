import { useQuery } from "@apollo/client";
import { ALL_BOOKS, GET_GENRES, ME, RECOMMEND } from "../queries";
import { useEffect, useState } from "react";

const Recommendation = () => {
  const favGenreQuery = useQuery(RECOMMEND);
  if (favGenreQuery.loading) {
    return <p>Loading....</p>;
  }
  const books = favGenreQuery.data.recommend;
  return (
    <div>
      <h2>Recommendation</h2>

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
    </div>
  );
};

export default Recommendation;
