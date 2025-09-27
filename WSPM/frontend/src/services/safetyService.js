import api from "./api";

export async function createInspection(payload) {
    const res = await api.post("/safety", payload);
    return res.data;
}

export async function getInspections() {
    const res = await api.get("/safety");
    return res.data;
}
