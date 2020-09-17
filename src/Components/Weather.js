import React, { useState } from 'react'
import { VictoryChart, VictoryLine, VictoryBar, VictoryVoronoiContainer } from 'victory'

function Weather() {

   
    const today = new Date();
    const date = today.getDate() + "." + parseInt(today.getMonth() + 1) + "." + today.getFullYear();

    const initWeather = [];
    const [weather, setWeather] = useState(initWeather);



    fetch('https://funcvariaiot.azurewebsites.net/api/HttpTriggerGetIotData?code=qO5qkShg0osHqY0BB2nfXI/anPgQ/K/3mIF7VTCFfaTdrvo6wl6DKw==&amount=50')
        .then(response => response.json())
        .then(json => setWeather([...json]));

        let humtempkey = 1;
        let chartTempData = [];
        let chartHumData = [];
    const rows = () => weather.slice(0, 24).reverse().map(temphum => {
        const measurementDate = temphum.PublishedAt.split('T')[0].split('-')[2] + '.' + temphum.PublishedAt.split('T')[0].split('-')[1] + temphum.PublishedAt.split('T')[0].split('-')[0]
        const measurementTime = temphum.PublishedAt.split('T')[1].split(':')[0] + ':' + temphum.PublishedAt.split('T')[1].split(':')[0]
        chartTempData.push({ experiment: String(measurementTime), actual: parseInt(temphum.Temp) });
        return <div key={humtempkey++}><b>Pvm: </b>{measurementDate}, <b>klo:</b> {measurementTime} -------- <b>Ilmankosteus: </b> {temphum.Hum.split('.')[0]}% -------- <b>Lämpötila:</b> {temphum.Temp.split('.')[0]}°C</div>
    })

    console.log(chartTempData);

    const HumData = [
        { paivamaara: "1.1", ilmankosteus: 50, label: '50 %' },
        { paivamaara: "2.1", ilmankosteus: 65, label: '65 %' },
        { paivamaara: "3.1", ilmankosteus: 60, label: '60 %' },
        { paivamaara: "4.1", ilmankosteus: 70, label: '70 %' }
    ];

  const TempData = chartTempData;
  /* const TempData = [
        { experiment: "1.1.", actual: -10, label: '-10 °C' },
        { experiment: "2.1.", actual: 0, label: '0 °C' },
        { experiment: "3.1.", actual: -5, label: '-5 °C' },
        { experiment: "4.1.", actual: 10, label: '10 °C' },
        { experiment: "5.1.", actual: 5, label: '5 °C' },
        { experiment: "6.1.", actual: 15, label: '15 °C' }
    ];*/

    return (
        <div align="center">
            <div>
                <h3>Piirrettävän chartin data</h3>
            </div>
            <div>
                <b>Tänään on : {date} </b>
            </div>
            <div>
                {rows()}
            </div>
            <div>
                Sensoridata
            </div>

            <h3>Lämpötila</h3>


            <VictoryChart
                domainPadding={{ x: 30, y: 10 }}
                width={1000}
                height={250}>
                <VictoryLine
                    data={TempData}
                    style={{
                        data:
                            { stroke: "green", strokeWidth: 2 }
                    }}
                    x="experiment"
                    y="actual"
                />

            </VictoryChart>
            <div align="center">

                <h3>Ilmankosteus</h3>

                <VictoryChart
                    domainPadding={{ x: 30, y: 10 }}
                    width={700}
                    height={250}>
                    <VictoryBar
                        data={HumData}
                        x="paivamaara"
                        y="ilmankosteus"
                    />
                </VictoryChart>
            </div>
        </div>
    )
}

export default Weather;