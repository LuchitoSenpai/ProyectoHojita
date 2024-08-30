import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from '../api/axios';
import ChartComponent from './ChartComponent'; // Asegúrate de la ruta correcta
import html2canvas from 'html2canvas';

const Popup = ({ show, onClose }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [chartData, setChartData] = useState(null);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const chartRef = useRef(null);

  const handleGenerateReport = async () => {
    try {
      const formattedStartDate = startDate.toISOString();
      const formattedEndDate = endDate.toISOString();

      const response = await axios.post('/getrepdata', {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });

      setChartData(response.data);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleGeneratePDF = async () => {
    try {
      // Solicitar el PDF desde el backend
      const response = await axios.get('/getpdf', {
        responseType: 'blob', // Asegúrate de tratar la respuesta como un blob
      });
  
      // Crear un enlace temporal para descargar el archivo PDF
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Reporte_EcoNexus.pdf'); // Nombre del archivo
  
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link); // Limpiar el enlace después de la descarga
  
      // Vaciar la colección de la base de datos
      await axios.delete('/cleargraphs');
      console.log('Colección vaciada');
      setPdfGenerated(true);
  
    } catch (error) {
      console.error('Error generando PDF o vaciando la colección:', error);
    }
  };

  useEffect(() => {
    if (chartData && chartRef.current) {
      html2canvas(chartRef.current).then(canvas => {
        const img = canvas.toDataURL('image/png');
        console.log('Imagen de la gráfica:', img);
      });
    }
  }, [chartData]);

  if (!show) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-7xl relative">
        <button
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
          onClick={onClose}
        >
          X
        </button>
        <h2 className="text-lg font-bold mb-4">Generate Report</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button className="bg-lime-700 text-white py-2 px-4 rounded" onClick={handleGenerateReport}>
          Collect Info
        </button>
        {chartData && <ChartComponent ref={chartRef} data={chartData} />}
        {chartData && !pdfGenerated && (
          <button
            className="bg-blue-700 text-white py-2 px-4 rounded mt-4"
            onClick={handleGeneratePDF}
          >
            Generate PDF and Clear Data
          </button>
        )}
        {pdfGenerated && <p className="mt-4 text-green-500">PDF generated and data cleared.</p>}
      </div>
    </div>,
    document.body
  );
};

export default Popup;
