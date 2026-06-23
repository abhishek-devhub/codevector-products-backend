export function encodeCursor(cursorObj) {
  return Buffer.from(JSON.stringify(cursorObj)).toString("base64");
}

export function decodeCursor(cursor) {
  try {
    const decoded = Buffer.from(cursor, "base64").toString("utf-8");
    const parsed = JSON.parse(decoded);

    if (!parsed.updatedAt || !parsed.id) {
      throw new Error("Invalid cursor payload");
    }

    return parsed;
  } catch (error) {
    throw new Error("Invalid cursor");
  }
}