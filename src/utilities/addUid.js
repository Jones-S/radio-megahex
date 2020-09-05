export default function addUid(str) {
  const r = Math.random().toString(36).substring(9)
  return `${str}-${r}`
}
