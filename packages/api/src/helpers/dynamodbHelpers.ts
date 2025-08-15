/**
 * Sanitize data for DynamoDB storage
 * DynamoDB has limitations on data types and sizes
 */
export function sanitizeDataForDynamoDB(data: any): any {
  if (data === null || data === undefined) {
    return null;
  }

  if (typeof data === "string") {
    // DynamoDB string limit is 400KB
    return data.length > 400000 ? data.substring(0, 400000) : data;
  }

  if (typeof data === "number") {
    return data;
  }

  if (typeof data === "boolean") {
    return data;
  }

  if (Array.isArray(data)) {
    // Limit array size to prevent large items
    const maxArraySize = 100;
    return data.slice(0, maxArraySize).map(item => sanitizeDataForDynamoDB(item));
  }

  if (typeof data === "object") {
    const sanitized: any = {};
    const keys = Object.keys(data);

    // Limit object keys to prevent large items
    const maxKeys = 50;
    const limitedKeys = keys.slice(0, maxKeys);

    for (const key of limitedKeys) {
      const value = data[key];
      if (value !== undefined && value !== null) {
        sanitized[key] = sanitizeDataForDynamoDB(value);
      }
    }

    return sanitized;
  }

  return data;
}
