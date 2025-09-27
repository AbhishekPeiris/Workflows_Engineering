import api from "./api";

export async function checkIn(workerId) {
    const res = await api.post("/attendance/checkin", { workerId });
    return res.data;
}

export async function checkOut(workerId) {
    const res = await api.post("/attendance/checkout", { workerId });
    return res.data;
}

export async function getLogs() {
    const res = await api.get("/attendance");
    return res.data;
}
