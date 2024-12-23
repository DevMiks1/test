type ProfileMenuItems = {
  id: number;
  title: string;
  icon: string;
  to: string;
};
export const profileMenuItems: ProfileMenuItems[] = [
  {
    id: 1,
    title: "Company Profile",
    icon: "mdi-domain",
    to: "/dashboard/company-profile",
  },
  { id: 2, title: "Help", icon: "mdi-help-circle", to: "/dashboard/help" },
  { id: 3, title: "Settings", icon: "mdi-cog", to: "/dashboard/settings" },
];
