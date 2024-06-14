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
    setTimeout(() => setInitialLoader(false), 2000);
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
          element: <CourseDetails />,
        },
        {
          path: "/values",
          element: <OurValues />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      {initialLoader ? (
        <img className="initialLoader" src="/assets/loader_compressed.gif" alt="loader" />
      ) : (
        <RouterProvider router={router} />
      )}
    </div>
  );
}

export default App;
