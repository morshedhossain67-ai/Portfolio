// Shared validation used by BOTH the browser form and the Express API.
// Server-side validation is the real gate; client-side is for UX only.
export const LIMITS = {
  name: [2, 80],
  email: [5, 120],
  subject: [3, 120],
  message: [10, 2000],
};

// Strip ASCII control chars (keeps \t \n \r) and angle brackets.
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const ANGLE = /[<>]/g;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const clean = (value, max) =>
  String(value ?? '')
    .replace(CONTROL, '')
    .replace(ANGLE, '')
    .trim()
    .slice(0, max);

export function validateContact(input) {
  const data = {};
  const errors = {};
  for (const [key, [min, max]] of Object.entries(LIMITS)) {
    data[key] = clean(input?.[key], max);
    if (data[key].length < min) errors[key] = `Please enter at least ${min} characters.`;
  }
  if (!errors.email && !EMAIL_RE.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  return { data, errors, ok: Object.keys(errors).length === 0 };
}
