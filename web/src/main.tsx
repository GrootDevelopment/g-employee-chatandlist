import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import Root from "./Root";
import { isEnvBrowser } from "./utils/misc";
import LocalizationProvider from "./context/LocalizationProvider";
import { GlobalProvider } from "./context/GlobalProvider";

if (isEnvBrowser()) {
  const root = document.getElementById("root");

  // Preload the background image
  const img = new Image();
  img.src = "https://i.imgur.com/3pzRj9n.png"; // or any other URL

  img.onload = () => {
    root!.style.backgroundImage = `url(${img.src})`;
    root!.style.backgroundSize = "cover";
    root!.style.backgroundRepeat = "no-repeat";
    root!.style.backgroundPosition = "center";
    root!.style.height = "100vh";
    root!.style.width = "100vw";
  };
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <VisibilityProvider> */}
    <LocalizationProvider>
      <GlobalProvider>
        <Root />
      </GlobalProvider>
      {/* </VisibilityProvider> */}
    </LocalizationProvider>
  </StrictMode>
);
