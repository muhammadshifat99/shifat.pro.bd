"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { WelcomeLoader } from "@/components/WelcomeLoader";
import { WelcomeDoneContext } from "@/components/WelcomeDoneContext";

// module scope: survives client-side route changes but resets on a real page
// load — the loader plays once per load, not again when the dock navigates
// back to Home (which remounts this gate and otherwise reads as a refresh)
let playedThisLoad = false;

export function WelcomeGate({ children }: { children: React.ReactNode }) {
  // intentional: the welcome loader plays on every page load
  const [show, setShow] = useState(!playedThisLoad);

  useEffect(() => {
    if (!show) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
      document.body.style.overflow = "";
    };
  }, [show]);

  const handleComplete = () => {
    playedThisLoad = true;
    setShow(false);
  };

  return (
    <WelcomeDoneContext.Provider value={!show}>
      <AnimatePresence>
        {show && <WelcomeLoader key="welcome" onComplete={handleComplete} />}
      </AnimatePresence>
      {/* Rendered, not hidden. WelcomeLoader is an opaque `fixed inset-0`
          overlay, so it already conceals this subtree visually — wrapping it in
          `invisible` bought nothing and cost the whole hero its LCP: browsers
          exclude visibility:hidden content from the paint tree, so the largest
          paint could not be recorded until the intro finished (~1.6s).
          Content below the fold still choreographs itself off useWelcomeDone. */}
      <div>{children}</div>
      {show && (
        <style dangerouslySetInnerHTML={{ __html: `html{overflow:hidden}` }} />
      )}
    </WelcomeDoneContext.Provider>
  );
}
