import { createFileRoute } from "@tanstack/react-router";
import { ContactSection } from "@/components/contact/ContactSection";

const title = "Contact Jagadish — Distributed Systems & AI Engineer";
const description =
  "Reach Jagadish Kumar Ponnada for research collaborations, engineering challenges, and high-impact distributed systems work.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return <ContactSection />;
}
