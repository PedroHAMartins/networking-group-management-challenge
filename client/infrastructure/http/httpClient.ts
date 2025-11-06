export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface HttpRequest {
  method?: HttpMethod;
  path: string;
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean>;
  body?: unknown;
}

export interface HttpResponse<T = unknown> {
  status: number;
  ok: boolean;
  data?: T;
  error?: { message: string };
}

export class HttpClient {
  constructor(private baseUrl: string = "") {}

  private buildUrl(
    path: string,
    query?: Record<string, string | number | boolean>
  ) {
    const url = new URL(path, this.baseUrl || window?.location?.origin || "");
    if (query) {
      Object.entries(query).forEach(([k, v]) =>
        url.searchParams.set(k, String(v))
      );
    }
    return url.toString();
  }

  async request<T = unknown>({
    method = "GET",
    path,
    headers,
    query,
    body,
  }: HttpRequest): Promise<HttpResponse<T>> {
    const url = this.buildUrl(path, query);

    const opts: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(headers || {}),
      },
      body:
        body !== undefined && body !== null ? JSON.stringify(body) : undefined,
    };

    try {
      const res = await fetch(url, opts);
      const text = await res.text();
      let data: unknown = undefined;
      try {
        data = text ? JSON.parse(text) : undefined;
      } catch (e) {
        data = text;
      }

      if (!res.ok) {
        return {
          status: res.status,
          ok: false,
          error: data as { message: string },
        };
      }

      return { status: res.status, ok: true, data: data as T | undefined };
    } catch (err) {
      return { status: 0, ok: false, error: { message: String(err) } };
    }
  }

  get<T = unknown>(
    path: string,
    query?: Record<string, string | number | boolean>,
    headers?: Record<string, string>
  ) {
    return this.request<T>({ method: "GET", path, query, headers });
  }

  post<T = unknown>(
    path: string,
    body?: unknown,
    headers?: Record<string, string>
  ) {
    return this.request<T>({ method: "POST", path, body, headers });
  }

  put<T = unknown>(
    path: string,
    body?: unknown,
    headers?: Record<string, string>
  ) {
    return this.request<T>({ method: "PUT", path, body, headers });
  }

  patch<T = unknown>(
    path: string,
    body?: unknown,
    headers?: Record<string, string>
  ) {
    return this.request<T>({ method: "PATCH", path, body, headers });
  }

  delete<T = unknown>(
    path: string,
    body?: unknown,
    headers?: Record<string, string>
  ) {
    return this.request<T>({ method: "DELETE", path, body, headers });
  }
}
