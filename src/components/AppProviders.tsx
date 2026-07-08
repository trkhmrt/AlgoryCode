"use client";

import { ToastProvider } from "@/components/ui/ToastProvider";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <PageViewTracker />
        {children}
      </ToastProvider>
    </ThemeProvider>
  );
}
