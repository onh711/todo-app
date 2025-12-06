import axios from 'axios';

axios.defaults.baseURL = 'http://localhost';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export default axios;
