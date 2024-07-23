import { saveData } from '../controllers/data.controller.js';
import clientMQTT from '../libs/mqttClient.js'

const topicData = 'data/sensors'
const qos = 0


const connectMQTT = () => {
clientMQTT.on('connect', () => {
    console.log('Connected to MQTT broker');

    clientMQTT.subscribe(topicData, { qos }, (error) => {
        if (error) {
            console.log('Subscribe error:', error);
            return;
        }
        console.log(`Subscribed to topic '${topicData}'`);
    });
});
};

clientMQTT.on('message', async (topic, payload) => {
    console.log('Received Message:', topic, payload.toString());

    if (topic === topicData) {
        const message = JSON.parse(payload.toString());
        await saveData(message);
        console.log(message);
    } 
});

/*const publishMessage = (topic, message) => {
    clientMQTT.publish(topic, message, { qos }, (error) => {
        if (error) {
            console.error('Publish error:', error);
        }
    });
};*/

export {/* publishMessage,*/ connectMQTT };