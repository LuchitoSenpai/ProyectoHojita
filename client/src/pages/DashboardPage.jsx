import React from 'react'
import GaugeLight from '../components/GaugeLight'
import PlotHumidity from '../components/PlotHumidity'
import PlotLight from '../components/PlotLight'
import PlotTemperature from '../components/PlotTemperature'
import DataContainer from '../components/DataContainer'
import GaugeTemperature from '../components/GaugeTemperature'
import GaugeHumidity from '../components/GaugeHumidity'

function DashboardPage() {
  return (
    <div className='flex flex-col md:flex-row'>
      <DataContainer text={"Light"}>
        <GaugeLight/>
        <PlotLight/>
      </DataContainer>
      <DataContainer text={"Humidity"}>
        <GaugeHumidity/>
        <PlotHumidity/>
      </DataContainer>
      <DataContainer text={"Temperature"}>
        <GaugeTemperature/>
        <PlotTemperature/>
      </DataContainer>
      
    </div>
  )
}

export default DashboardPage