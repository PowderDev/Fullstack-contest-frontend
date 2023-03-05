import { useMemo, useState } from "react"

export function useExpandText(initText: string | null | undefined, maxLength = 150) {
  const provenText = initText ?? ""
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => setIsExpanded((prev) => !prev)

  const text = useMemo(() => {
    return isExpanded ? provenText : provenText.slice(0, maxLength)
  }, [isExpanded, maxLength, provenText])

  const isTextGreater = provenText.length > maxLength
  const showEllipse = isTextGreater && !isExpanded

  return {
    text,
    showEllipse,
    isExpanded,
    toggleExpanded,
    isTextGreater,
  }
}
