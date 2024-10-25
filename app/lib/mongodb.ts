/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoClient, MongoClientOptions } from 'mongodb';

const uri: string = process.env.MONGODB_URI as string;
const options: MongoClientOptions = {

};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;
console.log('uri', uri);

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // En entorno de desarrollo, reutiliza la conexión existente para evitar múltiples conexiones
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // En entorno de producción, crea una nueva conexión
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
