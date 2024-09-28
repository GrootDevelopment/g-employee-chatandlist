import React, { useState, createContext } from "react";
import { useNuiEvent } from "../hooks/useNuiEvent";

import { isEnvBrowser } from "../utils/misc";
import { employeeChatProps, exployeeListsProps } from "../@types/AllTypes.t";
import fakeChat from "../fakedata/fakechatdata";
import fakeEmployees from "../fakedata/employeelists";

interface GlobalDataProps {
  Messages: employeeChatProps[];
  setMessages: React.Dispatch<React.SetStateAction<employeeChatProps[]>>; // Add setMessages
  employeeLists: exployeeListsProps[];
  setEmployeeLists: React.Dispatch<React.SetStateAction<exployeeListsProps[]>>; // Add setter for employeeLists
  EnableChat: boolean | undefined;
  setEnableChat: React.Dispatch<React.SetStateAction<boolean | undefined>>; // Add setter for EnableChat
  TotalEmployees: number | string;
  TotalOnlineEmployee: number | string;
  myName: string;
  myJob: string;
  setMyName: React.Dispatch<React.SetStateAction<string>>;
  setMyJob: React.Dispatch<React.SetStateAction<string>>;
}


export const GlobalCtx = createContext<GlobalDataProps | null>(null);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [Messages, setMessages] = useState<employeeChatProps[]>(isEnvBrowser() ? fakeChat : []);
  const [employeeLists, setEmployeeLists] = useState<exployeeListsProps[]>(isEnvBrowser() ? fakeEmployees : []);
  const [EnableChat, setEnableChat] = useState<boolean | undefined>(isEnvBrowser() ? true : undefined);
  const [TotalEmployees, setTotalEmployees] = useState<number | string>("15");
  const [TotalOnlineEmployee, setTotalOnlineEmployee] = useState<number | string>("5");
  const [myName, setMyName] = useState<string>("");
  const [myJob, setMyJob] = useState<string>("");

  useNuiEvent(
    "justgroot:g-employeeslistandchat:send-mydetails",
    (data: { name: string; job: string }) => {
      setMyName(data.name);
      setMyJob(data.job);
    }
  );

  useNuiEvent('justgroot:g-employeeslistandchat:send-all-chat-to-nui', (data: employeeChatProps) => {
    setMessages(prevMessages => [...prevMessages, data]);
  })

  useNuiEvent("justgroot:g-employeeslistandchat:send-data-to-nui", (data: GlobalDataProps) => {
    setEmployeeLists(data.employeeLists);
    setEnableChat(data.EnableChat);
    setTotalEmployees(data.TotalEmployees);
    setTotalOnlineEmployee(data.TotalOnlineEmployee);
  });

  return (
    <GlobalCtx.Provider
      value={{
        Messages,
        setMessages,
        employeeLists,
        setEmployeeLists,
        EnableChat,
        setEnableChat,
        TotalEmployees,
        TotalOnlineEmployee,
        myName,
        setMyName,
        myJob,
        setMyJob,
      }}
    >
      {children}
    </GlobalCtx.Provider>
  );
};
