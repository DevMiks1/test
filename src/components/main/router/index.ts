const mainRoutes = [
  {
    path: "/",
    component: () => import("../layout/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("../home/views/Home.vue"),
        meta: { requiresAuth: false },
      },

      {
        path: "about",
        component: () => import("../about/views/About.vue"),
        meta: { requiresAuth: false },
      },
      {
        path: "terms",
        component: () => import("../terms-services/views/TermsOfService.vue"),
        meta: { requiresAuth: false },
      },
      {
        path: "privacy-policy",
        component: () => import("../privacy-policy/views/PrivacyPolicy.vue"),
        meta: { requiresAuth: false },
      },
      {
        path: "faqs",
        component: () => import("../faqs/views/Faqs.vue"),
        meta: { requiresAuth: false },
      },
    ],
  },
];

export default mainRoutes;
