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
        element: <Pages.Staff/>
    },
    {
        path: "/facility-profile",
        element: <Pages.Facility/>
    },
    {
        path: "/change-password",
        element: <Pages.Change/>
    },
    {
        path: "/staff",
        element: <Pages.StaffList/>
    },
    {
        path: "/service",
        element: <Pages.ServiceList/>
    },
    {
        path: "/service/create",
        element: <Pages.ServiceCreate/>
    },
    {
        path: "/service/detail/:id",
        element: <Pages.ServiceDetail/>
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