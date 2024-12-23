const dashboardRoutes = [
  {
    path: "/dashboard",
    component: () => import("../layout/Dashboard.vue"),
    children: [
      {
        path: "",
        component: () => import("../dashboard/views/Dashboard.vue"),
      },
      {
        path: "employee",
        component: () => import("../employee/views/Employee.vue"),
        meta: { requiresAuth: true, requiresActivation: true },
      },
      {
        path: "trips-history",
        component: () => import("../trips-history/views/TripsHistory.vue"),
        meta: { requiresAuth: true, requiresActivation: true },
      },
      {
        path: "company-profile",
        component: () => import("../company-profile/views/CompanyProfile.vue"),
        meta: { requiresAuth: true },
      },
    ],
    meta: { requiresAuth: true },
  },
];

export default dashboardRoutes;
