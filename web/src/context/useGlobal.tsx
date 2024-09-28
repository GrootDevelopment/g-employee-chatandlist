import { useContext } from "react";
import { GlobalCtx } from "./GlobalProvider"; // adjust the import path as necessary

const useGlobal = () => {
  const context = useContext(GlobalCtx);
  if (!context) {
    throw new Error(
      "useGlobal must be used within a GlobalProvider"
    );
  }
  return context;
};

export default useGlobal;