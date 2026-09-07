import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import MyPage from "./pages/MyPage";
import MainLayout from "./layouts/MainLayout";
//Dark/Light mode

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "mypage",
        element: <MyPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;