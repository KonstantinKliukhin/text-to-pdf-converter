import { useEffect, useState } from "react";

import { getIsClient } from "./get-is-client";

type UsePromiseReturn<T> = {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
};

export function usePromise<T>(callback: () => Promise<T>): UsePromiseReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!getIsClient()) return;

    setIsLoading(true);

    callback()
      .then((result) => {
        setData(result);
      })
      .catch((err) => {
        if (err instanceof Error) {
          setError(err);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [callback]);

  return { data, isLoading, error };
}
