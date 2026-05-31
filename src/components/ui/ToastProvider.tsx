"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, X } from "lucide-react";

export type ToastVariant = "success" | "error";

export type ToastItem = {
  id: string;
  message: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  showToast: (message: string, variant?: ToastVariant) => void;
  success: (message: string) => void;
  error: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const VARIANT_STYLES: Record<
  ToastVariant,
  { border: string; icon: string; text: string }
> = {
  success: {
    border: "border-emerald-500/25",
    icon: "text-emerald-400",
    text: "text-emerald-100",
  },
  error: {
    border: "border-red-500/25",
    icon: "text-red-400",
    text: "text-red-100",
  },
};

const AUTO_DISMISS_MS = 4500;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = "success") => {
      const id = crypto.randomUUID();
      setToasts((current) => [...current, { id, message, variant }]);

      window.setTimeout(() => {
        dismissToast(id);
      }, AUTO_DISMISS_MS);
    },
    [dismissToast],
  );

  const value = useMemo(
    () => ({
      showToast,
      success: (message: string) => showToast(message, "success"),
      error: (message: string) => showToast(message, "error"),
    }),
    [showToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed bottom-6 right-6 z-[100] flex w-full max-w-[380px] flex-col gap-3 px-6 sm:px-0"
      >
        <AnimatePresence initial={false}>
          {toasts.map((toast) => {
            const styles = VARIANT_STYLES[toast.variant];
            const Icon =
              toast.variant === "success" ? CheckCircle2 : AlertCircle;

            return (
              <motion.div
                key={toast.id}
                role="status"
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`pointer-events-auto flex items-start gap-3 rounded-[8px] border bg-[#0a0a0a]/95 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md nav-blur ${styles.border}`}
              >
                <Icon size={18} className={`mt-0.5 shrink-0 ${styles.icon}`} />
                <p className={`flex-1 text-sm leading-relaxed ${styles.text}`}>
                  {toast.message}
                </p>
                <button
                  type="button"
                  onClick={() => dismissToast(toast.id)}
                  className="shrink-0 rounded-md p-1 text-[#888] transition-colors hover:bg-[#111] hover:text-[#ededed]"
                  aria-label="Bildirimi kapat"
                >
                  <X size={14} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast yalnızca ToastProvider içinde kullanılabilir.");
  }

  return context;
}
