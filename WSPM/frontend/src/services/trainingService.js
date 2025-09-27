import api from "./api";

export async function addTraining(payload) {
    const res = await api.post("/training", payload);
    return res.data;
}

export async function getTrainings() {
    const res = await api.get("/training");
    return res.data;
}
