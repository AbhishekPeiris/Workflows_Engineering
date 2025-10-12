const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

// Professional ptfIndex theme colors
const COLORS = {
  primary: '#f1c40f',
  primaryDark: '#f39c12',
  secondary: '#2c3e50',
  white: '#ffffff',
  black: '#1a1a1a',
  grayLight: '#f8f9fa',
  grayMedium: '#6c757d',
  grayDark: '#343a40',
  success: '#27ae60',
  warning: '#f39c12',
  danger: '#e74c3c',
  blue: '#3498db'
};

// Build professional PDF header with company logo and branding
function buildProfessionalHeader(doc) {
  // Professional header background with gradient effect
  doc.rect(0, 0, doc.page.width, 120)
    .fillColor(COLORS.primary)
    .fill();

  // Company Logo - properly positioned and sized
  const logoPath = path.join(__dirname, "../assets/logo.jpg");
  if (fs.existsSync(logoPath)) {
    try {
      doc.image(logoPath, 50, 20, {
        width: 80,
        height: 80,
        fit: [80, 80]
      });
    } catch (error) {
      console.log("Logo loading error:", error);
      // Professional fallback with company initials
      doc.rect(50, 20, 80, 80)
        .fillColor(COLORS.white)
        .fill()
        .strokeColor(COLORS.secondary)
        .lineWidth(2)
        .stroke();

      doc.fontSize(28)
        .fillColor(COLORS.secondary)
        .font('Helvetica-Bold')
        .text('WE', 75, 50);
    }
  } else {
    // Professional fallback design
    doc.circle(90, 60, 40)
      .fillColor(COLORS.white)
      .fill()
      .strokeColor(COLORS.secondary)
      .lineWidth(3)
      .stroke();

    doc.fontSize(24)
      .fillColor(COLORS.secondary)
      .font('Helvetica-Bold')
      .text('WE', 80, 50);
  }

  // Company name and branding
  doc.fontSize(24)
    .fillColor(COLORS.secondary)
    .font('Helvetica-Bold')
    .text('WORKFLOWS ENGINEERING', 150, 30);

  doc.fontSize(12)
    .fillColor(COLORS.secondary)
    .font('Helvetica')
    .text('Professional Construction Management Solutions', 150, 55)
    .text('BUILD YOUR DREAMS', 150, 70);

  // Professional separator with shadow effect
  doc.rect(0, 115, doc.page.width, 5)
    .fillColor(COLORS.secondary)
    .fill();

  return 140; // Return Y position after header
}

// Build executive summary with better visual design
function buildExecutiveSummary(doc, tableData, startY) {
  const totalEmployees = tableData.length;
  const totalPresent = tableData.reduce((sum, row) => sum + parseInt(row.present || 0), 0);
  const totalAbsent = tableData.reduce((sum, row) => sum + parseInt(row.absent || 0), 0);
  const totalOTHours = tableData.reduce((sum, row) => sum + parseFloat(row.otHours || 0), 0);
  const totalDays = totalPresent + totalAbsent || 1;
  const avgAttendance = ((totalPresent / totalDays) * 100).toFixed(1);
  const avgOTHours = totalEmployees > 0 ? (totalOTHours / totalEmployees).toFixed(1) : '0.0';

  // Modern card design with shadow
  doc.rect(40, startY, doc.page.width - 80, 120)
    .fillColor(COLORS.grayLight)
    .fill();

  // Shadow effect
  doc.rect(43, startY + 3, doc.page.width - 80, 120)
    .fillColor('#e0e0e0')
    .fill();

  doc.rect(40, startY, doc.page.width - 80, 120)
    .fillColor(COLORS.white)
    .fill()
    .strokeColor(COLORS.grayMedium)
    .lineWidth(1)
    .stroke();

  // Header with icon
  doc.fontSize(16)
    .fillColor(COLORS.secondary)
    .font('Helvetica-Bold')
    .text('📊 EXECUTIVE SUMMARY', 60, startY + 20);

  // Statistics in a clean grid layout (updated for 5 columns)
  const stats = [
    { label: 'Total Employees', value: totalEmployees, x: 70, color: COLORS.blue },
    { label: 'Present Days', value: totalPresent, x: 170, color: COLORS.success },
    { label: 'Absent Days', value: totalAbsent, x: 270, color: COLORS.danger },
    { label: 'Total OT Hours', value: `${totalOTHours.toFixed(1)}h`, x: 370, color: '#e67e22' },
    { label: 'Avg Attendance', value: `${avgAttendance}%`, x: 470, color: COLORS.primaryDark }
  ];

  stats.forEach(stat => {
    // Value with color coding
    doc.fontSize(18)
      .fillColor(stat.color)
      .font('Helvetica-Bold')
      .text(stat.value, stat.x, startY + 50);

    // Label
    doc.fontSize(9)
      .fillColor(COLORS.grayDark)
      .font('Helvetica')
      .text(stat.label, stat.x, startY + 75);
  });

  // Additional OT metrics
  doc.fontSize(12)
    .fillColor(COLORS.grayDark)
    .font('Helvetica')
    .text(`Average OT per Employee: ${avgOTHours} hours`, 60, startY + 95);

  return startY + 140;
}

