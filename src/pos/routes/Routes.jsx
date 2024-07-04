import { createBrowserRouter } from "react-router-dom";
import App from "../../App.jsx";
import NotFound from "../page/NotFound/NotFound.jsx";
import { authRoutes } from "./AuthRoutes/authRoutes.jsx";
import { dashboardRoute } from "./ChildrenRoute/dashboardRoute.jsx";
import { dueRoute } from "./ChildrenRoute/dueRoute.jsx";
import { expenseRoute } from "./ChildrenRoute/expenseRoute.jsx";
import { incomeRoute } from "./ChildrenRoute/incomeRoute.jsx";
import { lossProfitRoute } from "./ChildrenRoute/lossProfitRoute.jsx";
import { partyRoute } from "./ChildrenRoute/partyRoute.jsx";
import { productsRoute } from "./ChildrenRoute/productsRoute.jsx";
import { purchaseRoute } from "./ChildrenRoute/purchaseRoute.jsx";
import { reportsRoute } from "./ChildrenRoute/reportsRoute.jsx";
import { salesRoute } from "./ChildrenRoute/salesRoute.jsx";
import { settingsRoute } from "./ChildrenRoute/settingsRoute.jsx";
import { stockRoute } from "./ChildrenRoute/stockRoute.jsx";
import { warehouseRoute } from "./ChildrenRoute/warehouseRoute.jsx";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <NotFound />,
    children: [
      ...dashboardRoute, // home page, like dashboard (index: true)
      ...authRoutes,
      ...salesRoute,
      ...purchaseRoute,
      ...dueRoute,
      ...productsRoute,
      ...warehouseRoute,
      ...incomeRoute,
      ...lossProfitRoute,
      ...stockRoute,
      ...expenseRoute,
      ...partyRoute,
      ...settingsRoute,
      ...reportsRoute,
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default Routes;
