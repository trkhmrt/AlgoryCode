"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

export const EDUCATION_LIST_ANCHOR_ID = "egitimler";

const SCROLL_Y_KEY = "education-list-scroll-y";
const FILTER_NAV_KEY = "education-filter-nav";
const RESTORE_SCROLL_KEY = "education-restore-scroll";

export function markEducationFilterNav() {
  sessionStorage.setItem(FILTER_NAV_KEY, "1");
  sessionStorage.removeItem(RESTORE_SCROLL_KEY);
}

export function markEducationDetailNav() {
  sessionStorage.setItem(SCROLL_Y_KEY, String(window.scrollY));
  sessionStorage.setItem(RESTORE_SCROLL_KEY, "1");
  sessionStorage.removeItem(FILTER_NAV_KEY);
}

export function markEducationReturnToList() {
  const hasSavedY = Number(sessionStorage.getItem(SCROLL_Y_KEY) || "0") > 0;
  if (hasSavedY) {
    sessionStorage.setItem(RESTORE_SCROLL_KEY, "1");
    sessionStorage.removeItem(FILTER_NAV_KEY);
  } else {
    markEducationFilterNav();
  }
}

function scrollToList() {
  const el = document.getElementById(EDUCATION_LIST_ANCHOR_ID);
  if (!el) return;
  el.scrollIntoView({ behavior: "auto", block: "start" });
}

function applyScrollIntent(mode: "filter" | "restore") {
  if (mode === "filter") {
    scrollToList();
    return;
  }

  const y = Number(sessionStorage.getItem(SCROLL_Y_KEY) || "0");
  if (y > 0) {
    window.scrollTo({ top: y, behavior: "auto" });
  } else {
    scrollToList();
  }
}

export function EducationScrollManager() {
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const ignoreScrollSaveRef = useRef(false);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const prev = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    let mode: "filter" | "restore" | null = null;
    if (sessionStorage.getItem(FILTER_NAV_KEY)) {
      sessionStorage.removeItem(FILTER_NAV_KEY);
      mode = "filter";
    } else if (sessionStorage.getItem(RESTORE_SCROLL_KEY)) {
      sessionStorage.removeItem(RESTORE_SCROLL_KEY);
      mode = "restore";
    }

    if (!mode) {
      return () => {
        window.history.scrollRestoration = prev;
      };
    }

    ignoreScrollSaveRef.current = true;
    applyScrollIntent(mode);

    const timers = [0, 16, 50, 100, 200, 400, 700, 1000].map((ms) =>
      window.setTimeout(() => applyScrollIntent(mode!), ms),
    );

    const interval = window.setInterval(() => {
      applyScrollIntent(mode!);
    }, 50);

    const releaseTimer = window.setTimeout(() => {
      window.clearInterval(interval);
      ignoreScrollSaveRef.current = false;
    }, 1200);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(releaseTimer);
      window.clearInterval(interval);
      ignoreScrollSaveRef.current = false;
      window.history.scrollRestoration = prev;
    };
  }, [query]);

  useEffect(() => {
    const onScroll = () => {
      if (ignoreScrollSaveRef.current) return;
      sessionStorage.setItem(SCROLL_Y_KEY, String(window.scrollY));
    };

    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      if (sessionStorage.getItem(RESTORE_SCROLL_KEY)) {
        sessionStorage.removeItem(RESTORE_SCROLL_KEY);
        ignoreScrollSaveRef.current = true;
        applyScrollIntent("restore");
        window.setTimeout(() => {
          ignoreScrollSaveRef.current = false;
        }, 300);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pageshow", onPageShow);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  return null;
}
