const DEFAULT_PORT = 8000;

// Falls back to localhost when VITE_CODESPACE_NAME is unset to avoid `https://undefined-8000...` URLs
export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-${DEFAULT_PORT}.app.github.dev`;
  }
  return `http://localhost:${DEFAULT_PORT}`;
}

export function getEndpointUrl(path) {
  return `${getApiBaseUrl()}${path}`;
}
