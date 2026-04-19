"use client";

import { useCallback, useState } from "react";
import { FixedBrandLogo } from "@/components/FixedBrandLogo";
import { ScrollToHeroButton } from "@/components/ScrollToHeroButton";
import { SplashScreen } from "@/components/SplashScreen";
import { CountdownSection } from "@/sections/CountdownSection";
import { Greetings } from "@/sections/Greetings";
import { Hero } from "@/sections/Hero";
import { OurHistory } from "@/sections/OurHistory";
import { Rsvp } from "@/sections/Rsvp";
import { ScheduleSection } from "@/sections/ScheduleSection";
import { WhenSection } from "@/sections/WhenSection";
import { WhereSection } from "@/sections/WhereSection";
export function WeddingShell() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashDone = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <>
      {showSplash ? <SplashScreen onComplete={handleSplashDone} /> : null}

      <FixedBrandLogo hidden={showSplash} />
      <ScrollToHeroButton hidden={showSplash} />

      <main id="main-content">
        <Hero deferEntrance={showSplash} />
        <OurHistory />
        <WhenSection />
        <ScheduleSection />
        <WhereSection />
        <CountdownSection />
        <Rsvp />
        <Greetings />
      </main>
    </>
  );
}
