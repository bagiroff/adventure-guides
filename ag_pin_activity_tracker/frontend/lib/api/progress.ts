import { type ProgressHierarchyResponse } from "@/lib/types/progress";

export type ProgressApiErrorCode = "NETWORK_ERROR" | "AUTH_ERROR" | "SERVER_ERROR" | "UNKNOWN_ERROR";

export class ProgressApiError extends Error {
  code: ProgressApiErrorCode;
  status?: number;

  constructor(message: string, code: ProgressApiErrorCode, status?: number) {
    super(message);
    this.name = "ProgressApiError";
    this.code = code;
    this.status = status;
  }
}

type FetchProgressHierarchyOptions = {
  baseUrl?: string;
  signal?: AbortSignal;
};

function normalizeBaseUrl(baseUrl?: string): string {
  const value = baseUrl ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function getErrorMessageFromBody(body: unknown, fallback: string): string {
  if (body && typeof body === "object" && "message" in body && typeof body.message === "string") {
    return body.message;
  }

  return fallback;
}

function parseProgressHierarchyResponse(data: unknown): ProgressHierarchyResponse {
  if (!data || typeof data !== "object") {
    throw new ProgressApiError("Invalid progress API response payload.", "UNKNOWN_ERROR");
  }

  if (!("sections" in data) || !Array.isArray(data.sections)) {
    throw new ProgressApiError("Progress response is missing a valid sections array.", "UNKNOWN_ERROR");
  }

  return data as ProgressHierarchyResponse;
}

export async function fetchProgressHierarchy(
  options: FetchProgressHierarchyOptions = {},
): Promise<ProgressHierarchyResponse> {
  const baseUrl = normalizeBaseUrl(options.baseUrl);
  const endpoint = `${baseUrl}/api/progress`;

  let response: Response;

  try {
    response = await fetch(endpoint, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
      signal: options.signal,
    });
  } catch {
    throw new ProgressApiError(
      "Unable to reach progress API. Please check your network connection and try again.",
      "NETWORK_ERROR",
    );
  }

  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new ProgressApiError(
        getErrorMessageFromBody(body, "You are not authorized to access tracker progress."),
        "AUTH_ERROR",
        response.status,
      );
    }

    throw new ProgressApiError(
      getErrorMessageFromBody(body, "Progress API request failed."),
      "SERVER_ERROR",
      response.status,
    );
  }

  return parseProgressHierarchyResponse(body);
}
