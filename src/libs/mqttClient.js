import mqtt from 'mqtt'

const clientId = 'emqx_nodejs_' + Math.random().toString(16).substring(2, 8);
const username = 'Luis';
const password = 'L1903';
const host = 'mqtts://u991ab1e.ala.us-east-1.emqxsl.com';

const clientMQTT = mqtt.connect(host, {
    clientId,
    username,
    password,
});

export default clientMQTT;
