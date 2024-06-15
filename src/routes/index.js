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
    path: "/facility",
    element: <Pages.FacilityList/>
  },
  {
    path: "/facility/detail/:id",
    element: <Pages.FacilityDetail/>
  },
  {
    path: "/facility/create",
    element: <Pages.FacilityCreate/>
  },
  {
    path: "/appointment",
    element: <Pages.DoctorAppointmentList/>
  },
  {
    path: "/appointment/detail/:id",
    element: <Pages.AppointmentDetail/>
  }, {
    path: "/user",
    element: <Pages.UserList/>
  },
  {
    path: "*",
    element: <Pages.NotFound/>
  },
  {
    path: "/dashboard",
    element: <Pages.Dashboard/>
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