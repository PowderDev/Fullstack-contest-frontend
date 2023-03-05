import { YMaps, Placemark, Map, Clusterer } from "@pbe/react-yandex-maps"
import { useState } from "react"
import useQuery from "../hooks/useQuery"
import FacilityDetails from "./FacilityDetails"
import "../styles/yandexMap.css"

const YandexMap = () => {
  const { data } = useQuery<{ coord_x: string; coord_y: string; id: number }[]>("/coords")
  const [idToShow, setIdToShow] = useState<number>()

  const defaultState = {
    center: [54.777537, 55.009158],
    zoom: 5,
  }

  return (
    <>
      <article className="mapContainer">
        <YMaps preload>
          <Map className="map" defaultState={defaultState}>
            <Clusterer>
              {data &&
                data.map((placeMark) => (
                  <Placemark
                    key={placeMark.id}
                    geometry={[parseFloat(placeMark.coord_y), parseFloat(placeMark.coord_x)]}
                    onClick={() => setIdToShow(placeMark.id)}
                  />
                ))}
            </Clusterer>
          </Map>
        </YMaps>

        {idToShow && <FacilityDetails id={idToShow} onClose={() => setIdToShow(undefined)} />}
      </article>
    </>
  )
}

export default YandexMap
