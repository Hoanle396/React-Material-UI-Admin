export const cutString = (text: string, start?: number, end?: number) => {
  if (!text) return ''
  if (text.length <= (start ?? 10) + (end ?? 10)) return text
  return text.slice(0, start ?? 10) + '...' + text.slice(-(end ?? 10))
}

export const getLocalStorage = (key: string) => {
  return window.localStorage.getItem(key)
}

export const removeLocalStorage = (key: string) => {
  return window.localStorage.removeItem(key)
}

export const setLocalStorage = (key: string, value: any) => {
  return window.localStorage.setItem(key, value)
}