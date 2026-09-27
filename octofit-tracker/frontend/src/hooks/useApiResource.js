import { useEffect, useState } from 'react';

import { getEndpointUrl } from '../config/api';

// Backend responses vary by resource: { items: [...] }, { entries: [...] }, or a raw array
function extractRecords(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }
  return payload.items ?? payload.entries ?? [];
}

export function useApiResource(endpointPath) {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchResource() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(getEndpointUrl(endpointPath), { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const payload = await response.json();
        setRecords(extractRecords(payload));
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchResource();

    return () => controller.abort();
  }, [endpointPath]);

  return { records, isLoading, error };
}
