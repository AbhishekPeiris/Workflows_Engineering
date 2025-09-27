import api from "./api";

export async function reportIncident(payload) {
    const res = await api.post("/incidents", payload);
    return res.data;
}

export async function getIncidents() {
    const res = await api.get("/incidents");
    return res.data;
}
