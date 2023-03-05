import useQuery from "../hooks/useQuery"
import { Chart as ChartJS, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"
import { useMemo } from "react"
import { BarElement, CategoryScale, ChartOptions, LinearScale } from "chart.js"
import ChartDeferred from "chartjs-plugin-deferred"

ChartJS.register(Title, Tooltip, Legend, ChartDeferred, CategoryScale, LinearScale, BarElement)

const FederalSubjectsByBudgetChart = () => {
  const { data } = useQuery<{ federalSubject: string; budget: string }[]>("/subjects-by-budget")

  const labels = useMemo(() => (data ? data.map((item) => item.federalSubject) : []), [data])
  const chartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          data: data ? data!.map((item) => parseInt(item.budget)) : [],
          backgroundColor: "#ffbe0b",
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
        text: "Бюджет на спортивные объекты по федеральным субьектам",
      },
      deferred: {
        delay: 1500,
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => {
            value = value.toString()

            if (value.length > 10) {
              return value.slice(0, 2) + " млрд."
            } else if (value.length == 10) {
              return value[0] + " млрд."
            } else {
              return value
            }
          },
        },
      },
    },
  }

  return <article>{data && <Bar options={options} data={chartData}></Bar>}</article>
}

export default FederalSubjectsByBudgetChart
