import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const PayloadSchema = z.object({
  destinations: z.array(z.string().max(80)).max(30),
  places: z.array(z.string().max(120)).max(50),
  departureDate: z.string().max(20),
  returnDate: z.string().max(20),
  adults: z.number().int().min(0).max(50),
  children: z.number().int().min(0).max(50),
  pace: z.string().max(60),
  lodging: z.string().max(60),
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  phone: z.string().max(40).optional().default(""),
  message: z.string().max(4000).optional().default(""),
});

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

export const sendDevisRequest = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => PayloadSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return { ok: false, error: "Email service not configured" };
    }

    const fmtDate = (iso: string) => {
      if (!iso) return "—";
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return iso;
      return new Intl.DateTimeFormat("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }).format(d);
    };

    const travelers = `${data.adults} adulte${data.adults > 1 ? "s" : ""}${data.children > 0 ? `, ${data.children} enfant${data.children > 1 ? "s" : ""}` : ""}`;

    const rows: Array<[string, string]> = [
      ["Nom complet", data.name],
      ["Email", data.email],
      ["Téléphone", data.phone || "—"],
      ["Date d'aller", fmtDate(data.departureDate)],
      ["Date de retour", fmtDate(data.returnDate)],
      ["Nombre de voyageurs", travelers],
      ["Rythme", data.pace || "—"],
      ["Villes choisies", data.destinations.join(", ") || "—"],
      ["Lieux sélectionnés", data.places.join(", ") || "—"],
      ["Type d'hébergement", data.lodging || "—"],
      ["Message", data.message || "—"],
    ];

    const html = `
      <div style="font-family:Arial,sans-serif;color:#222;max-width:640px;margin:auto">
        <h2 style="color:#7a4a1e">Nouvelle demande de devis — Marocatlastour</h2>
        <table style="border-collapse:collapse;width:100%">
          ${rows
            .map(
              ([k, v]) => `
            <tr>
              <td style="padding:8px 12px;border:1px solid #eee;background:#faf6f0;font-weight:bold;width:160px">${escapeHtml(k)}</td>
              <td style="padding:8px 12px;border:1px solid #eee;white-space:pre-wrap">${escapeHtml(v)}</td>
            </tr>`,
            )
            .join("")}
        </table>
        <p style="color:#888;margin-top:24px;font-size:12px">Envoyé automatiquement depuis le configurateur.</p>
      </div>
    `;

    const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "Marocatlastour <onboarding@resend.dev>",
        to: ["yenkel@hotmail.com"],
        reply_to: data.email,
        subject: `Nouvelle demande de voyage sur mesure`,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("Resend error", res.status, body);
      return { ok: false, error: `Email send failed (${res.status})` };
    }

    return { ok: true };
  });
