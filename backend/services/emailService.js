import nodemailer from "nodemailer";

export const sendPaymentEmail = async ({ to, subject, pdfPath, paymentId }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: `Payment successful. Payment ID: ${paymentId}`,
      attachments: [
        {
          filename: "invoice.pdf",
          path: pdfPath,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email Service Error:", error);
    throw error;
  }
};
