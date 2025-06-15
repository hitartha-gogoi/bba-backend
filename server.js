import { PDFDocument, rgb, StandardFonts  } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

const pdfPath = path.resolve('receipt.pdf');
const pdfBytes = fs.readFileSync(pdfPath);
const pdfDoc = await PDFDocument.load(pdfBytes);
const pages = pdfDoc.getPages();
const firstPage = pages[0];
const form = pdfDoc.getForm();

firstPage.drawText(`RECEIPT`, { x: 100, y: 685,  size: 10 });
firstPage.drawText(`DATE`, { x: 90, y: 655,  size: 10 });
firstPage.drawText(`TRXN ID`, { x: 130, y: 598,  size: 10 });
firstPage.drawText(`NAME`, { x: 100, y: 500,  size: 10 });
firstPage.drawText(`MEMBERSHIP ID`, { x: 130, y: 470,  size: 10 });
firstPage.drawText(`CONTACT`, { x: 100, y: 440,  size: 10 });
firstPage.drawText(`AMOUNT`, { x: 320, y: 370,  size: 10 });
firstPage.drawText(`Type`, {  x: 120, y: 570,  size: 10 });
firstPage.drawText(`vakalatnama`, { x: 120, y: 570,  size: 10 });
//firstPage.drawText(`Signature`, { x: 500, y: 120,  size: 10 });

const filledPdfBytes = await pdfDoc.save();
const filledPath = `new-receipt.pdf`;
fs.writeFileSync(filledPath, filledPdfBytes);


