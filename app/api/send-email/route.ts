import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, services, message, subject, recipient } = await request.json()

    // Basic validation
    if (!name || !email || !services || !subject || !recipient) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Configure email transport for Gmail with SSL
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: 465, // Fixed port for SSL
      secure: true, // Always true for port 465
      auth: {
        user: process.env.SMTP_USER || "",
        pass: process.env.SMTP_PASSWORD || "",
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false,
      },
    })

    // Compose email with improved formatting
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          h1 { color: #0F2756; border-bottom: 2px solid #CFCC84; padding-bottom: 10px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; }
          .message { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #CFCC84; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Nova mensagem website AV</h1>
          
          <div class="field">
            <span class="label">Nome:</span> ${name}
          </div>
          
          <div class="field">
            <span class="label">Email:</span> ${email}
          </div>
          
          <div class="field">
            <span class="label">Telefone:</span> ${phone || "Não informado"}
          </div>
          
          <div class="field">
            <span class="label">Serviços:</span> ${services}
          </div>
          
          <div class="message">
            <span class="label">Mensagem:</span><br>
            ${message.replace(/\n/g, "<br>") || "Sem mensagem"}
          </div>
        </div>
      </body>
      </html>
    `

    // Send email to the primary recipient
    const mailOptions = {
      from: `"Website Alexandra Ribeiro" <${process.env.SMTP_USER}>`,
      to: recipient,
      subject: subject,
      html: emailContent,
      replyTo: email,
    }

    // Send a copy to the admin email (SMTP_USER)
    const adminMailOptions = {
      from: `"Website Alexandra Ribeiro" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER || "",
      subject: `[CÓPIA] ${subject} - de ${name}`,
      html: emailContent,
      replyTo: email,
    }

    console.log("Attempting to send email to recipient and admin...")

    try {
      // Send to primary recipient
      const info = await transporter.sendMail(mailOptions)
      console.log("Email sent to primary recipient:", info.messageId)

      // Send copy to admin
      const adminInfo = await transporter.sendMail(adminMailOptions)
      console.log("Copy sent to admin:", adminInfo.messageId)

      return NextResponse.json({
        success: true,
        messageId: info.messageId,
        adminMessageId: adminInfo.messageId,
      })
    } catch (sendError) {
      console.error("Error sending email:", sendError)
      return NextResponse.json(
        {
          error: "Failed to send email",
          details: sendError instanceof Error ? sendError.message : String(sendError),
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
