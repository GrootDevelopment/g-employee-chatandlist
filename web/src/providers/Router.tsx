import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import EmployeeLists from "../pages/EmployeeLists";
import EmployeeChat from "../pages/EmployeeChats";

const Router: FC = () => {
  return (
   <Routes>
      <Route path="/" element={<EmployeeLists />} />
      <Route path="/employee-chat" element={<EmployeeChat />} />
   </Routes>
  );
};

export default Router;
