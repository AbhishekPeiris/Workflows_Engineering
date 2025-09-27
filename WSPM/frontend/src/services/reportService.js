import api from "./api";

/**
 * Generates a report and downloads it as PDF
 * @param {object} payload { topic, tableData }
 */
export async function generateReport(payload) {
    const res = await api.post("/reports", payload, {
        responseType: "blob" // important for PDF
    });

    // Download file
    const blob = new Blob([res.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "report.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();

    return true;
}
