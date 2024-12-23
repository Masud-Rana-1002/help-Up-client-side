import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/Login";
import Register from "../pages/Register/Register";
import AddVolunteerPostForm from "../pages/Private-route/volunteer-post-page/AddVolunteerPostForm";

import Home from "../pages/Home/Home";
import Page404 from "../pages/Page404/Page404";
import AllVolunteerNeedPosts from "../pages/AllvolunteerNeedposts/AllvolunteerNeedposts";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement:<Page404></Page404>,
    children:[
      {
        path: "/",
        element:<Home></Home>
      },
      {
        path: "/login",
        element:<Login></Login>
      },
     
      {
        path:"/register",
        element: <Register></Register>
      },
      {
        path:"/AddVolunteerPost",
        element: <AddVolunteerPostForm></AddVolunteerPostForm>
      },
      {
        path:"/allVolunteerNeedPosts",
        element: <AllVolunteerNeedPosts></AllVolunteerNeedPosts>
      }
    ]
    
  },
]);
export default routes;