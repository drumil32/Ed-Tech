import "./App.scss";
import HomeLayout from "./components/Layouts/HomeLayout";
import ContactUs from "./pages/ContactUs/ContactUs";
import CourseDetails from "./pages/CourseDetails/CourseDetails";
import FAQs from "./pages/FAQs/FAQs";
import Home from "./pages/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import AboutUs from "./components/organisms/AboutUs/AboutUs";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
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
          element: <CourseDetails/>
        }
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
