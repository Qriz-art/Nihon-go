"use client";

import { ProgressProvider } from "@/lib/progress";
import BadgeToast from "./BadgeToast";

export default function Providers({ children }) {
  return (
    <ProgressProvider>
      {children}
      <BadgeToast />
    </ProgressProvider>
  );
}
