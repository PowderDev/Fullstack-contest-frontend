import useQuery from "../hooks/useQuery"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { useMemo } from "react"
import { ChartOptions } from "chart.js/dist/types/index"
import ChartDeferred from "chartjs-plugin-deferred"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDeferred
)

const FacilitiesByYearChart = () => {
  const { data } = useQuery<{ year: string; amount: number }[]>("/facilities-per-year")

  const labels = useMemo(() => (data ? data.map((item) => item.year) : []), [data])
  const chartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          data: data ? data!.map((item) => item.amount) : [],
          borderColor: "#a2d2ff",
          backgroundColor: "#bde0fe",
        },
      ],
    }),
    [labels]
  )

  const options: ChartOptions = {
    animation: { duration: 4000 },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Построенные спортивные объекты по годам",
      },
      deferred: {
        delay: 1500,
      },
    },
  }

  return <article>{data && <Line options={options} data={chartData}></Line>}</article>
}

export default FacilitiesByYearChart
