import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import axios from '../api/axios'; // Asegúrate de importar el archivo axios.js

function GaugeLight() {
    const [gaugeData, setGaugeData] = useState({
        light: 0,
        humidity: 0,
        temperature: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/gaugedata');
                const data = response.data;
                
                // Si la respuesta es un array, usa el último elemento
                if (Array.isArray(data)) {
                    const latestData = data[data.length - 1];
                    setGaugeData(latestData);
                    console.log('Latest data:', latestData); // Verifica el dato más reciente
                } else {
                    // Si recibes un único objeto, usa ese objeto
                    setGaugeData(data);
                    console.log('Latest data:', data); // Verifica el dato más reciente
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 5000); // Actualiza cada 5 segundos

        return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
    }, []);

    const gaugeOptions = {
        series: [
            {
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                center: ['50%', '75%'],
                radius: '90%',
                min: 0,
                max: 4095, // Ajusta el máximo si es necesario
                splitNumber: 8,
                axisLine: {
                    lineStyle: {
                        width: 6,
                        color: [
                            [0.25, '#FF6E76'],
                            [0.5, '#FDDD60'],
                            [0.75, '#58D9F9'],
                            [1, '#7CFFB2']
                        ]
                    }
                },
                pointer: {
                    icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                    length: '12%',
                    width: 20,
                    offsetCenter: [0, '-60%'],
                    itemStyle: {
                        color: 'auto'
                    }
                },
                axisTick: {
                    length: 12,
                    lineStyle: {
                        color: 'auto',
                        width: 2
                    }
                },
                splitLine: {
                    length: 20,
                    lineStyle: {
                        color: 'auto',
                        width: 5
                    }
                },
                axisLabel: {
                    color: '#464646',
                    fontSize: 20,
                    distance: -60,
                    rotate: 'tangential',
                    formatter: function (value) {
                        if (value === 75) {
                            return 'High';
                        } else if (value === 50) {
                            return 'Medium';
                        } else if (value === 25) {
                            return 'Low';
                        }
                        return '';
                    }
                },
                title: {
                    offsetCenter: [0, '-10%'],
                    fontSize: 20
                },
                detail: {
                    fontSize: 30,
                    offsetCenter: [0, '-35%'],
                    valueAnimation: true,
                    formatter: function (value) {
                        return Math.round(value) + '';
                    },
                    color: 'inherit'
                },
                data: [
                    {
                        value: gaugeData.light, // Usa el valor directamente
                        name: 'Light'
                    }
                ]
            }
        ]
    };

    return (
        <>
            {console.log('Gauge component is rendering with:', gaugeData.light)}
            <ReactECharts option={gaugeOptions} />
        </>
    );
}

export default GaugeLight;