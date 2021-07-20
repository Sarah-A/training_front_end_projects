import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

const Modal = ({ children }) => {
  // useRef create a ref which exist outside the re-render cycle.
  // This means that every cycle can use it (the same one), using ref.current but
  // it doesn't triggers a re-render when it changes.
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    modalRoot.appendChild(elRef.current);
    // This returns a cleanup function for this effect that will run automatically by React when
    // it unmounts this component (the same that would run in componentWillUnmount() in a React Component):
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  // children are all the elements under the <Modal> tag.
  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
