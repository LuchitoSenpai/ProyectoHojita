import mongoose from 'mongoose';

const graphSchema = new mongoose.Schema({
  light: {
    type: String, // base64 string
    required: true,
  },
  humidity: {
    type: String, // base64 string
    required: true,
  },
  temperature: {
    type: String, // base64 string
    required: true,
  }
},{
    timestamps: true
});

export default mongoose.model('Graph', graphSchema);
