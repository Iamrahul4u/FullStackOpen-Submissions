import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector((state) => state.notification);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return (
    <>
      {" "}
      <div style={style}>{message.data}</div>
    </>
  );
};

export default Notification;
