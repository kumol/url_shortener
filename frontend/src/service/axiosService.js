import axios from 'axios';
const baseUrl = "localhost:8080/api";

const AxiosService = axios.create({
    baseURL: 'http://localhost:8080/api/',
    timeout: 5000,
    headers: {'X-Custom-Header': 'foobar'}
  });
  
export default AxiosService;