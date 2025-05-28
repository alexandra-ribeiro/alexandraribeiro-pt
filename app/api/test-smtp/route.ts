import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function GET() {
  try {
    // Log the environment variables (redacted for security)
    console.log("Testing SMTP with:", {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE,
      user: process.env.SMTP_USER ? process.env.SMTP_USER.substring(0, 3) + "..." : "Not set",
      pass: process.env.SMTP_PASSWORD ? "Set (length: " + process.env.SMTP_PASSWORD.length + ")" : "Not set",
    })

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || "465"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER || "",
        pass: process.env.SMTP_PASSWORD || "",
      },
    })

    // Verify connection
    await transporter.verify()

    // If verify doesn't throw an error, connection is successful
    return NextResponse.json({
      success: true,
      message: "SMTP connection successful",
      config: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE === "true",
        user: process.env.SMTP_USER ? `${process.env.SMTP_USER.substring(0, 3)}...` : "Not set",
        passLength: process.env.SMTP_PASSWORD ? process.env.SMTP_PASSWORD.length : 0,
      },
    })
  } catch (error) {
    console.error("SMTP Test Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        config: {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secure: process.env.SMTP_SECURE === "true",
          user: process.env.SMTP_USER ? `${process.env.SMTP_USER.substring(0, 3)}...` : "Not set",
          passLength: process.env.SMTP_PASSWORD ? process.env.SMTP_PASSWORD.length : 0,
        },
      },
      { status: 500 },
    )
  }
}
