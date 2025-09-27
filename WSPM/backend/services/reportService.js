const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const { buildPdfHeader } = require("../utils/pdfTemplate");

// Build PDF report with company header/footer
async function generateReportFile(topic, tableData) {
  const doc = new PDFDocument({ margin: 50 });
  const fileName = `report_${Date.now()}.pdf`;
  const filePath = path.join(__dirname, "../reports", fileName);

  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  // Header (Logo + Company Info)
  buildPdfHeader(doc);

  doc.moveDown();
  doc.fontSize(14).text(topic, { underline: true, align: "center" });
  doc.moveDown();

  // Simple table-like rendering
  tableData.forEach((row, idx) => {
    doc.fontSize(10).text(`${idx + 1}. ${JSON.stringify(row)}`);
  });

  doc.moveDown();
  doc.text("Signature: __________________", { align: "right" });
  doc.text("Stock Manager", { align: "right" });

  doc.end();

  return new Promise((resolve) => {
    stream.on("finish", () => resolve(filePath));
  });
}

module.exports = { generateReportFile };
