import type { NavigationGroup } from "@/types/navigation";

export const navigation = {
  primary: [
    { href: "/", label: "Home", available: true },
    { href: "/blog", label: "Blogs", available: true },
    { href: "/experiences", label: "Experiences", available: true },
  ],
  secondary: [],
} as const satisfies NavigationGroup;

export const availableNavigation = navigation.primary.filter((item) => item.available);
