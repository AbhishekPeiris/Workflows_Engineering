import api from "./api";

export async function generatePayroll(payload) {
    try {
        console.log("Generating payroll with payload:", payload);
        const res = await api.post("/payroll", payload);
        console.log("Payroll generation response:", res.data);
        return res.data;
    } catch (error) {
        console.error("Payroll generation error:", error.response?.data || error.message);
        throw error;
    }
}

export async function getPayrolls() {
    try {
        const res = await api.get("/payroll");
        console.log("Payrolls fetched:", res.data);
        return res.data;
    } catch (error) {
        console.error("Get payrolls error:", error.response?.data || error.message);
        throw error;
    }
}

export async function getPayroll(id) {
    try {
        const res = await api.get(`/payroll/${id}`);
        return res.data;
    } catch (error) {
        console.error("Get payroll error:", error.response?.data || error.message);
        throw error;
    }
}

export async function updatePayrollStatus(id, status) {
    try {
        const res = await api.put(`/payroll/${id}/status`, { status });
        return res.data;
    } catch (error) {
        console.error("Update payroll status error:", error.response?.data || error.message);
        throw error;
    }
}
