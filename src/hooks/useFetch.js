import { useEffect, useState } from "react";

export default function useFetch(api, dependency, fetchKey) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await api(dependency, { signal });
        if (!signal.aborted) {
          setData(res.data);
          setError(null);
        }
      } catch (error) {
        if (!signal.aborted) {
          setError(error?.response?.data?.status_message || error?.message);
        }
        console.error(error);
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [api, dependency, fetchKey]);

  return { data, error, isLoading };
}
