export default function createMeta(title, date, thumbnail, excerpt, file) {
  return `---\ntitle: ${title}\ndate: '${date}'\nthumbnail: ${thumbnail}\nexcerpt: ${excerpt}\n---\n${file}`
}
