import "./App.scss";
import HomeLayout from "./components/Layouts/HomeLayout";
import ContactUs from "./pages/ContactUs/ContactUs";
import CourseDetails from "./pages/CourseDetails/CourseDetails";
import FAQs from "./pages/FAQs/FAQs";
import Home from "./pages/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OurValues from "./pages/OurValues/OurValues";
import { useEffect, useState } from "react";
// import AboutUs from "./components/organisms/AboutUs/AboutUs";

function App() {
  const [initialLoader, setInitialLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => setInitialLoader(false), 3_000);
  }, []);

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
          element: <CourseDetails />
        },
        {
          path: "/values",
          element: <OurValues />
        }
      ],
    },
  ]);

  return (
    initialLoader ? <img src="/assests/loader_compressed.gif" alt="loader" /> :
      <div className="App">
        <RouterProvider router={router} />
      </div>
  );
}

export default App;
