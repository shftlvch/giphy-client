import { API_URL, API_KEY } from "@/constants"

type ApiResponse<T> = {
  data: T
  pagination?: ApiResponsePagination
  meta: ApiResponseMeta
}

type ApiResponsePagination = {
  offset: number
  total_count: number
  count: number
}

type ApiResponseMeta = {
  status: number
  message: string
  response_id: string
}

type FetchKey = {
  endpoint: string
  args?: Record<string, undefined | string | number | boolean>
}

export const defaultOptions: RequestInit = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
}

export class ApiError extends Error {
  code: number
  props?: { endpoint: string; key: FetchKey }

  toString(): string {
    return `Api error [${this.code}]: ${this.message} \nDetails: ${
      this.props ? JSON.stringify(this.props) : "unknown"
    }`
  }

  constructor(
    code: number,
    msg: string,
    props?: { endpoint: string; key: FetchKey }
  ) {
    super(msg)
    this.code = code
    this.props = props

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}

const buildUrl = (key: FetchKey, rootUrl?: string) => {
  const url = new URL(key.endpoint, rootUrl || API_URL)

  /** add api key */
  url.searchParams.append("api_key", API_KEY)

  /** add the rest */
  if (key.args) {
    const args = key.args
    for (const [name, value] of Object.entries(args)) {
      switch (typeof value) {
        case "undefined":
          break
        case "string":
          url.searchParams.append(name, value)
          break
        case "number":
          url.searchParams.append(name, value.toString())
          break
        case "boolean":
          url.searchParams.append(name, value ? "true" : "false")
          break
        default:
          throw new Error(`Unsupported parameter type in the Url (${name}).`)
      }
    }
  }

  return url.toString()
}

const fetcher = async <T>(key: FetchKey, rootUrl?: string): Promise<T> => {
  const endpoint = buildUrl(key, rootUrl)
  const response = await fetch(endpoint, defaultOptions)
  const json: ApiResponse<T> = await response.json()

  if (!response.ok) {
    if (json.meta) {
      const { message, status } = json.meta
      throw new ApiError(status, message, { endpoint, key })
    }
    throw new ApiError(
      response.status,
      "An error occurred while fetching the data.",
      { endpoint, key }
    )
  }

  return json.data
}

export default fetcher
