import "@mantine/core";

declare module "@mantine/core" {
  export interface MantineThemeOther {
    color_dark: string;
    color_secondary: string;
    color_tertiary: string;
    color_primary: string;
    color_white: string;
    color_danger: string;
    color_success: string;
    color_alert: string;
  }
}

export interface ThemeProps {
  dark: string;
  secondary: string;
  tertiary: string;
  primary: string;
  white: string;
  danger: string;
  success: string;
  alert: string;
}

export interface exployeeListsProps {
  id?: number | string | undefined;
  name: string;
  rank: string;
  isActive: boolean;
}

export interface employeeChatProps {
  id?: number | string;
  sender: string;
  message: string;
  job: string;
}

