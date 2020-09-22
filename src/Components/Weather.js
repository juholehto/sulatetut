import React, { useState } from 'react'
import { VictoryChart, VictoryLine, VictoryBar } from 'victory'

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
        chartTempData.push({ experiment: String(measurementTime), actual: parseInt(temphum.Temp), label: String(temphum.Temp.split('.')[0] + "°C") });
        chartHumData.push({ paivamaara: String(measurementTime), ilmankosteus: parseInt(temphum.Hum), label: String(temphum.Hum.split('.')[0]) + '%' });
        return <div key={humtempkey++}><b>Pvm: </b>{measurementDate}, <b>klo:</b> {measurementTime} -------- <b>Ilmankosteus: </b> {temphum.Hum.split('.')[0]}% -------- <b>Lämpötila:</b> {temphum.Temp.split('.')[0]}°C</div>
    })

    const HumData = chartHumData;

    const TempData = chartTempData;

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
        

            <h3>Lämpötila</h3>


            <VictoryChart
                domainPadding={{ x: 30, y: 10 }}
                width={1200}
                height={250}>
                <VictoryLine
                    data={TempData}
                    style={{
                        data:
                            { stroke: "green", strokeWidth: 2 },
                        labels: { fontSize: 10 }
                    }}
                    x="experiment"
                    y="actual"
                />
                

            </VictoryChart>
            <div align="center">

                <h3>Ilmankosteus</h3>

                <VictoryChart
                    domainPadding={{ x: 30, y: 10 }}
                    width={1500}
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