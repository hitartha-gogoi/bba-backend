import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

const pdfPath = path.resolve('vakalatnama-form.pdf');
const pdfBytes = fs.readFileSync(pdfPath);
const pdfDoc = await PDFDocument.load(pdfBytes);
const pages = pdfDoc.getPages();
const firstPage = pages[0];
const form = pdfDoc.getForm();

firstPage.drawText(`Court Name`, {
  x: 201,
  y: 901, // you’ll need to adjust this
  size: 12,
});

 const filledPdfBytes = await pdfDoc.save();
  const filledPath = `filled-newpdf.pdf`;
fs.writeFileSync(filledPath, filledPdfBytes);
