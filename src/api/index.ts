import { handleError } from "./error";

const BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

type RequestOptions = {
  headers?: Record<string, string>;
  token?: string;
};

type ApiError = {
  error: string;
};

async function request<T>(
  endpoint: string,
  method: string,
  body?: unknown,
  options: RequestOptions = {},
): Promise<T> {
  const { headers = {} } = options;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(API_KEY && { Authorization: `Bearer ${API_KEY}` }),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let data: T | ApiError | null = null;

  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const err = data as ApiError | null;
    const message = err?.error || `HTTP error ${res.status}`;

    handleError(new Error(message));
    throw new Error(err?.error || `HTTP error ${res.status}`);
  }

  return data as T;
}

export async function get<T>(
  endpoint: string,
  params?: Record<string, string | number>,
  options?: RequestOptions,
): Promise<T> {
  const searchParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
  }

  const query = searchParams.toString();

  return request<T>(
    query ? `${endpoint}?${query}` : endpoint,
    "GET",
    undefined,
    options,
  );
}

export async function post<T>(
  endpoint: string,
  body?: unknown,
  options?: RequestOptions,
): Promise<T> {
  return request<T>(endpoint, "POST", body, options);
}

export async function patch<T>(
  endpoint: string,
  body: unknown,
  options?: RequestOptions,
): Promise<T> {
  return request<T>(endpoint, "PATCH", body, options);
}

export async function del<T>(
  endpoint: string,
  options?: RequestOptions,
): Promise<T> {
  return request<T>(endpoint, "DELETE", undefined, options);
}
