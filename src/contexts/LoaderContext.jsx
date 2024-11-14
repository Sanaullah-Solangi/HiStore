import { createContext, useRef, useState, useContext } from "react";

export const LoaderContext = createContext();

export default function LoaderContextProvider({ children }) {
  const [loader, setLoader] = useState(false);
  const showLoader = () => {
    setLoader(true);
    console.log("showLoader at context=>", loader);
  };
  const hideLoader = () => {
    setLoader(false);
    console.log("hideLoader at context=>", loader);
  };
  return (
    <LoaderContext.Provider
      value={{ loader, setLoader, hideLoader, showLoader }}
    >
      {children}
    </LoaderContext.Provider>
  );
}
