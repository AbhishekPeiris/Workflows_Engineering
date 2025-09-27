// src/services/workerService.js
import api from "./api";

export async function getWorkers(searchQuery = "") {
    const url = searchQuery ? `/workers?search=${encodeURIComponent(searchQuery)}` : "/workers";
    const res = await api.get(url);
    return res.data;
}

export async function getWorker(id) {
    const res = await api.get(`/workers/${id}`);
    return res.data;
}

export async function createWorker(worker) {
    const res = await api.post("/workers", worker);
    return res.data;
}

export async function updateWorker(id, worker) {
    const res = await api.put(`/workers/${id}`, worker);
    return res.data;
}

export async function deleteWorker(id) {
    const res = await api.delete(`/workers/${id}`);
    return res.data;
}

export async function getNextWorkerId() {
    const res = await api.get("/workers/next-id");
    return res.data;
}
