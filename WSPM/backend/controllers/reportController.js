const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

exports.generateReport = async (req, res) => {
  try {
    const { topic, tableData } = req.body;

    // Ensure reports folder exists
    const reportsDir = path.join(__dirname, "../reports");
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir);
    }

    const doc = new PDFDocument();
    const fileName = `report_${Date.now()}.pdf`;
    const filePath = path.join(reportsDir, fileName);

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Header
    doc.fontSize(18).text("Company Name", { align: "center" });
    doc.fontSize(12).text("Slogan", { align: "center" });
    doc.moveDown();

    doc.fontSize(10).text(`Date: ${new Date().toLocaleDateString()}`);
    doc.text(`Time: ${new Date().toLocaleTimeString()}`);
    doc.moveDown();

    // Topic
    doc.fontSize(14).text(topic, { underline: true, align: "center" });
    doc.moveDown();

    // Table Data
    tableData.forEach((row, idx) => {
      doc.text(`${idx + 1}. ${JSON.stringify(row)}`);
    });

    doc.moveDown();
    doc.text("Signature: __________________", { align: "right" });
    doc.text("Stock Manager", { align: "right" });

    doc.end();

    stream.on("finish", () => {
      res.download(filePath); // send file to client
    });
  } catch (err) {
    console.error("Report error:", err);
    res.status(500).json({ error: err.message });
  }
};