// Build professional table with modern design
function buildProfessionalTable(doc, tableData, startY) {
  const tableHeaders = ['#', 'Worker ID', 'Present', 'Absent', 'OT Hours', 'Attendance %', 'Performance'];
  const columnWidths = [30, 90, 65, 65, 70, 80, 85];
  let currentY = startY;

  // Table title with better typography
  doc.fontSize(18)
    .font('Helvetica-Bold')
    .fillColor(COLORS.secondary)
    .text('📋 DETAILED ATTENDANCE & OVERTIME REPORT', 40, currentY);

  currentY += 40;

  // Modern table header
  doc.rect(40, currentY, doc.page.width - 80, 35)
    .fillColor(COLORS.secondary)
    .fill();

  // Header text with better spacing
  let currentX = 50;
  doc.fontSize(11)
    .font('Helvetica-Bold')
    .fillColor(COLORS.white);

  tableHeaders.forEach((header, index) => {
    doc.text(header, currentX, currentY + 12, {
      width: columnWidths[index] - 10,
      align: 'center'
    });
    currentX += columnWidths[index];
  });

  currentY += 35;

  // Table rows with alternating colors and better spacing
  tableData.forEach((row, index) => {
    const rowHeight = 35;
    const total = parseInt(row.present || 0) + parseInt(row.absent || 0) || 1;
    const percentage = ((parseInt(row.present || 0) / total) * 100).toFixed(1);
    const performance = percentage >= 95 ? 'Excellent' :
      percentage >= 90 ? 'Very Good' :
        percentage >= 80 ? 'Good' :
          percentage >= 70 ? 'Fair' : 'Poor';
    const otHours = parseFloat(row.otHours || 0).toFixed(1);

    // Row background with alternating colors
    if (index % 2 === 0) {
      doc.rect(40, currentY, doc.page.width - 80, rowHeight)
        .fillColor('#f8f9fa')
        .fill();
    }

    // Row border
    doc.rect(40, currentY, doc.page.width - 80, rowHeight)
      .strokeColor(COLORS.grayLight)
      .lineWidth(0.5)
      .stroke();

    currentX = 50;
    doc.fontSize(10)
      .font('Helvetica');

    const rowData = [
      (index + 1).toString(),
      row.workerId || 'N/A',
      (row.present || 0).toString(),
      (row.absent || 0).toString(),
      `${otHours}h`,
      `${percentage}%`,
      performance
    ];

    rowData.forEach((data, colIndex) => {
      let textColor = COLORS.black;
      let fontWeight = 'Helvetica';

      if (colIndex === 4) { // OT Hours
        textColor = otHours > 40 ? COLORS.danger : otHours > 20 ? COLORS.warning : COLORS.success;
        fontWeight = 'Helvetica-Bold';
      } else if (colIndex === 5) { // Attendance percentage
        textColor = percentage >= 90 ? COLORS.success :
          percentage >= 80 ? COLORS.warning : COLORS.danger;
        fontWeight = 'Helvetica-Bold';
      } else if (colIndex === 6) { // Performance
        textColor = percentage >= 90 ? COLORS.success :
          percentage >= 80 ? COLORS.warning : COLORS.danger;
        fontWeight = 'Helvetica-Bold';
      }

      doc.fillColor(textColor)
        .font(fontWeight)
        .text(data, currentX, currentY + 12, {
          width: columnWidths[colIndex] - 10,
          align: colIndex === 0 ? 'center' : 'left'
        });
      currentX += columnWidths[colIndex];
    });

    currentY += rowHeight;

    // Check for page break
    if (currentY > doc.page.height - 200) {
      doc.addPage();
      currentY = buildProfessionalHeader(doc);
    }
  });

  // Table border
  doc.rect(40, startY + 40, doc.page.width - 80, currentY - (startY + 40))
    .strokeColor(COLORS.grayMedium)
    .lineWidth(1)
    .stroke();

  return currentY + 30;
}

