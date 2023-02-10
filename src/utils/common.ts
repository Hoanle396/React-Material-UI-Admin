export const cutString = (text: string, start?: number, end?: number) => {
  if (!text) return ''
  if (text.length <= (start ?? 10) + (end ?? 10)) return text
  return text.slice(0, start ?? 10) + '...' + text.slice(-(end ?? 10))
}