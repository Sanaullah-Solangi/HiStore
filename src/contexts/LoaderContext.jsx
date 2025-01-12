import { createContext, useState } from "react";

export const LoaderContext = createContext();

export default function LoaderContextProvider({ children }) {
  const [loader, setLoader] = useState(false);
  const showLoader = () => {
    setLoader(true);
  };
  const hideLoader = () => {
    setLoader(false);
  };
  return (
    <LoaderContext.Provider
      value={{ loader, setLoader, hideLoader, showLoader }}
    >
      {children}
    </LoaderContext.Provider>
  );
}
