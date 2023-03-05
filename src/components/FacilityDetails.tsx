import { useExpandText } from "../hooks/useExpandText"
import useQuery from "../hooks/useQuery"
import { SportsFacility } from "../lib/types/SportsFacility"
import StartRating from "react-star-ratings"
import "../styles/facilityDetails.css"
import { useEffect, useState } from "react"
import useMutation from "../hooks/useMutation"

type Props = {
  id: number
  onClose: () => any
}

const FacilityDetails = ({ id, onClose }: Props) => {
  const { data } = useQuery<SportsFacility>(`/facility/${id}`)
  const { mutate } = useMutation(`/rating/facility/${id}`)
  const [rating, setRating] = useState(0)

  useEffect(() => {
    if (data?.rating) {
      setRating(Number(data.rating.rating))
    }

    return () => setRating(0)
  }, [data])

  const onRatingSubmit = (rating: number) => {
    setRating(rating)
    mutate({ rating })
  }

  const {
    text: description,
    isExpanded,
    showEllipse,
    toggleExpanded,
    isTextGreater,
  } = useExpandText(data?.briefDescription)

  const budget = Intl.NumberFormat("ru-RU", {
    currency: "RUB",
    style: "currency",
    maximumFractionDigits: 0,
  }).format(data?.budget || 0)

  return (
    <>
      {data && (
        <div className="facility-details">
          <h3 className="details-title">{data.name}</h3>

          <div className="rating-stars">
            <StartRating
              rating={rating}
              changeRating={onRatingSubmit}
              starHoverColor={"#ffe859"}
              starRatedColor={"#ffe859"}
            />
          </div>

          <p className="details-description">{showEllipse ? description + "..." : description}</p>

          {isTextGreater && (
            <p className="details-showMore" onClick={toggleExpanded}>
              {isExpanded ? "скрыть текст" : "показать больше"}
            </p>
          )}

          <div className="details-features">
            <div className="feature">
              <strong>Адрес:</strong> <span>{data.address}</span>
            </div>

            <div className="feature">
              <strong>Бюджет:</strong> <span>{budget}</span>
            </div>

            <div className="feature">
              <strong>Активный:</strong> <span>{data.active === "Y" ? "Да" : "Нет"}</span>
            </div>
          </div>

          <span className="xmark" onClick={onClose}>
            X
          </span>
        </div>
      )}
    </>
  )
}

export default FacilityDetails
