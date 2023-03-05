import { useEffect, useState } from "react"

export default function useQuery<T = unknown>(path: string) {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<T>()
  const [error, setError] = useState<string>()
  const baseUrl = "http://localhost:4000/api"

  useEffect(() => {
    fetch(baseUrl + path)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => setError(err.message || "Something went wrong"))
      .finally(() => setIsLoading(false))
  }, [path])

  return { data, isLoading, error }
}
