export type NavigationItem = {
  href: `/${string}`;
  label: string;
  available?: boolean;
};

export type NavigationGroup = {
  primary: readonly NavigationItem[];
  secondary: readonly NavigationItem[];
};
