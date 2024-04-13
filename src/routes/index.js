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
        path: "/guide",
        element: <Pages.GuideList/>
    },
    {
        path: "*",
        element: <Pages.NotFound/>
    }
]

export const AuthRoutes = [
    {
        path: "/login",
        element: <Pages.Login/>
    }
]