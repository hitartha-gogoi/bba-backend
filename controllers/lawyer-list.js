import Lawyer from "../models/lawyer.js"
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fetch from "node-fetch";

function wrapText(text, maxCharsPerLine) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (let word of words) {
    if ((currentLine + word).length <= maxCharsPerLine) {
      currentLine += word + ' ';
    } else {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    }
  }
  if (currentLine.trim()) lines.push(currentLine.trim());
  return lines;
}

export default async function GetLawyerList(req,res){

    try {
        
        const lawyers = await Lawyer.find()
        if (!lawyers || lawyers.length === 0) {
            return res.status(403).json({ message: 'No lawyers found' });
        }

  
    const headers = [
      { label: "Photo", width: 70 },
      { label: "Username", width: 90 },
      { label: "Phone", width: 80 },
      { label: "Email", width: 160 },
      { label: "Father's Name", width: 110 },
      { label: "Enrolment No.", width: 100 },
      { label: "Address", width: 160 }
    ];

    const pageWidth = headers.reduce((sum, h) => sum + h.width, 60);
    const pageHeight = 842;
    const margin = 30;

    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([pageWidth, pageHeight]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 10;
    const rowHeight = 80;
    let y = pageHeight - margin;

    // Title (centered)
    const title = "Bahadurgarh Bar Association";
    const titleWidth = font.widthOfTextAtSize(title, 18);
    const titleX = (pageWidth - titleWidth) / 2;
    page.drawText(title, {
      x: titleX,
      y,
      size: 18,
      font,
      color: rgb(0, 0, 0.8)
    });

    y -= 40;

    // Draw headers
    let x = margin;
    headers.forEach((h) => {
      page.drawRectangle({
        x,
        y: y - rowHeight + 5,
        width: h.width,
        height: rowHeight,
        color: rgb(0.2, 0.4, 0.9),
        borderColor: rgb(0, 0, 0),
        borderWidth: 1
      });
      page.drawText(h.label, {
        x: x + 5,
        y: y - 20,
        size: fontSize + 1,
        font,
        color: rgb(1, 1, 1)
      });
      x += h.width;
    });

    y -= rowHeight;

    for (const lawyer of lawyers) {
      x = margin;

      // PHOTO
      page.drawRectangle({
        x,
        y: y - rowHeight + 5,
        width: headers[0].width,
        height: rowHeight,
        borderColor: rgb(0.6, 0.6, 0.6),
        borderWidth: 1
      });

      if (lawyer.photo) {
        try {
          const response = await fetch(lawyer.photo);
          const imgBuffer = await response.buffer();
          const image = lawyer.photo.endsWith(".png")
            ? await pdfDoc.embedPng(imgBuffer)
            : await pdfDoc.embedJpg(imgBuffer);
          const imgDims = image.scale(40 / image.height);
          const imgX = x + (headers[0].width - imgDims.width) / 2;
          const imgY = y - rowHeight / 2 - imgDims.height / 2 + 15;

          page.drawImage(image, {
            x: imgX,
            y: imgY,
            width: imgDims.width,
            height: imgDims.height
          });
        } catch {
          page.drawText("No Img", {
            x: x + 5,
            y: y - 25,
            size: 8,
            font,
            color: rgb(1, 0, 0)
          });
        }
      }

      x += headers[0].width;

      const row = [
        lawyer.username,
        lawyer.phone,
        lawyer.email,
        lawyer.fatherName,
        lawyer.enrolmentNumber,
        lawyer.address
      ];

      for (let i = 0; i < row.length; i++) {
        const value = String(row[i] || "");
        const maxChars = Math.floor(headers[i + 1].width / 7);
        const lines = wrapText(value, maxChars);

        lines.forEach((line, j) => {
          const lineY = y - 15 - j * (fontSize + 2);
          if (lineY > margin) {
            page.drawText(line, {
              x: x + 5,
              y: lineY,
              size: fontSize,
              font,
              color: rgb(0, 0, 0)
            });
          }
        });

        page.drawRectangle({
          x,
          y: y - rowHeight + 5,
          width: headers[i + 1].width,
          height: rowHeight,
          borderColor: rgb(0.6, 0.6, 0.6),
          borderWidth: 1
        });

        x += headers[i + 1].width;
      }

      y -= rowHeight;

      if (y < margin + 60) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        y = pageHeight - margin;

        x = margin;
        headers.forEach((h) => {
          page.drawRectangle({
            x,
            y: y - rowHeight + 5,
            width: h.width,
            height: rowHeight,
            color: rgb(0.2, 0.4, 0.9)
          });

          page.drawText(h.label, {
            x: x + 5,
            y: y - 20,
            size: fontSize + 1,
            font,
            color: rgb(1, 1, 1)
          });

          x += h.width;
        });

        y -= rowHeight;
      }
    }

    const pdfBytes = await pdfDoc.save();

    // Set headers and send the PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=lawyers.pdf');
    return res.send(Buffer.from(pdfBytes));

       // return res.status(200).json({ lawyers: lawyers, message: "success" });

    } catch(error){

        console.error(error)
        res.status(500).json({ message: 'Internal server error', error });
    }  
}