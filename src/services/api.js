
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://selecaoestagio.sndeveloper.me',
});

export default api;