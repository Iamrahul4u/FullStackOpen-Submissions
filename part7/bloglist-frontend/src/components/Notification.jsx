import { Alert } from "@mui/material";
import { useBlogs } from "../contexts/BlogsProvider";

const Notification = () => {
  const { notification, error } = useBlogs();

  if (!notification && !error) {
    return null;
  }
  return (
    <Alert severity={`${error ? "error" : "success"}`}>
      {error ? error : notification}
    </Alert>
  );
};

export default Notification;
