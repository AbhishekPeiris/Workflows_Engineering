const path = require("path");
const fs = require("fs");

// Build company header for PDF
function buildPdfHeader(doc) {
  const logoPath = path.join(__dirname, "../uploads/logo.png");

  if (fs.existsSync(logoPath)) {
    doc.image(logoPath, 50, 40, { width: 60 });
  }

  doc.fontSize(16).text("Company Name", 120, 50);
  doc.fontSize(10).text("Slogan goes here", 120, 70);

  doc.moveDown();
  doc
    .fontSize(10)
    .text(`Website: example.com     Date: ${new Date().toLocaleDateString()}`);
  doc.text(
    `Email: info@example.com     Time: ${new Date().toLocaleTimeString()}`
  );
  doc.text("Phone: 0712345678");
  doc.moveDown();
}

module.exports = { buildPdfHeader };
