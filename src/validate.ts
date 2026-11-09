export function requireFields<T extends object>(
  input: T,
  fields: (keyof T)[],
  typeName: string
): void {
  const missing = fields.filter((field) => {
    const value = input[field];
    return value === undefined || value === null || value === '';
  });
  if (missing.length > 0) {
    throw new Error(`${typeName} schema is missing required field(s): ${missing.join(', ')}`);
  }
}

export function stripUndefined<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}
