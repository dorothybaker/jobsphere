import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { useQuery } from "@tanstack/react-query";
import { API } from "./utils/makeRequest";
import NewListing from "./pages/NewListing";
import NewCompanyListing from "./pages/NewCompanyListing";
import Job from "./pages/Job";
import EditJob from "./pages/EditJob";

function Layout() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="px-4 max-w-5xl mx-auto w-full flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

function App() {
  const { data: user } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await API.get("/auth/me");

        if (res.status === 200) {
          const data = res.data;

          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    refetchOnWindowFocus: false,
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/new-listing",
          element: user ? <NewListing /> : <Navigate to={"/signin"} />,
        },
        {
          path: "/new-listing/:id",
          element: user ? <NewCompanyListing /> : <Navigate to={"/signin"} />,
        },
        // {
        //   path: "/jobs/edit/:id",
        //   element: user ? <EditJob /> : <Navigate to={"/signin"} />,
        // },
        {
          path: "/jobs/:id",
          element: <Job />,
        },
      ],
    },
    { path: "/signin", element: user ? <Navigate to={"/"} /> : <Signin /> },
    { path: "/signup", element: user ? <Navigate to={"/"} /> : <Signup /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
