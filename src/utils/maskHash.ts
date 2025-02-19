export default function maskHash(hash: string): string {
  return hash.substring(0, 10) + "*****"; // Muestra los primeros 10 caracteres
}
