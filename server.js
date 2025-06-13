import { PDFDocument, rgb, StandardFonts  } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

const pdfPath = path.resolve('vakalatnama-form.pdf');
const pdfBytes = fs.readFileSync(pdfPath);
const pdfDoc = await PDFDocument.load(pdfBytes);
const pages = pdfDoc.getPages();
const firstPage = pages[0];
const form = pdfDoc.getForm();

firstPage.drawText(`transaction`, { x: 530, y: 972,  size: 10 });
firstPage.drawText(`Timestamp`, { x: 530, y: 992,  size: 10 });
firstPage.drawText(`Plantiff`, { x: 100, y: 838,  size: 10 });
firstPage.drawText(`Versus 1`, { x: 100, y: 771,  size: 10 });
firstPage.drawText(`Versus 2`, { x: 250, y: 760,  size: 10 });
firstPage.drawText(`Versus 3`, { x: 100, y: 747,  size: 10 });
firstPage.drawText(`Versus 4`, { x: 250, y: 725,  size: 10 });
firstPage.drawText(`Day`, { x: 230, y: 170,  size: 10 });
firstPage.drawText(`Date`, { x: 340, y: 170,  size: 10 });
firstPage.drawText(`Signature`, { x: 500, y: 120,  size: 10 });

const filledPdfBytes = await pdfDoc.save();
const filledPath = `filled-newpdf.pdf`;
fs.writeFileSync(filledPath, filledPdfBytes);


async function generateReceiptPDF(transaction, lawyer, payment, receiptId) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 size in points
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const drawText = (text, x, y, size = 12) => {
    page.drawText(text, { x, y, size, font, color: rgb(0, 0, 0) });
  };

  drawText("Bar Association Bahadurgarh", 200, 800, 18);
  drawText("Official Payment Receipt", 220, 775, 14);

  drawText(`Receipt No: BA-VAKALATNAMA-1717832398164`, 50, 730);
  drawText(`Name: RAVIN KUMAR`, 50, 710);
  drawText(`Enrolment No: bn/en/02`, 50, 690);
  drawText(`Email: ravinkumar@gmail.com`, 50, 670);
  drawText(`Phone: 7086233001`, 50, 650);
  drawText(`Transaction Type: vakalatnama`, 50, 630);
  drawText(`Amount Paid: 1500`, 50, 610);
  drawText(`Paid At: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`, 50, 590);
  drawText(`Razorpay Payment ID: pay_QfBh2I9YNy3kQ`, 50, 570);
  drawText(`Razorpay Transaction ID: plink_QfBgm0KlAj7rHW`, 50, 550);

  drawText("This is a system generated receipt. For any queries, contact the secretary.", 50, 500, 10);

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}


generateReceiptPDF()