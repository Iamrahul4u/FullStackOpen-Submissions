import { Box, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Typography sx={{ minWidth: 100 }}>
          <Link
            to='/'
            color='inherit'
            variant='body2'
            sx={{ p: 1, flexShrink: 0 }}
          >
            Blogs
          </Link>
        </Typography>
        <Typography sx={{ minWidth: 100 }}>
          <Link
            to='/users'
            style={{ margin: 5 }}
            color='inherit'
            variant='body2'
            sx={{ p: 1, flexShrink: 0 }}
          >
            users
          </Link>
        </Typography>
      </Box>
    </>
  );
}

export default Menu;
