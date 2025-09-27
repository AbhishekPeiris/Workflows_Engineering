import api from "./api";

export async function checkIn(workerId, method = "Manual") {
    const res = await api.post("/attendance/checkin", { workerId, method });
    return res.data;
}

export async function checkOut(workerId, method = "Manual") {
    const res = await api.post("/attendance/checkout", { workerId, method });
    return res.data;
}

export async function getLogs() {
    const res = await api.get("/attendance");
    return res.data;
}

export async function getWorkerStatus(workerId) {
    const res = await api.get(`/attendance/status/${workerId}`);
    return res.data;
}
