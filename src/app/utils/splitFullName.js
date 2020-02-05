export default function splitFullname(string) {
  const [firstName, ...lastName] = string.split(' ');
  return { firstName, lastName: lastName.join(' ') };
}
