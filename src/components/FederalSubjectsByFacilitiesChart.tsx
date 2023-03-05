import useQuery from "../hooks/useQuery"
import { Chart as ChartJS, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"
import { useMemo } from "react"
import { BarElement, CategoryScale, ChartOptions, LinearScale } from "chart.js"
import ChartDeferred from "chartjs-plugin-deferred"

ChartJS.register(Title, Tooltip, Legend, ChartDeferred, CategoryScale, LinearScale, BarElement)

const FederalSubjectsByFacilitiesChart = () => {
  const { data } = useQuery<{ federalSubject: string; amount: number }[]>("/subjects-by-facilities")

  const labels = useMemo(() => (data ? data.map((item) => item.federalSubject) : []), [data])
  const chartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          data: data ? data!.map((item) => item.amount) : [],
          backgroundColor: "#ABC270",
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
        text: "Построенные спортивные объекты по федеральным субьектам",
      },
      deferred: {
        delay: 1500,
      },
    },
  }

  return <article>{data && <Bar options={options} data={chartData}></Bar>}</article>
}

export default FederalSubjectsByFacilitiesChart
