const defaultDevelopmentUrl = "http://10.0.2.2:5170";

export const API_SERVER_URL = (
  process.env.EXPO_PUBLIC_API_URL ?? defaultDevelopmentUrl
).replace(/\/$/, "");
