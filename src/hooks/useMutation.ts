import { useCallback, useState } from "react"

export default function useMutation<T = unknown>(path: string, method = "POST") {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<T>()
  const [error, setError] = useState<string>()
  const baseUrl = "http://localhost:4000/api"

  const mutate = useCallback(
    (body: any) => {
      fetch(baseUrl + path, {
        method,
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => setError(err.message || "Something went wrong"))
        .finally(() => setIsLoading(false))
    },
    [path]
  )

  return { data, isLoading, error, mutate }
}
