export class ApiError extends Error {
  constructor(url: string, public status: number) {
    super(`${url} returned ${status}`)

    // Maintains proper stack trace for where our error was thrown
    // (only available on V8)
    // https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/error
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
    this.name = 'ApiError';
  }
}

export const fetchJson = async (url: string, options?: RequestInit): Promise<any> => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new ApiError(url, response.status);
  }

  return await response.json();
}