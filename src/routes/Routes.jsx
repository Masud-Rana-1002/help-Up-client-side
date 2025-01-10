import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/Login";
import Register from "../pages/Register/Register";
import AddVolunteerPostForm from "../pages/Private-route/volunteer-post-page/AddVolunteerPostForm";

import Home from "../pages/Home/Home";
import Page404 from "../pages/Page404/Page404";

import VolunteerNeedPostDetails from "../pages/Private-route/VolunteerNeedPostDetails";
import Modal from "../pages/Private-route/Modal";
import Table from "../pages/Private-route/Table";
import UpdatePost from "../pages/Private-route/UpdatePost";
import MyVolunteerRequest from "../pages/MyVolunteerRequest/MyVolunteerRequest";
import { axiosInstance } from "../utils/hooks/useAxiosSecure";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AboutUs from "../pages/AboutUs/AboutUs";
import AllVolunteerNeedPosts from "../pages/AllvolunteerNeedposts/AllVolunteerNeedPosts";
import ContactUs from "../pages/ContactUs/ContactUs";
import FAQSection from "../pages/FAQSection/FAQSection";

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
        path:"/AboutUs",
        element:<AboutUs></AboutUs>
      
      },
      {
        path:"/ContactUs",
        element:<ContactUs></ContactUs>
      
      },
      {
        path:"/faq",
        element:<FAQSection></FAQSection>
      
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
        element: <PrivateRoute><Table /></PrivateRoute>,
        loader: async ({ params }) => {
          const response = await fetch(
            `${import.meta.env.VITE_VOLUNTEER_MANAGEMENT_SERVER_URL}/api/myPost/${params.email}`, 
            {
              method: 'GET',
              credentials: 'include', // Include credentials in the request
              headers: {
                'Content-Type': 'application/json', // Optional, if you need it
              },
            }
          );
          if (!response.ok) {
            throw new Error('Failed to load posts'); // Handle non-2xx responses
          }
          return response.json();
        },
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