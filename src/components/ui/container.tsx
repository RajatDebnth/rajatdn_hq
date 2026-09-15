import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ContainerProps<TElement extends ElementType = "div"> = {
  as?: TElement;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<TElement>, "as" | "children" | "className">;

export function Container<TElement extends ElementType = "div">({
  as,
  children,
  className = "",
  ...props
}: ContainerProps<TElement>) {
  const Component = as ?? "div";

  return (
    <Component
      className={`mx-auto w-full max-w-[var(--content-width)] px-5 sm:px-8 ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}
