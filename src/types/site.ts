export type NavLink = {
  label: string;
  href: string;
};

export type SocialLink = NavLink & {
  icon: "github" | "linkedin" | "email";
};
