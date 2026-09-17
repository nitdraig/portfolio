export function getThankYouEmailContent(
  lang: "es" | "en",
  name: string,
): { subject: string; text: string; html: string } {
  const firstName = name.trim().split(/\s+/)[0] || name;

  if (lang === "es") {
    return {
      subject: "Recibí tu solicitud – Próximos pasos",
      text: [
        `Hola ${firstName},`,
        "",
        "Recibí tu solicitud. Mi método de trabajo comienza analizando la viabilidad de tu proyecto y alineando expectativas para que podamos trabajar con claridad.",
        "",
        "En las próximas 24-48 horas me pondré en contacto contigo para coordinar una breve conversación.",
        "",
        "Saludos,",
        "Agustín",
      ].join("\n"),
      html: buildThankYouHtml("es", firstName),
    };
  }

  return {
    subject: "Request received – Next steps",
    text: [
      `Hi ${firstName},`,
      "",
      "Request received. My process starts with a feasibility analysis of your project and aligning expectations so we can work with clarity.",
      "",
      "I'll get back to you within 24-48 hours to schedule a short call.",
      "",
      "Best,",
      "Agustín",
    ].join("\n"),
    html: buildThankYouHtml("en", firstName),
  };
}

function buildThankYouHtml(lang: "es" | "en", firstName: string): string {
  const safeName = escapeHtml(firstName);

  const copy =
    lang === "es"
      ? {
          greeting: `Hola ${safeName},`,
          intro:
            "Recibí tu solicitud. Mi método de trabajo comienza analizando la viabilidad de tu proyecto y alineando expectativas para que podamos trabajar con claridad.",
          next: "En las próximas 24-48 horas me pondré en contacto contigo para coordinar una breve conversación.",
          signOff: "Saludos,",
          name: "Agustín",
          brand: "Freelance · MVP y desarrollo de producto",
        }
      : {
          greeting: `Hi ${safeName},`,
          intro:
            "Request received. My process starts with a feasibility analysis of your project and aligning expectations so we can work with clarity.",
          next: "I'll get back to you within 24-48 hours to schedule a short call.",
          signOff: "Best,",
          name: "Agustín",
          brand: "Freelance · MVP & Product Development",
        };

  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${lang === "es" ? "Solicitud recibida" : "Request received"}</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f4f4f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 520px;">
          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <table role="presentation" cellpadding="0" cellspacing="0" align="center">
                <tr>
                  <td style="font-size: 18px; font-weight: 700; color: #18181b; letter-spacing: -0.02em;">Agustín Avellaneda</td>
                </tr>
                <tr>
                  <td style="font-size: 12px; color: #71717a; padding-top: 4px;">${copy.brand}</td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Card -->
          <tr>
            <td style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); overflow: hidden;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 32px 28px;">
                    <p style="margin: 0 0 20px; font-size: 17px; line-height: 1.5; color: #18181b; font-weight: 600;">${copy.greeting}</p>
                    <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: #3f3f46;">${copy.intro}</p>
                    <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.6; color: #3f3f46;">${copy.next}</p>
                    <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #18181b;">${copy.signOff}<br><strong style="font-weight: 600;">${copy.name}</strong></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 28px;">
              <p style="margin: 0; font-size: 12px; color: #a1a1aa;">${copy.brand}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
