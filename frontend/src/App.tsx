import "./App.scss";
import HomeLayout from "./components/Layouts/HomeLayout";
import ContactUs from "./pages/ContactUs/ContactUs";
import CourseDetails from "./pages/CourseDetails/CourseDetails";
import FAQs from "./pages/FAQs/FAQs";
import Home from "./pages/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OurValues from "./pages/OurValues/OurValues";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginLayout from "./components/Layouts/LoginLayout";
import Login from "./pages/Login/Login";
import DashboardLayout from "./components/Layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import CourseSyllabus from "./pages/CourseSyllabus/CourseSyllabus";
import axiosInstance from "./utils/axiosInstance";
import restEndPoints from "./data/restEndPoints.json";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./redux/slices/UserSliice";
import ProtectedRoute from "./utils/ProtectRoute";
import RestrictedRoute from "./utils/RestrictedRoute";
function App() {
  const dispatch = useDispatch();
  const [initialLoader, setInitialLoader] = useState(true);

  useEffect(() => {
    const auth = async () => {
      try {
        const response = await axiosInstance.get(`/${restEndPoints.auth}`);
        const studentDetails = response.data.student;
        dispatch(
          setUserDetails({
            enrolled: studentDetails.enrolled ? true : false,
            phoneNumber: studentDetails.phoneNumber,
            name: studentDetails.name,
            progress: studentDetails.enrolled
              ? studentDetails.enrolled.progress
              : 0,
            avatar: studentDetails.avatar,
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    auth();
  }, []);

  useEffect(() => {
    setTimeout(() => setInitialLoader(false), 2000);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: (
              <Home />
          ),
        },
        {
          path: "/contact",
          element: <ContactUs />,
        },
        {
          path: "/faqs",
          element: <FAQs />,
        },
        {
          path: "/course-details",
          element: <CourseDetails />,
        },
        {
          path: "/values",
          element: <OurValues />,
        },
      ],
    },
    {
      path: "/",
      element: <LoginLayout />,
      children: [
        {
          path: "/login",
          element: (
            <RestrictedRoute>
              <Login />
            </RestrictedRoute>
          ),
        },
        {
          path: "/signup",
          element: (
            <RestrictedRoute>
              <Login />
            </RestrictedRoute>
          ),
        },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "/course-syllabus",
          element: (
            <ProtectedRoute>
              <CourseSyllabus />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <div className="App">
      {initialLoader ? (
        <img
          className="initialLoader"
          src="/assets/loader_compressed.gif"
          alt="loader"
        />
      ) : (
        <RouterProvider router={router} />
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={2500}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
