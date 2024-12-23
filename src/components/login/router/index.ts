const loginRoutes = [
  {
    path: "/login",
    component: () => import("../layout/LoginLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("../views/Login.vue"),
      },
    ],
    meta: { requiresAuth: false },
  },
];

export default loginRoutes;
