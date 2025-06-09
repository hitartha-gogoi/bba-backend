import { PDFDocument } from 'pdf-lib';
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
