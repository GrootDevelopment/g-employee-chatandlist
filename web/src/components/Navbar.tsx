import React, { FC } from "react";
import UserIcon from "../icons/UserIcon";

import { rgba, useMantineTheme } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import ChatIcon from "../icons/chatIcon";
import useGlobal from "../context/useGlobal";

const Navbar: FC = () => {
  const theme = useMantineTheme();
  const location = useLocation();
  const global = useGlobal();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="flex flex-col ">
        <Link
          to="/"
          className={`px-3 py-2 rounded-md ${
            isActive("/") ? "text-white" : ""
          }`}
          style={{
            backgroundColor: rgba(theme.other.color_secondary, 78 / 100),
          }}
        >
          <UserIcon />
        </Link>
        {global.EnableChat && (
          <Link
            to="/employee-chat"
            className={`px-3 py-2 mt-2 rounded-md ${
              isActive("/employee-chat") ? "text-white" : ""
            }`}
            style={{
              backgroundColor: rgba(theme.other.color_secondary, 78 / 100),
            }}
          >
            <ChatIcon />
          </Link>
        )}
      </nav>
    </>
  );
};

export default Navbar;
