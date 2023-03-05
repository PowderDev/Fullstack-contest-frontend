import useQuery from "../hooks/useQuery"
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js"
import { Doughnut, Pie } from "react-chartjs-2"
import { useMemo } from "react"
import { ChartOptions } from "chart.js/dist/types/index"
import ChartDeferred from "chartjs-plugin-deferred"

ChartJS.register(Title, Tooltip, Legend, ChartDeferred, ArcElement)

const TopTypesByAmountChart = () => {
  const { data } = useQuery<{ type: string; amount: number }[]>("/top-types")

  const labels = useMemo(() => (data ? data.map((item) => item.type) : []), [data])
  const chartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          data: data ? data!.map((item) => item.amount) : [],
          backgroundColor: [
            "#8EA7E9",
            "#9DC08B",
            "#FDD36A",
            "#B9F3FC",
            "#F6E6C2",
            "#F48484",
            "#86A3B8",
            "#EA8FEA",
            "#F7C8E0",
            "#AEE2FF",
          ],
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
        text: "Самые популярные типы спортивных объектов",
      },
      deferred: {
        delay: 1500,
      },
    },
  }

  return <article>{data && <Pie options={options} data={chartData}></Pie>}</article>
}

export default TopTypesByAmountChart
