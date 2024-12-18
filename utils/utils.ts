import {
  DEFAULT_URL_PARAMS_TO_EXCLUDE,
  EXTENDED_URL_PARAMS_TO_EXCLUDE,
  MEASUREMENTS_KEYS,
} from "./product/constants.ts";

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

export function getFiltersFromUrl(url: URL) {
  const urlParams = new URLSearchParams(url.searchParams);
  EXTENDED_URL_PARAMS_TO_EXCLUDE.forEach((param) => urlParams.delete(param));

  const filtersFromUrl = new Map<string, string[]>();
  const measurementsFromUrl = new Map<string, string[]>();

  const sortedEntries = Array.from(urlParams.entries()).sort(([keyA], [keyB]) =>
    keyA.localeCompare(keyB)
  );

  for (const [key, value] of sortedEntries) {
    const sortedValues = value.split("_").sort((a, b) => a.localeCompare(b));

    if (MEASUREMENTS_KEYS.includes(key)) {
      measurementsFromUrl.set(key, sortedValues);
    } else {
      filtersFromUrl.set(key, sortedValues);
    }
  }

  return {
    filtersFromUrl: filtersFromUrl.size > 0 ? filtersFromUrl : null,
    measurementsFromUrl: measurementsFromUrl.size > 0
      ? measurementsFromUrl
      : null,
  };
}
