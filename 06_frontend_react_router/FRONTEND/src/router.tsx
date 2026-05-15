import { createBrowserRouter } from "react-router";

import Home from "./routes/home";
import NotFound from "./routes/not-found";
import Root from "./routes/root";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        // La ruta raíz (Home) se renderiza cuando la URL es /
        index: true,
        element: <Home />,
      },
      {
        // La ruta * se renderiza cuando la URL no coincide con ninguna otra ruta
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
