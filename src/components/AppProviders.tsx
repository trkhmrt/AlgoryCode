"use client";

import { ToastProvider } from "@/components/ui/ToastProvider";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <PageViewTracker />
      {children}
    </ToastProvider>
  );
}
