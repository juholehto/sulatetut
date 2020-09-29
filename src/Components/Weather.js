import React, { useState } from 'react'
import { VictoryChart, VictoryLine, VictoryBar } from 'victory'

function Weather() {

    function convertUTCDateToLocalDate(date) {
        new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

        return date;
    }

    // hakee päivämäärän
    const today = new Date();
    // rakentaa päivämäärän muotoon - päivä-kuukausi-vuosi
    const date = today.getDate() + "." + parseInt(today.getMonth() + 1) + "." + today.getFullYear();
    // asetetaan säätietojen tila 
    const initWeather = [];
    const [weather, setWeather] = useState(initWeather);


    // hakee palvelimelta json muotoista dataa
    fetch('https://funcvariaiot.azurewebsites.net/api/HttpTriggerGetIotData?code=qO5qkShg0osHqY0BB2nfXI/anPgQ/K/3mIF7VTCFfaTdrvo6wl6DKw==&amount=50')
        .then(response => response.json())
        .then(json => setWeather([...json]));

    let humtempkey = 1;
    let chartTempData = [];
    let chartHumData = [];
    const rows = () => weather.slice(0, 24).reverse().map(temphum => {
        const fixedTime = String(convertUTCDateToLocalDate(new Date(temphum.PublishedAt)));
        // loop joka saa tiedot yllä olevasta netti osoitteesta ja muokkaa niistä charteista tarvittavat tiedot
        const measurementDate = temphum.PublishedAt.split('T')[0].split('-')[2] + '.' + temphum.PublishedAt.split('T')[0].split('-')[1] + temphum.PublishedAt.split('T')[0].split('-')[0]
        const time = fixedTime.split(' ')[4].split(':')[0] + ":" + fixedTime.split(' ')[4].split(':')[1];
        chartTempData.push({ experiment: String(time), actual: parseInt(temphum.Temp), label: String(temphum.Temp.split('.')[0] + "°C") });
        // push komennolla lisätään seuraavaan tieto
        chartHumData.push({ paivamaara: String(time), ilmankosteus: parseInt(temphum.Hum), label: String(temphum.Hum.split('.')[0]) + '%' });
        return <div key={humtempkey++}><b>Pvm: </b>{measurementDate}, <b>klo:</b> {time} -------- <b>Ilmankosteus: </b> {temphum.Hum.split('.')[0]}% -------- <b>Lämpötila:</b> {temphum.Temp.split('.')[0]}°C</div>
    })
    // kosteus taulukko
    const HumData = chartHumData;
    // lämpötila taulukko
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
                {/*kutsutaan rows funktiota*/rows()}

            </div>


            <h3>Lämpötila</h3>


            <VictoryChart
                // Lämpotila elementtien välinen tila
                domainPadding={{ x: 30, y: 10 }}
                // Lämpötila taulukon leveys
                width={1200}
                // Lämpötila palkkien korkeus
                height={250}>
                <VictoryLine
                    data={TempData}
                    style={{
                        data:
                            { stroke: "green", strokeWidth: 2 }, // viiva on vihreä
                        labels: { fontSize: 10 }
                    }}
                    x="experiment"
                    y="actual"
                />


            </VictoryChart>
            <div align="center">

                <h3>Ilmankosteus</h3>

                <VictoryChart
                    // lmankosteus elementtien välinen tila
                    domainPadding={{ x: 30, y: 10 }}
                    // Ilmankosteus taulukon leveys
                    width={1500}
                    // Ilmankosteus palkkien korkeus
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