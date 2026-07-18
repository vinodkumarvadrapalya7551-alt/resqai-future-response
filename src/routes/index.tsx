import { createFileRoute } from "@tanstack/react-router";
import ResQAILanding from "@/components/resq/ResQAILanding";

export const Route = createFileRoute("/")({
  component: ResQAILanding,
  head: () => ({
    meta: [
      { title: "ResQAI — Predict earlier. Respond faster. Save more lives." },
      {
        name: "description",
        content:
          "ResQAI is the AI-driven command layer for crisis management — unifying prediction, dispatch, evacuation and care across every second of an emergency.",
      },
      { property: "og:title", content: "ResQAI — AI-Driven Crisis Management" },
      {
        property: "og:description",
        content:
          "Predict earlier. Respond faster. Save more lives. The future of emergency response has arrived.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ResQAI — AI-Driven Crisis Management" },
      {
        name: "twitter:description",
        content:
          "Predict earlier. Respond faster. Save more lives.",
      },
    ],
  }),
});
