import * as Pages from "../pages/index";

export const NormalRoutes = [
  {
    path: "/",
    element: <Pages.AppoimentList/>
  },
  {
    path: "/guide/create",
    element: <Pages.CreateGuide/>
  },
  {
    path: "*",
    element: <Pages.NotFound/>
  }
]