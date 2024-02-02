const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/generate-pdf', (req, res) => {
  // Créez un nouveau document PDF
  const doc = new PDFDocument();

  // Pipe the PDF to a buffer
  const buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {
    const pdfBuffer = Buffer.concat(buffers);

    // Envoyer le PDF en réponse
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=generated.pdf');
    res.send(pdfBuffer);
  });

  // Ajoutez du texte avec des caractères spéciaux
  doc.font('Helvetica-Bold').fontSize(12).text('ééééééééééé', 100, 100);

  // Finalisez le document
  doc.end();
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
