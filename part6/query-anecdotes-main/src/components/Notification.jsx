import { useContext } from "react";
import { useNotification } from "../contexts/NotificationContext";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };
  const { notification } = useNotification();
  if (!notification.message) return null;

  return <div style={style}>{notification.message}</div>;
};

export default Notification;
