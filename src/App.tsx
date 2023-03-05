import FacilitiesByYearChart from "./components/FacilitiesByYearChart"
import FederalSubjectsByBudgetChart from "./components/FederalSubjectsByBugdetChart"
import FederalSubjectsByFacilitiesChart from "./components/FederalSubjectsByFacilitiesChart"
import TopTypesByAmountChart from "./components/TopTypesByAmountChart"
import YandexMap from "./components/YandexMap"

function App() {
  return (
    <main className="main">
      <h1>Визуализация всероссийского реестра объектов спорта</h1>
      <span className="message">Нажмите на пин, чтобы увидеть детали по объекту</span>
      <section className="grid">
        <YandexMap />
        <FacilitiesByYearChart />
        <TopTypesByAmountChart />
        <FederalSubjectsByFacilitiesChart />
        <FederalSubjectsByBudgetChart />
      </section>
    </main>
  )
}

export default App