// Build performance analysis with visual indicators
function buildPerformanceAnalysis(doc, tableData, startY) {
  const performanceStats = {
    excellent: tableData.filter(row => {
      const total = parseInt(row.present || 0) + parseInt(row.absent || 0) || 1;
      return ((parseInt(row.present || 0) / total) * 100) >= 95;
    }).length,
    veryGood: tableData.filter(row => {
      const total = parseInt(row.present || 0) + parseInt(row.absent || 0) || 1;
      const percentage = ((parseInt(row.present || 0) / total) * 100);
      return percentage >= 90 && percentage < 95;
    }).length,
    good: tableData.filter(row => {
      const total = parseInt(row.present || 0) + parseInt(row.absent || 0) || 1;
      const percentage = ((parseInt(row.present || 0) / total) * 100);
      return percentage >= 80 && percentage < 90;
    }).length,
    fair: tableData.filter(row => {
      const total = parseInt(row.present || 0) + parseInt(row.absent || 0) || 1;
      const percentage = ((parseInt(row.present || 0) / total) * 100);
      return percentage >= 70 && percentage < 80;
    }).length
  };

  performanceStats.poor = tableData.length - performanceStats.excellent -
    performanceStats.veryGood - performanceStats.good - performanceStats.fair;

  // OT Analysis
  const otStats = {
    high: tableData.filter(row => parseFloat(row.otHours || 0) > 40).length,
    medium: tableData.filter(row => {
      const ot = parseFloat(row.otHours || 0);
      return ot > 20 && ot <= 40;
    }).length,
    low: tableData.filter(row => {
      const ot = parseFloat(row.otHours || 0);
      return ot > 0 && ot <= 20;
    }).length,
    none: tableData.filter(row => parseFloat(row.otHours || 0) === 0).length
  };

  // Performance analysis card (increased height for OT analysis)
  doc.rect(40, startY, doc.page.width - 80, 180)
    .fillColor(COLORS.white)
    .fill()
    .strokeColor(COLORS.grayMedium)
    .lineWidth(1)
    .stroke();

  doc.fontSize(16)
    .font('Helvetica-Bold')
    .fillColor(COLORS.secondary)
    .text('📈 PERFORMANCE & OVERTIME ANALYSIS', 60, startY + 20);

  // Attendance Performance
  doc.fontSize(14)
    .font('Helvetica-Bold')
    .fillColor(COLORS.secondary)
    .text('Attendance Performance:', 60, startY + 50);

  const performances = [
    { label: 'Excellent (95%+)', count: performanceStats.excellent, color: '#27ae60', y: 70 },
    { label: 'Very Good (90-94%)', count: performanceStats.veryGood, color: '#2ecc71', y: 85 },
    { label: 'Good (80-89%)', count: performanceStats.good, color: '#f39c12', y: 100 },
    { label: 'Fair (70-79%)', count: performanceStats.fair, color: '#e67e22', y: 115 },
    { label: 'Poor (<70%)', count: performanceStats.poor, color: '#e74c3c', y: 130 }
  ];

  const maxCount = Math.max(...performances.map(p => p.count)) || 1;

  performances.forEach(perf => {
    const barWidth = (perf.count / maxCount) * 150;

    // Performance bar
    doc.rect(250, startY + perf.y, barWidth, 8)
      .fillColor(perf.color)
      .fill();

    // Label and count
    doc.fontSize(9)
      .fillColor(COLORS.black)
      .font('Helvetica')
      .text(`${perf.label}: ${perf.count}`, 60, startY + perf.y + 1);
  });

  // OT Analysis
  doc.fontSize(14)
    .font('Helvetica-Bold')
    .fillColor(COLORS.secondary)
    .text('Overtime Distribution:', 60, startY + 150);

  const otAnalysis = [
    { label: 'High OT (>40h)', count: otStats.high, color: '#e74c3c' },
    { label: 'Medium OT (20-40h)', count: otStats.medium, color: '#f39c12' },
    { label: 'Low OT (1-20h)', count: otStats.low, color: '#2ecc71' },
    { label: 'No OT (0h)', count: otStats.none, color: '#95a5a6' }
  ];

  otAnalysis.forEach((ot, index) => {
    const x = 60 + (index * 120);
    doc.fontSize(9)
      .fillColor(ot.color)
      .font('Helvetica-Bold')
      .text(`${ot.label}: ${ot.count}`, x, startY + 165);
  });

  return startY + 200;
}

