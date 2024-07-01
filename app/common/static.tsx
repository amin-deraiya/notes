export const titleRegex = /^[^<>]+$/; // Allows alphanumeric characters, spaces, and some symbols
export const descriptionRegex = /^[^<]*(<br>)?[^<]*$/i; // Allows basic formatting with `<br>` tag
export const HEADER_HEIGHT = 72