import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import linkHtml from "../../public/link.html?raw";

export const Route = createFileRoute("/link")({
  server: {
    handlers: {
      GET: async () => {
        return new Response(linkHtml, {
          headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=300" },
        });
      },
    },
  },
});
