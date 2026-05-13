import { redirect } from "next/navigation";

type SP = { [k: string]: string | string[] | undefined };

export default async function EntdeckenIndex({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) {
    if (typeof v === "string") qs.set(k, v);
  }
  const tail = qs.toString() ? `?${qs.toString()}` : "";

  // Time-bound filters → calendar; place-style filters → orte
  if (sp.zeit || sp.view) {
    const param = (sp.zeit as string) || "";
    const view =
      param === "tonight"
        ? "today"
        : param === "weekend"
          ? "week"
          : param === "this-week"
            ? "week"
            : "today";
    redirect(`/entdecken/kalender?view=${view}`);
  }

  if (sp.kategorie || sp.stil || sp.stadtteil) {
    redirect(`/entdecken/orte${tail}`);
  }

  redirect("/entdecken/kalender");
}
