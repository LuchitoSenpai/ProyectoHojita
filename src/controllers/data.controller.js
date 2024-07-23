import Data from '../models/data.model.js'

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