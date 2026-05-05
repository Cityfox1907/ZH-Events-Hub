import { EventDetailView } from "@/components/views/EventDetailView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  return <EventDetailView slug={slug} />;
}
