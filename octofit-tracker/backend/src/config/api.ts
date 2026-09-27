const DEFAULT_PORT = 8000;

export function getServerPort() {
  return DEFAULT_PORT;
}

export function getApiBaseUrl() {
  const codespaceName = process.env.CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-${DEFAULT_PORT}.app.github.dev`;
  }
  return `http://localhost:${DEFAULT_PORT}`;
}

export function getEndpointUrl(path: string) {
  return `${getApiBaseUrl()}${path}`;
}