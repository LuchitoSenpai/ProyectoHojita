import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import axios from '../api/axios'; // Asegúrate de importar tu archivo axios.js

function PlotTemperature() {
    const [data, setData] = useState({
        xAxisData: [],
        seriesData: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/plotdata');
                const dataFromServer = response.data;

                // Asegúrate de que dataFromServer es un array
                if (Array.isArray(dataFromServer)) {
                    const xAxisData = dataFromServer.map(item => {
                        const date = new Date(item.createdAt);
                        return `${date.getHours()}:${date.getMinutes() + 1}`;
                    });
                    const seriesData = dataFromServer.map(item => item.temperature);

                    setData({ xAxisData, seriesData });
                } else {
                    console.error('Invalid data format');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Fetch data on mount
        const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds

        return () => clearInterval(interval); // Clean up interval on unmount
    }, []);

    const option = {
        xAxis: {
            type: 'category',
            data: data.xAxisData,
            inverse: true // Invertir el eje X para que los datos más nuevos aparezcan a la derecha
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: data.seriesData,
                type: 'line'
            }
        ]
    };

    return (
        <ReactECharts option={option} className='bg-white m-5 my-7 rounded-md' />
    );
}

export default PlotTemperature;