// Build professional signature section
function buildSignatureSection(doc, startY) {
  const signatureY = Math.max(startY + 40, doc.page.height - 200);

  // Signature section header
  doc.fontSize(16)
    .font('Helvetica-Bold')
    .fillColor(COLORS.secondary)
    .text('✍️ AUTHORIZATION & APPROVAL', 40, signatureY - 25);

  // Two signature boxes side by side
  const boxWidth = (doc.page.width - 120) / 2;

  // Manager signature box
  doc.rect(40, signatureY, boxWidth, 80)
    .fillColor(COLORS.white)
    .fill()
    .strokeColor(COLORS.grayMedium)
    .lineWidth(1)
    .stroke();

  doc.fontSize(12)
    .font('Helvetica-Bold')
    .fillColor(COLORS.secondary)
    .text('PROJECT MANAGER', 60, signatureY + 15);

  doc.fontSize(10)
    .font('Helvetica')
    .fillColor(COLORS.black)
    .text('Signature: ________________________', 60, signatureY + 35)
    .text('Print Name: _______________________', 60, signatureY + 50)
    .text('Date: ____________________________', 60, signatureY + 65);

  // HR signature box
  doc.rect(60 + boxWidth, signatureY, boxWidth, 80)
    .fillColor(COLORS.white)
    .fill()
    .strokeColor(COLORS.grayMedium)
    .lineWidth(1)
    .stroke();

  doc.fontSize(12)
    .font('Helvetica-Bold')
    .fillColor(COLORS.secondary)
    .text('HR DEPARTMENT', 80 + boxWidth, signatureY + 15);

  doc.fontSize(10)
    .font('Helvetica')
    .fillColor(COLORS.black)
    .text('Signature: ________________________', 80 + boxWidth, signatureY + 35)
    .text('Print Name: _______________________', 80 + boxWidth, signatureY + 50)
    .text('Date: ____________________________', 80 + boxWidth, signatureY + 65);

  return signatureY + 100;
}

// Build professional footer
function buildProfessionalFooter(doc) {
  const footerY = doc.page.height - 70;

  // Footer background
  doc.rect(0, footerY - 10, doc.page.width, 80)
    .fillColor(COLORS.grayLight)
    .fill();

  // Company info and document details
  doc.fontSize(8)
    .fillColor(COLORS.grayDark)
    .font('Helvetica')
    .text('WORKFLOWS ENGINEERING | Professional Construction Management Solutions',
      40, footerY, { align: 'center', width: doc.page.width - 80 })
    .text('📧 info@workflowsengineering.com | 📞 +1 (555) 123-4567 | 🌐 www.workflowsengineering.com',
      40, footerY + 12, { align: 'center', width: doc.page.width - 80 })
    .text('This is an official document generated automatically. Unauthorized modification is prohibited.',
      40, footerY + 24, { align: 'center', width: doc.page.width - 80 })
    .text(`Document ID: RPT-${Date.now()} | Generated: ${new Date().toLocaleString()}`,
      40, footerY + 36, { align: 'center', width: doc.page.width - 80 });

  // Footer separator
  doc.rect(40, footerY - 5, doc.page.width - 80, 2)
    .fillColor(COLORS.primary)
    .fill();
}

// Main report generation function with improved UX
async function generateReportFile(topic, tableData, metadata = {}) {
  const doc = new PDFDocument({
    margin: 0,
    size: 'A4',
    info: {
      Title: `${topic} - WORKFLOWS ENGINEERING`,
      Author: 'WORKFLOWS ENGINEERING',
      Subject: 'Professional Attendance Report',
      Creator: 'WSPM Report Management System',
      Keywords: 'attendance, report, construction, management'
    }
  });

  const fileName = `Professional_Report_${Date.now()}.pdf`;
  const reportsDir = path.join(__dirname, "../reports");

  // Ensure reports directory exists
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const filePath = path.join(reportsDir, fileName);
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  // Build professional header with logo
  let currentY = buildProfessionalHeader(doc);

  // Document metadata section
  doc.fontSize(10)
    .fillColor(COLORS.grayMedium)
    .font('Helvetica')
    .text(`Report Generated: ${metadata.generatedDate || new Date().toLocaleDateString()}`, 40, currentY)
    .text(`Generated By: ${metadata.generatedBy || 'System Administrator'}`, 40, currentY + 12)
    .text(`Total Records: ${metadata.totalRecords || tableData.length}`, 40, currentY + 24)
    .text(`Document ID: RPT-${Date.now()}`, 400, currentY, { align: 'right' })
    .text(`Status: Official Report`, 400, currentY + 12, { align: 'right' })
    .text(`Classification: Internal Use`, 400, currentY + 24, { align: 'right' });

  currentY += 50;

  // Report title with better typography
  doc.fontSize(24)
    .font('Helvetica-Bold')
    .fillColor(COLORS.secondary)
    .text(topic, 40, currentY, { align: 'center', width: doc.page.width - 80 });

  currentY += 60;

  // Executive summary
  currentY = buildExecutiveSummary(doc, tableData, currentY);

  // Detailed table
  currentY = buildProfessionalTable(doc, tableData, currentY);

  // Performance analysis
  currentY = buildPerformanceAnalysis(doc, tableData, currentY);

  // Signature section
  buildSignatureSection(doc, currentY);

  // Professional footer
  buildProfessionalFooter(doc);

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on("finish", () => resolve(filePath));
    stream.on("error", reject);
  });
}

module.exports = { generateReportFile };
