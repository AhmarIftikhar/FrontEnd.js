import React, { useState, createContext } from "react";

const ServicesContext = createContext();

const ServicesContextProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  return (
    <ServicesContext.Provider
      value={{
        show,
        show1,
        handleClose,
        handleShow,
        handleClose1,
        handleShow1,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export { ServicesContext, ServicesContextProvider };
