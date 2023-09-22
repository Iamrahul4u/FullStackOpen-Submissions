import { AppBar, Button, IconButton, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`;
const Menu = () => {
  return (
    <AppBar position='static'>
      <Navigation>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='menu'
          ></IconButton>
          <Button color='inherit' component={Link} to='/'>
            anecdotes
          </Button>
          <Button color='inherit' component={Link} to='create'>
            create new
          </Button>
          <Button color='inherit' component={Link} to='about'>
            about
          </Button>
        </Toolbar>
      </Navigation>
    </AppBar>
  );
};
export default Menu;
