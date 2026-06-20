import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

// ✅ ensure folder exists (VERY IMPORTANT for Render)
const dir = "storage/invoices";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

export const generateInvoicePDF = (paymentData) => {
  return new Promise((resolve, reject) => {
    try {
      const fileName = `invoice_${paymentData.paymentId}.pdf`;
      const filePath = path.join(dir, fileName);

      const doc = new PDFDocument();

      doc.pipe(fs.createWriteStream(filePath));

      doc.fontSize(20).text("INVOICE", { align: "center" });
      doc.moveDown();

      doc.fontSize(14).text(`Name: ${paymentData.name}`);
      doc.text(`Email: ${paymentData.email}`);
      doc.text(`Plan: ${paymentData.plan}`);
      doc.text(`Payment ID: ${paymentData.paymentId}`);
      doc.text(`Amount: ${paymentData.amount}`);

      doc.end();

      doc.on("finish", () => resolve(filePath));
      doc.on("error", reject);
    } catch (error) {
      reject(error);
    }
  });
};
