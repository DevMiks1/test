const signupRoutes = [
  {
    path: "/signup",
    component: () => import("../layout/Signup.vue"),
    children: [
      {
        path: "",
        component: () => import("../views/Signup.vue"),
      },
    ],
    meta: { requiresAuth: false },
  },
];

export default signupRoutes;
