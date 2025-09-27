// Reuse same logic as backend validators

export function validateName(name) {
  return /^[A-Za-z\s]+$/.test(name);
}

export function validateAge(age) {
  return Number.isInteger(Number(age));
}

export function validatePhone(phone) {
  return /^\d{10}$/.test(phone);
}

export function validateDate(date) {
  return !isNaN(new Date(date).getTime());
}

export function validateStock(stock) {
  return !isNaN(stock) && stock >= 0;
}
