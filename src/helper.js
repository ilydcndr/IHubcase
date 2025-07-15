export const isEmpty = (value) => {
  if (!value) {
    return true;
  }
  
  const trimmedValue = value.trim();

  if (trimmedValue === '') {
    return true;
  }

  return false;
}

export const isValidName = (value) => {
  const regex = /^[A-Za-zğüşöçıİĞÜŞÖÇ\s]+$/u;
  return regex.test(value.trim());
}

export const isValidDate = (dateStr) => {

  const selectedDate = new Date(dateStr);
  const today = new Date();

  selectedDate.setHours(0,0,0,0);
  today.setHours(0,0,0,0);

  return selectedDate <= today;
}

export const isValidPhone = (phone) => {
  const regex = /^[\d\s()+-]+$/;
  return regex.test(phone.trim());
}

export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}
