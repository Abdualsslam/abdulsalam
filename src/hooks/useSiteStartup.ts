import { useEffect, useState } from "react";

/** Hand off the early HTML loader to the sheet entrance after hydration. */
export function useSiteStartup() {
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) => new Promise<void>(resolve => {
      timers.push(window.setTimeout(resolve, ms));
    });
    const finish = async () => {
      const page = document.documentElement;
      if (page.dataset.siteLoading) {
        const elapsed = Date.now() - Number(page.dataset.siteStarted || Date.now());
        // A short, bounded introduction; external fonts can never hold the site.
        await Promise.all([
          wait(Math.max(0, 600 - elapsed)),
          Promise.race([document.fonts.ready, wait(1000)]),
        ]);
        if (cancelled) return;
        if (page.dataset.siteLoading) {
          page.dataset.siteLoading = "leaving";
          await wait(180);
          if (cancelled) return;
          delete page.dataset.siteLoading;
        }
      }
      if (!cancelled) setComplete(true);
    };
    void finish();
    return () => {
      cancelled = true;
      timers.forEach(window.clearTimeout);
    };
  }, []);
  return complete;
}
