import type { ReactNode } from "react";
import { EntdeckenSubNav } from "@/components/EntdeckenSubNav";

export default function EntdeckenLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <EntdeckenSubNav />
      {children}
    </>
  );
}
