// Utility function to format field names for display
export const formatFieldName = (str: string) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
};
