"use client";

import { useEffect } from "react";
import { pushRecent } from "@/lib/storage";
import type { ModuleKey } from "@/lib/types";

export function RecentlyViewedTracker({
  module,
  id,
  title,
  cover,
}: {
  module: ModuleKey;
  id: string;
  title: string;
  cover: string;
}) {
  useEffect(() => {
    pushRecent({ module, id, title, cover });
  }, [module, id, title, cover]);
  return null;
}
