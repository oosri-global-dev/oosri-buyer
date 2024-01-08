export function validatePassword(value) {
  return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!,."'@$%^&*-]).{8,}$/.test(
    value
  );
}
