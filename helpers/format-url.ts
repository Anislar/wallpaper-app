import { FetchProps } from "@/hooks/useFetch";
const api_url = `https://pixabay.com/api?key=${process.env.EXPO_PUBLIC_API_KEY_PIXABAY}`;

export const formatUrl = ({ params }: FetchProps) => {
  const url = new URL(api_url);
  url.searchParams.append("per_page", "25");
  url.searchParams.append("safesearch", "true");
  url.searchParams.append("image_type", "photo");
  url.searchParams.append("editors_choice", "true");
  if (!params) return url.toString();

  const paramsKeys = Object.keys(params);

  paramsKeys.forEach((key) => {
    const value =
      key === "q"
        ? encodeURIComponent(params[key])
        : params[key as keyof typeof params];
    url.searchParams.append(key, value as string);
  });
  return url.toString();
};
