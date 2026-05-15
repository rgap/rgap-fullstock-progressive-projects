import { createBrowserRouter } from "react-router";

import Home from "./routes/home";
import NotFound from "./routes/not-found";
import Root from "./routes/root";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
