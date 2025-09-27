import api from "./api";

export async function createInspection(payload) {
    try {
        console.log("Creating safety inspection with payload:", payload);
        const res = await api.post("/safety", payload);
        console.log("Safety inspection response:", res.data);
        return res.data;
    } catch (error) {
        console.error("Safety inspection creation error:", error.response?.data || error.message);
        throw error;
    }
}

export async function getInspections() {
    try {
        const res = await api.get("/safety");
        console.log("Safety inspections fetched:", res.data);
        return res.data;
    } catch (error) {
        console.error("Get safety inspections error:", error.response?.data || error.message);
        throw error;
    }
}

export async function getInspection(id) {
    try {
        const res = await api.get(`/safety/${id}`);
        return res.data;
    } catch (error) {
        console.error("Get safety inspection error:", error.response?.data || error.message);
        throw error;
    }
}

export async function updateInspection(id, payload) {
    try {
        const res = await api.put(`/safety/${id}`, payload);
        return res.data;
    } catch (error) {
        console.error("Update safety inspection error:", error.response?.data || error.message);
        throw error;
    }
}
