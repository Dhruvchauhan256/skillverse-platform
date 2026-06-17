// Simple logger — only logs in development, never logs sensitive data
const isDev = process.env.NODE_ENV !== "production";

const logError = (label, error) => {
  if (isDev) {
    console.error(`[ERROR] ${label}:`, error?.message || error);
  }
  // In production, plug in Sentry/Datadog/LogRocket here instead
};

const logInfo = (label, data) => {
  if (isDev) {
    console.log(`[INFO] ${label}:`, data);
  }
};

module.exports = { logError, logInfo };