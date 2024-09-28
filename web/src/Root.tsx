import React, { useEffect, useState } from "react";
import { createTheme, MantineProvider } from "@mantine/core";
import { useNuiEvent } from "./hooks/useNuiEvent";

import { FC } from "react";
import { ThemeProps } from "./@types/AllTypes.t";
import Layouts from "./layouts/layout";
import { HashRouter } from "react-router-dom";
import { fetchNui } from "./utils/fetchNui";
import { isEnvBrowser } from "./utils/misc";

const initialTheme = createTheme({
  other: {
    color_dark: "#201E1F",
    color_secondary: "#222831",
    color_tertiary: "#434242",
    color_primary: "#169399",
    color_white: "#FFFFFF",
    color_danger: "#DA373C",
    color_success: "#1AB754",
    color_alert: "#DBB724",
  },
});

const cssVariablesResolver = () => ({
  variables: {
    "--mantine-color-body": "transparent",
  },
  light: {
    "--mantine-color-body": "transparent",
  },
  dark: {
    "--mantine-color-body": "transparent",
    "--mantine-color-scheme": "light",
  },
});

const Root: FC = () => {
  const [theme, setTheme] = useState(initialTheme);
  const [visible, setVisible] = useState(false);
  useNuiEvent("g_pausemenu:setup:theme", (data: ThemeProps) => {
    setTheme((prevTheme) =>
      createTheme({
        other: {
          color_dark: data.dark || prevTheme.other?.color_dark,
          color_secondary: data.secondary || prevTheme.other?.color_secondary,
          color_tertiary: data.tertiary || prevTheme.other?.color_tertiary,
          color_primary: data.primary || prevTheme.other?.color_primary,
          color_white: data.white || prevTheme.other?.color_white,
          color_danger: data.danger || prevTheme.other?.color_danger,
          color_success: data.success || prevTheme.other?.color_success,
          color_alert: data.alert || prevTheme.other?.color_alert,
        },
        fontFamily: "Mukta",
        fontFamilyMonospace: "Mukta",
        focusRing: "never",
      })
    );
  });

  useEffect(() => {
    if (isEnvBrowser()) {
      setVisible(true);
    }
  }, []);

  useNuiEvent<boolean>("setVisible", (state) => {
    if (!isEnvBrowser()) {
      setVisible(state);
    }
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      if (!isEnvBrowser()) fetchNui("hideFrame");
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <MantineProvider
        theme={theme}
        defaultColorScheme="dark"
        cssVariablesResolver={cssVariablesResolver}
      >
        <HashRouter>{visible && <Layouts />}</HashRouter>
      </MantineProvider>
    </>
  );
};

export default Root;
