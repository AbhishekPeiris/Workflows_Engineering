// Format date in YYYY-MM-DD
export function formatDate(date) {
  const d = new Date(date);
  return d.toISOString().split("T")[0];
}

// Format time in HH:mm
export function formatTime(date) {
  const d = new Date(date);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
