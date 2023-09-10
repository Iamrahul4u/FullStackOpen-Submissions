const Notification = ({ message }) => {
  const { error, success } = message;
  if (error === null) {
    return null;
  }

  return <div className={`${success ? "success" : "error"}`}>{error}</div>;
};

export default Notification;
