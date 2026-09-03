export default async function discordSender({
  name,
  email,
  title,
  content,
}: {
  name: string;
  email: string;
  title: string;
  content: string;
}) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;

  const embedPayload = {
    embeds: [
      {
        title: "📩 New Website Inquiry",
        color: 0x3b82f6,
        fields: [
          {
            name: "👤 Name",
            value: `${name}`,
            inline: true,
          },
          {
            name: "📧 Email",
            value: `[${email}](mailto:${email})`,
            inline: true,
          },
          {
            name: "📧 Title",
            value: `\`${title}\``,
            inline: false,
          },
          {
            name: "💬 Message Details",
            value: `>>> ${content}`,
            inline: false,
          },
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: "Website Contact Form",
        },
      },
    ],
  };

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(embedPayload),
  });
}
