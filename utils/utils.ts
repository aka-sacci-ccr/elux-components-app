import { DEFAULT_URL_PARAMS_TO_EXCLUDE } from "./product/constants.ts";

export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export function getUrlFilter(
  value: string,
  url: URL,
  filterKey: string,
  filterFromUrl?: string,
) {
  const urlWithFilter = new URL(url.href);
  const urlValues = filterFromUrl?.split("_") ?? [];
  const selected = urlValues.includes(value);

  DEFAULT_URL_PARAMS_TO_EXCLUDE.forEach((param) =>
    urlWithFilter.searchParams.delete(param)
  );

  const newUrlValues = selected
    ? urlValues.filter((v) => v !== value)
    : [...urlValues, value];

  newUrlValues.length
    ? urlWithFilter.searchParams.set(filterKey, newUrlValues.join("_"))
    : urlWithFilter.searchParams.delete(filterKey);

  return { urlWithFilter: urlWithFilter.href, selected };
}
