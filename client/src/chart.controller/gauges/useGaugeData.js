import { useState, useEffect } from 'react';

const useGaugeData = () => {
    const [gaugeData, setGaugeData] = useState({
        light: 0,
        humidity: 0,
        temperature: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/data');
                const data = await response.json();
                setGaugeData(data[data.length - 1]); // Usa el último dato o ajusta según tus necesidades
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 5000); // Actualiza cada 5 segundos

        return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
    }, []);

    return gaugeData;
};

export default useGaugeData;