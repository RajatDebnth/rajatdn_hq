import type { NavigationGroup } from "@/types/navigation";

export const navigation = {
  primary: [
    { href: "/", label: "Home", available: true },
    { href: "/systems", label: "Systems", available: true },
    { href: "/projects", label: "Projects", available: true },
    { href: "/architecture", label: "Architecture", available: true },
    { href: "/lab", label: "Lab", available: true },
    { href: "/blog", label: "Blog", available: true },
    { href: "/about", label: "About", available: true },
    { href: "/contact", label: "Contact", available: true },
  ],
  secondary: [
    { href: "/capabilities", label: "Capabilities", available: true },
    { href: "/industries", label: "Industries", available: true },
    { href: "/newsletter", label: "Newsletter", available: false },
    { href: "/resume", label: "Resume", available: true },
  ],
} as const satisfies NavigationGroup;

export const availableNavigation = navigation.primary.filter((item) => item.available);
