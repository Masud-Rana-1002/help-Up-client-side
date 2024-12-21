import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes.jsx";
import ThemeProviderContext from "./context/ThemeProviderContext.jsx";
import AuthContextProvider from "./context/AuthContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <ThemeProviderContext>
        <RouterProvider router={routes} />
      </ThemeProviderContext>
    </AuthContextProvider>
  </StrictMode>
);
