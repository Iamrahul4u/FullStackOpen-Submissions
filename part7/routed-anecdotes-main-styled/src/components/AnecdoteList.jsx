import { Link, useMatch } from "react-router-dom";
import Anecdote from "./Anecdote";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {anecdotes.map((anecdote) => (
                <TableRow key={anecdote.id}>
                  <TableCell>
                    <Link to={`/anecdote/${anecdote.id}`}>
                      {anecdote.content}
                    </Link>
                  </TableCell>
                  <TableCell>{anecdote.author}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ul>
    </div>
  );
};
export default AnecdoteList;
