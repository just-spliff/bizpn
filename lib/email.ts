import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
interface Attachment {
  content: Buffer;
  filename: string;
  contentType: string;
}

interface EmailOptions {
  to: string[];
  subject: string;
  html: string;
  attachments?: Attachment[];
}

const sendEmail = async ({ to, subject, html }: EmailOptions) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "E-commerce Book <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Email error:", error);
    throw new Error(
      `Failed to send email: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

export default sendEmail;
