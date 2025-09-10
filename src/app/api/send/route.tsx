import { Resend } from "resend";
import * as React from "react";
import EmailTemplate from "../../../../components/email-template";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.EMAIL_KEY!);

export async function POST(req: NextRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const body = await req.json();
    const { data, error } = await resend.emails.send({
      from: `${body.name} <onboarding@resend.dev>`,
      to: ["chirag.gulati282@gmail.com"],
      subject: body.subject,
      react: <EmailTemplate message={body.message} email={body.email} />,
    });

    if (error) {
      return NextResponse.json(
        { message: "Failed to send email", error },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Email sent", data }, { status: 200 });
  } catch (error) {
    console.log("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email", error },
      { status: 500 }
    );
  }
}
