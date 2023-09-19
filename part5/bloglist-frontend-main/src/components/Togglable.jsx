import { forwardRef, useImperativeHandle, useState } from "react";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);
  const hidden = { display: visible ? "none" : "" };
  const show = { display: visible ? "" : "none" };

  const toggleVisible = () => {
    setVisible(!visible);
  };
  useImperativeHandle(refs, () => {
    return toggleVisible;
  });
  return (
    <div>
      <div style={hidden}>
        <button onClick={toggleVisible} id="open-form">{props.buttonLabel}</button>
      </div>
      <div style={show}>
        {props.children}
        <button onClick={toggleVisible}>Cancel</button>
      </div>
    </div>
  );
});

export default Togglable;
