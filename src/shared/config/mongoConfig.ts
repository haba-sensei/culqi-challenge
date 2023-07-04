import mongoose from 'mongoose';
import { mongoURI } from '../../global/data';

export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Conexión exitosa a MongoDB");
        return true;
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        return false;
    }
};
