import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/Login";
import Register from "../pages/Register/Register";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[
      {
        path: "/login",
        element:<Login></Login>
      },
      {
        path:"/register",
        element: <Register></Register>
      }
    ]
    
  },
]);
export default routes;