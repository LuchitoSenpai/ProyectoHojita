import { buildPDF } from '../libs/pdfkit.js';
import Data from '../models/data.model.js'
import Graph from '../models/graph.model.js'

export const saveData = async (message) => {
    try {
        const data = new Data({
            light: message.light,
            humidity: message.humidity,
            temperature: message.temperature,
        });

        const savedData = await data.save();
        console.log('Data saved successfully:', savedData);
    } catch (error) {
        console.error('Error saving data:', error);
    }
};

export const saveGraphs = async (req, res) => {
    const images = req.body; // Obtén los datos desde el cuerpo de la solicitud
  
    console.log('Images received:', images);
  
    try {
      // Crear una nueva instancia del modelo Graph
      const graph = new Graph({
        light: images.light,
        humidity: images.humidity,
        temperature: images.temperature,
      });
  
      // Guardar la instancia en la base de datos
      const savedGraph = await graph.save();
      console.log('Graphs saved successfully:', savedGraph);
      
      // Envía una respuesta de éxito
      res.status(201).json({ message: 'Graphs saved successfully', savedGraph });
    } catch (error) {
      console.error('Error saving graphs:', error);
      res.status(500).json({ message: 'Error saving graphs', error });
    }
  };

export const getGaugeData = async (req, res) => {
    try {
        const data = await Data.findOne().sort({ createdAt: -1 });
        res.json(data);
        console.log(data);
    } catch (error) {
        res.status(500).json({message: 'Error getting data: '})
    }
};

export const getPlotData = async (req, res)=> {
    try {
        const data = await Data.find().sort({ createdAt: -1 }).limit(10); // Ordena por la fecha y limita a 10 resultados
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error getting data: ' });
    }
}

export const getPdf = async (req, res) => {
    // Configuración de los encabezados para la respuesta PDF
    res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=Reporte_EcoNexus.pdf", // Asegúrate de corregir "attachmet" a "attachment"
    });

    // Función para construir el PDF
    buildPDF(
        (chunk) => res.write(chunk), // Escribe los datos a medida que se generan
        () => res.end() // Finaliza la respuesta cuando el PDF se ha generado completamente
    );
}

export const getReportData = async (req, res) => {
    try {
      const { startDate, endDate } = req.body; // Obtener las fechas del cuerpo de la solicitud
  
      // Verificar que las fechas estén presentes
      if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Start date and end date are required.' });
      }

    console.log("Received startDate:", startDate);
    console.log("Received endDate:", endDate);
  
      // Filtrar los datos según el rango de fechas
      const data = await Data.find({
        createdAt: { 
          $gte: new Date(startDate), 
          $lte: new Date(endDate) 
        }
      }).sort({ createdAt: -1 });
  
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Error getting data: ' + error.message });
    }
  };

export const getGraph = async (req, res) => {
    try {
        const graphs = await Graph.find().sort({ createdAt: -1 }).limit(1); // Obtén las últimas gráficas guardadas
        res.json(graphs);
      } catch (error) {
        console.error('Error retrieving graphs:', error);
        res.status(500).send('Server Error');
      }
  };

export const clearGraphs = async (req, res) => {
    try {
        // Elimina todos los documentos en la colección 'graphs'
        await Graph.deleteMany({});
        res.status(200).json({ message: 'Colección vaciada con éxito.' });
      } catch (error) {
        console.error('Error al vaciar la colección:', error);
        res.status(500).json({ error: 'Ocurrió un error al vaciar la colección.' });
      }
};