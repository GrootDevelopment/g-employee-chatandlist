// UseLocalization.tsx
import React from "react";
import { LocalizationCtx } from "./LocalizationProvider";

const UseLocalization = () => {
  const context = React.useContext(LocalizationCtx);
  if (!context) {
    throw new Error(
      "UseLocalization must be used within a LocalizationProvider"
    );
  }
  return context;
};


export default UseLocalization;