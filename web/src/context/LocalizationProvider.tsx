import React, { useState } from "react";
import { useNuiEvent } from "../hooks/useNuiEvent";

export interface Localization {
  employeelistTitle: string;
  onlineAndTotalEmployees: string;
  Name: string;
  Rank: string;
  Status: string;
  online: string;
  offline: string;
  employeeschat: string;
  chatinputplaceholder: string;
  noemployeesfound: string;
  employeeschatempty: string;
}

export const LocalizationCtx = React.createContext<Localization | undefined>(
  undefined
);


const LocalizationProvider = (props: { children: React.ReactNode }) => {
  const [localization, setLocalization] = useState<Localization>({
   employeelistTitle: "Employee Lists",
   onlineAndTotalEmployees: "online & Total employees",
   Name: "Name",
   Rank: "Rank",
   Status: "Status",
   online: "Online",
   offline: "Offline",
   employeeschat: "Employees Chat",
   chatinputplaceholder: "Chat Here",
   noemployeesfound: "No Employees has been Found!",
   employeeschatempty: "Employees Chat is Empty.."
    
  });

  useNuiEvent("g-employee-chatandlist:localizations", (data: Localization) => {
    setLocalization(data);
  });
  return (
    <LocalizationCtx.Provider value={localization}>
      {props.children}
    </LocalizationCtx.Provider>
  );
};

export default LocalizationProvider;