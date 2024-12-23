const bookingRoutes = [
  {
    path: "/booking",
    component: () =>
      import("@/components/booking-request/layout/BookingLayout.vue"),
    children: [
      {
        path: "",
        component: () =>
          import("@/components/booking-request/views/BookingRequest.vue"),
      },
    ],
    meta: { requiresAuth: true, requiresActivation: true },
  },
];

export default bookingRoutes;
