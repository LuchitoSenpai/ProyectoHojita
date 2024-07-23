import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
    light: {
        type: Number,
        required: true,
        trim: true,
    },
    humidity: {
        type: Number,
        required: true,
        trim: true,
    },
    temperature: {
        type: Number,
        required: true,
    }
},{
    timestamps: true
})

export default mongoose.model('Data', dataSchema);