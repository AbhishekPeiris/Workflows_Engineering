// Validate Name (only letters + spaces)
function validateName(name) {
  return /^[A-Za-z\s]+$/.test(name);
}

// Validate Age (integer only)
function validateAge(age) {
  return Number.isInteger(age);
}

// Validate Phone (exactly 10 digits)
function validatePhone(phone) {
  return /^\d{10}$/.test(phone);
}

// Validate Date (not manual entry, must be Date object)
function validateDate(date) {
  return date instanceof Date && !isNaN(date.getTime());
}

// Validate Stock (decimal allowed)
function validateStock(stock) {
  return !isNaN(stock) && stock >= 0;
}

module.exports = {
  validateName,
  validateAge,
  validatePhone,
  validateDate,
  validateStock,
};
