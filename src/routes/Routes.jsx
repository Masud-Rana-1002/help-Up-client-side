import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/Login";
import Register from "../pages/Register/Register";
import AddVolunteerPostForm from "../pages/Private-route/volunteer-post-page/AddVolunteerPostForm";

import Home from "../pages/Home/Home";
import Page404 from "../pages/Page404/Page404";
import AllVolunteerNeedPosts from "../pages/AllvolunteerNeedposts/AllvolunteerNeedposts";
import VolunteerNeedPostDetails from "../pages/Private-route/VolunteerNeedPostDetails";
import Modal from "../pages/Private-route/Modal";
import Table from "../pages/Private-route/Table";

const routes = createBrowserRouter(
  [
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
      },
      {
        
        path:"/VolunteerNeedPostDetails/:id",
        element: <VolunteerNeedPostDetails></VolunteerNeedPostDetails>,
        loader: ({params})=> fetch(`${import.meta.env.VITE_VOLUNTEER_MANAGEMENT_SERVER_URL}/api/postDetails/${params.id}`)
      },{
        path:'/modal/:id',
        element: <Modal></Modal>,
        loader: ({params})=> fetch(`${import.meta.env.VITE_VOLUNTEER_MANAGEMENT_SERVER_URL}/api/postDetails/${params.id}`)
      },{
        path: '/manageMyPosts/:email',
        element:<Table></Table>,
        loader: ({params})=> fetch(`${import.meta.env.VITE_VOLUNTEER_MANAGEMENT_SERVER_URL}/api/myPost/${params.email}`)

      }
    ]
    
  },
]);
export default routes;