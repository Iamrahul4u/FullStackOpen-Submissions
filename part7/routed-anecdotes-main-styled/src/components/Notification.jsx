import { Alert } from "@mui/material";

function Notification({ notification }) {
  return (
    <div>
      <Alert severity='success'>{notification}</Alert>
    </div>
  );
}

export default Notification;
