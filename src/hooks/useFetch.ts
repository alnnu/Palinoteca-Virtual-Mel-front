import { AxiosResponse } from "axios";

export const fetchDataServer = async <T, D = any>(
  func: (params?: D, signal?: AbortSignal) => Promise<AxiosResponse<T>>,
  params?: D
): Promise<T | null> => {
  try {
    const response = await func(params)
    return response.data
  } catch (error) {
    console.error('Server fetch error:', error)
    return null
  }
}

