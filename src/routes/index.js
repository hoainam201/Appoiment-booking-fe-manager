import * as Pages from "../pages/index";

export const NormalRoutes = [
    {
        path: "/",
        element: <Pages.AppoimentList/>
    },
    {
        path: "/news/create",
        element: <Pages.CreatNews/>
    },
    {
        path: "/news",
        element: <Pages.NewsList/>
    },
    {
        path: "/news/edit/:id",
        element: <Pages.EditNews/>
    },
    {
        path: "/profile",
        element: <Pages.Profile/>
    },
    {
        path: "/change-password",
        element: <Pages.Change/>
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
    },
    {
        path: "/forgot-password",
        element: <Pages.ForgotPassword/>
    },
]