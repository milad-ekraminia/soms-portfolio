// src/constants/file.ts

// Units
export const KB = 1024;
export const MB = KB * 1024;

// File limits
export const FILE_SIZE_LIMITS = {
  MAX_10_MB: 10 * MB,
};

// Allowed file types
export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
];

// File size formatter
export const formatFileSize = (size: number): string =>
  size >= MB ? `${(size / MB).toFixed(2)} MB` : `${(size / KB).toFixed(2)} KB`;
