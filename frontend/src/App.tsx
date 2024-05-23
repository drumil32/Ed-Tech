// import { useState } from "react";
import "./App.scss";
import HomeLayout from "./components/Layouts/HomeLayout";
import ContactUs from "./pages/ContactUs/ContactUs";
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
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

// const App = () => {
//   return (
//     <AboutUs/>
//   );
// }





export default App;
