import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import axios from '../api/axios'; // Asegúrate de que esta importación esté correctamente configurada

const ChartComponent = ({ data }) => {
  const chartRefs = {
    light: useRef(null),
    humidity: useRef(null),
    temperature: useRef(null),
  };

  useEffect(() => {
    const initializeChart = (chartRef, seriesData, title) => {
      if (chartRef.current && seriesData.length > 0) {
        const chart = echarts.init(chartRef.current);

        const option = {
          xAxis: {
            type: 'category',
            data: seriesData.map(item => item.createdAt),
            axisLabel: {
              formatter: (value) => new Date(value).toLocaleDateString(),
            },
          },
          yAxis: {
            type: 'value',
            name: title,
          },
          series: [
            {
              name: title,
              type: 'line',
              data: seriesData.map(item => item.value),
              smooth: true,
            },
          ],
          legend: {
            data: [title],
          },
        };

        chart.setOption(option);

        return chart;
      }
    };

    // Inicializar los gráficos para cada tipo de dato
    const lightChart = initializeChart(chartRefs.light, data.map(item => ({ createdAt: item.createdAt, value: item.light })), 'Light');
    const humidityChart = initializeChart(chartRefs.humidity, data.map(item => ({ createdAt: item.createdAt, value: item.humidity })), 'Humidity');
    const temperatureChart = initializeChart(chartRefs.temperature, data.map(item => ({ createdAt: item.createdAt, value: item.temperature })), 'Temperature');

    // Función para capturar la imagen del gráfico y enviarla al backend
    const captureAndSendAllImages = async (charts) => {
      try {
        // Captura cada gráfico como imagen en formato base64 con menor resolución
        const lightImage = charts.light.getDataURL({ type: 'png', pixelRatio: 1 }); // Reducido a pixelRatio 1
        const humidityImage = charts.humidity.getDataURL({ type: 'png', pixelRatio: 1 });
        const temperatureImage = charts.temperature.getDataURL({ type: 'png', pixelRatio: 1 });

        // Imprimir los tamaños de las imágenes base64 para depuración
        console.log('Size of light image:', lightImage.length);
        console.log('Size of humidity image:', humidityImage.length);
        console.log('Size of temperature image:', temperatureImage.length);

        // Envía las imágenes al backend en una sola solicitud
        await axios.post('/savegraph', {
          light: lightImage,
          humidity: humidityImage,
          temperature: temperatureImage,
        });

        console.log('Successfully sent all charts.');
      } catch (error) {
        console.error('Error sending charts:', error);
      }
    };

    // Captura y envía las imágenes de los gráficos
    if (lightChart && humidityChart && temperatureChart) {
      captureAndSendAllImages({ light: lightChart, humidity: humidityChart, temperature: temperatureChart });
    }
  }, [data]);

  return (
    <div className="flex flex-row space-x-4">
      <div ref={chartRefs.light} style={{ width: '100%', height: '400px' }}></div>
      <div ref={chartRefs.humidity} style={{ width: '100%', height: '400px' }}></div>
      <div ref={chartRefs.temperature} style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default ChartComponent;
