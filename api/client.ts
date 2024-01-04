import axios from "axios";

const client = axios.create();
console.log(process.env.EXPO_PUBLIC_API_URL);
client.defaults.baseURL = process.env.EXPO_PUBLIC_API_URL;

export default client;