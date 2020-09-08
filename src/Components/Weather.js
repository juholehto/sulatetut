import React from 'react'
import { VictoryChart, VictoryLine, VictoryBar } from 'victory'

function Weather() {

    const data = [
        { paivamaara: "1.1", ilmankosteus: 50, label: '50 %' },
        { paivamaara: "2.1", ilmankosteus: 65, label: '65 %' },
        { paivamaara: "3.1", ilmankosteus: 60, label: '60 %' },
        { paivamaara: "4.1", ilmankosteus: 70, label: '70 %' }
    ];

    return (
        <div align="center">

            <h3>Lämpötila</h3>


            <VictoryChart
                domainPadding={{ x: 30, y: 10 }}
                width={1000}
                height={250}>
                <VictoryLine
                    data={[
                        { experiment: "1.1.", actual: -10, label: '-10 °C' },
                        { experiment: "2.1.", actual: 0, label: '0 °C' },
                        { experiment: "3.1.", actual: -5, label: '-5 °C' },
                        { experiment: "4.1.", actual: 10, label: '10 °C' },
                        { experiment: "5.1.", actual: 5, label: '5 °C' },
                        { experiment: "6.1.", actual: 15, label: '15 °C' }
                    ]}
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
                        data={data}
                        x="paivamaara"
                        y="ilmankosteus"
                    />
                </VictoryChart>
            </div>
        </div>
    )
}

export default Weather;