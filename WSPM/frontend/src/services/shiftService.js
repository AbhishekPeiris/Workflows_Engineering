import api from "./api";

export async function requestShiftSwap(payload) {
    const res = await api.post("/shifts", payload);
    return res.data;
}

export async function getShiftSwaps() {
    const res = await api.get("/shifts");
    return res.data;
}

export async function suggestReplacement(swapId) {
    const res = await api.put(`/shifts/${swapId}/suggest`);
    return res.data;
}
