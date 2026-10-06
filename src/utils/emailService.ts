import emailjs from '@emailjs/browser';
import type { BookingFormData } from '../types';

/**
 * EmailJS Configuration
 * 
 * To activate real email sending, add these to your .env file:
 *   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
 *   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
 *   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
 *
 * Setup guide: https://www.emailjs.com/docs/tutorial/overview/
 * 1. Create account at emailjs.com
 * 2. Add Gmail service (connect alpha.digital.ia@gmail.com)
 * 3. Create email template with variables below
 * 4. Copy your Service ID, Template ID and Public Key to .env
 */
const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string | undefined;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string | undefined;

export const isEmailConfigured = (): boolean =>
  Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

/**
 * Builds a Google Calendar add-event URL.
 */
export function buildGoogleCalendarUrl(data: BookingFormData, lang: string): string {
  const { preferredDate, preferredTime, serviceCategory, fullName, company, email, projectDescription } = data;
  const [year, month, day] = preferredDate.split('-').map(Number);
  const startHour = parseInt(preferredTime.split(':')[0], 10);
  const startMin  = parseInt((preferredTime.split(':')[1] ?? '0').replace(/\D.*/g, ''), 10);
  const pad = (n: number) => String(n).padStart(2, '0');
  const startStr = `${year}${pad(month)}${pad(day)}T${pad(startHour)}${pad(startMin)}00`;
  const endDate  = new Date(year, month - 1, day, startHour, startMin + 30);
  const endStr   = `${endDate.getFullYear()}${pad(endDate.getMonth()+1)}${pad(endDate.getDate())}T${pad(endDate.getHours())}${pad(endDate.getMinutes())}00`;

  const title = lang === 'es'
    ? `Consultoría ALPHA Digital Transformation – ${serviceCategory}`
    : `ALPHA Digital Transformation Consultation – ${serviceCategory}`;

  const details = lang === 'es'
    ? `Cliente: ${fullName}${company ? ` (${company})` : ''}\nEmail: ${email}\nServicio: ${serviceCategory}\n${projectDescription ? `\nDescripción: ${projectDescription}` : ''}\n\n📹 Sesión por Google Meet.\nConsultor: Agustín Peralta · alpha.digital.ia@gmail.com`
    : `Client: ${fullName}${company ? ` (${company})` : ''}\nEmail: ${email}\nService: ${serviceCategory}\n${projectDescription ? `\nDescription: ${projectDescription}` : ''}\n\n📹 Session via Google Meet.\nConsultant: Agustín Peralta · alpha.digital.ia@gmail.com`;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${startStr}/${endStr}`,
    details,
    location: 'Google Meet',
    sf: 'true',
    output: 'xml',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Sends a booking confirmation email to the client via EmailJS.
 * The email is sent FROM alpha.digital.ia@gmail.com (configured in EmailJS).
 * 
 * Required EmailJS template variables:
 *   {{to_name}}        — client full name
 *   {{to_email}}       — client email (EmailJS "To Email" field)
 *   {{service}}        — booked service name
 *   {{date}}           — preferred date
 *   {{time}}           — preferred time slot
 *   {{company}}        — client company
 *   {{gcal_link}}      — Google Calendar add-event link
 *   {{notes}}          — project description / notes
 *   {{reply_to}}       — alpha.digital.ia@gmail.com
 */
export async function sendBookingConfirmationEmail(
  data: BookingFormData,
  gcalLink: string,
  lang: string,
): Promise<{ success: boolean; error?: string }> {
  if (!isEmailConfigured()) {
    return { success: false, error: 'EmailJS not configured' };
  }

  const templateParams = {
    to_name:   data.fullName,
    to_email:  data.email,
    service:   data.serviceCategory,
    date:      data.preferredDate,
    time:      data.preferredTime,
    company:   data.company || (lang === 'es' ? 'No especificada' : 'Not specified'),
    notes:     data.projectDescription || (lang === 'es' ? 'Sin descripción adicional' : 'No additional description'),
    gcal_link: gcalLink,
    reply_to:  'alpha.digital.ia@gmail.com',
    lang,
  };

  try {
    await emailjs.send(SERVICE_ID!, TEMPLATE_ID!, templateParams, PUBLIC_KEY!);
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[EmailJS] Failed to send booking email:', message);
    return { success: false, error: message };
  }
}
