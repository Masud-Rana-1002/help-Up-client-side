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
import UpdatePost from "../pages/Private-route/UpdatePost";
import MyVolunteerRequest from "../pages/MyVolunteerRequest/MyVolunteerRequest";
import { axiosInstance } from "../utils/hooks/useAxiosSecure";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

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
        element:<PrivateRoute><AddVolunteerPostForm></AddVolunteerPostForm></PrivateRoute> 
      },
      {
        path:"/allVolunteerNeedPosts",
        element: <AllVolunteerNeedPosts></AllVolunteerNeedPosts>
      },
      {
        
        path:"/VolunteerNeedPostDetails/:id",
        element: <PrivateRoute><VolunteerNeedPostDetails></VolunteerNeedPostDetails></PrivateRoute>,
        loader: ({params})=> fetch(`${import.meta.env.VITE_VOLUNTEER_MANAGEMENT_SERVER_URL}/api/postDetails/${params.id}`)
      },{
        path:'/modal/:id',
        element:<PrivateRoute> <Modal></Modal></PrivateRoute>,
        loader: ({params})=> fetch(`${import.meta.env.VITE_VOLUNTEER_MANAGEMENT_SERVER_URL}/api/postDetails/${params.id}`)
      },{
        path: '/manageMyPosts/:email',
        element:<PrivateRoute><Table></Table></PrivateRoute>,
        loader: ({params})=> fetch(`${import.meta.env.VITE_VOLUNTEER_MANAGEMENT_SERVER_URL}/api/myPost/${params.email}`)

      },{
        path: '/updatePost/:id',
        element:<UpdatePost></UpdatePost>,
        loader:  ({params})=> fetch(`${import.meta.env.VITE_VOLUNTEER_MANAGEMENT_SERVER_URL}/api/postDetails/${params.id}`)
      },

      {
        path: '/myVolunteerReq',
        element: <MyVolunteerRequest></MyVolunteerRequest>,
      }
    ]
    
  },
]);
export default routes;