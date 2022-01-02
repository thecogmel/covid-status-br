import axios from 'axios';

const api = axios.create({
  baseURL: 'https://covid-19-data.p.rapidapi.com/country/code',
  headers: {
    'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
    'x-rapidapi-key': '7355b5c542msh2c8b0c19ff0eb64p10ad60jsn0d50e622f973',
  },
  params: { code: 'br' },
});

export default api;
