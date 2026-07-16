"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-cosmic-void group-[.toaster]:text-cosmic-starlight group-[.toaster]:border-white/10 group-[.toaster]:shadow-xl",
          description: "group-[.toast]:text-white/60",
          actionButton:
            "group-[.toast]:bg-cosmic-purple group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-white/10 group-[.toast]:text-white/80",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
