import { formatUrl } from "@/helpers/format-url";
import axios from "axios";
import { useEffect, useState } from "react";

export interface FetchProps {
  params: {
    q: string;
    page: number;
    category: string;
    order: string;
    orientation: string;
    type: string;
    colors: string;
  };
}
enum Status {
  idle = "idle",
  loading = "loading",
  loadingMore = "loadingMore",
  error = "error",
}
function useFetch({ params }: FetchProps): {
  data: [];
  status: Status;
} {
  const [data, setData] = useState<any>([]);
  const [status, setStaus] = useState<Status>(Status.idle);
  useEffect(() => {
    const abortController = new AbortController();
    let isMounted = true;
    const getPhotos = async () => {
      try {
        setStaus(params.page > 1 ? Status.loadingMore : Status.loading);
        const response = await axios.get(formatUrl({ params }), {
          signal: abortController.signal,
        });
        console.log("here to fetch", params.page);

        setData((prev: any) =>
          params.page > 1
            ? [...prev, ...response.data.hits]
            : [...response.data.hits]
        );
      } catch (error: Error | any) {
        setStaus(Status.error);
      } finally {
        setStaus(Status.idle);
      }
    };
    if (isMounted) getPhotos();
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [
    params?.q,
    params?.page,
    params?.category,
    params?.order,
    params?.orientation,
    params?.type,
    params?.colors,
  ]);
  return { data, status };
}

export default useFetch;
