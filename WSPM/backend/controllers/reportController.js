const { generateReportFile } = require("../services/reportService");
const fs = require("fs");

exports.generateReport = async (req, res) => {
  try {
    const { topic, tableData, companyInfo, metadata } = req.body;

    // Validate input data
    if (!topic || !tableData || !Array.isArray(tableData) || tableData.length === 0) {
      return res.status(400).json({
        error: "Invalid input data. Topic and table data are required."
      });
    }

    // Generate the professional PDF report
    const filePath = await generateReportFile(topic, tableData, {
      ...metadata,
      companyInfo: companyInfo || {
        name: "WORKFLOWS ENGINEERING",
        subtitle: "Equipment & Tool Management"
      }
    });

    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="Professional_Report_${Date.now()}.pdf"`);
    res.setHeader('Cache-Control', 'no-cache');

    // Send file to client
    res.download(filePath, `Professional_Report_${Date.now()}.pdf`, (err) => {
      if (err) {
        console.error("Download error:", err);
        if (!res.headersSent) {
          res.status(500).json({ error: "Failed to download report" });
        }
      }

      // Clean up the file after download (optional - you might want to keep reports)
      setTimeout(() => {
        if (fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath);
            console.log(`Report file cleaned up: ${filePath}`);
          } catch (unlinkError) {
            console.error("Failed to clean up report file:", unlinkError);
          }
        }
      }, 60000); // Delete after 1 minute
    });

  } catch (error) {
    console.error("Report generation error:", error);
    res.status(500).json({
      error: "Failed to generate report",
      details: error.message
    });
  }
};
