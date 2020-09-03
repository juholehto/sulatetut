import React from 'react'
import { VictoryChart, VictoryLine, VictoryBar } from 'victory'

function Weather() {

    const data = [
        { quarter: 1, earnings: 13000 },
        { quarter: 2, earnings: 16500 },
        { quarter: 3, earnings: 14250 },
        { quarter: 4, earnings: 19000 }
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
                        { experiment: "1.1.", actual: -10 },
                        { experiment: "2.1.", actual: -5 },
                        { experiment: "3.1.", actual: 0 },
                        { experiment: "4.1.", actual: 5 },
                        { experiment: "5.1.", actual: 10 },
                        { experiment: "6.1.", actual: 15 }
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
                    width={1000}
                    height={250}>
                    <VictoryBar
                        data={data}
                        x="quarter"
                        y="earnings"
                    />
                </VictoryChart>
            </div>
        </div>
    )
}

export default Weather;