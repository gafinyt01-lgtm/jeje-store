
export function whatsappUrl(message: string) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");

  if (!number || number.includes("xxxxxxxx")) return "";

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
