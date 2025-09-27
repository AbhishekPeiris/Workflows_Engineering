import api from "./api";

export async function generatePayroll(payload) {
    const res = await api.post("/payroll", payload);
    return res.data;
}

export async function getPayrolls() {
    const res = await api.get("/payroll");
    return res.data;
}
