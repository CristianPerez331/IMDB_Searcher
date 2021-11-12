import axios, { Method } from 'axios';

class RapidApi {

    callEndpoint = async <Type>(params: any): Promise<Type> => {  
        const options = {
            method: 'GET' as Method,
            url: 'https://movies-tvshows-data-imdb.p.rapidapi.com/',
            params: { ...params },
            headers: {
              'x-rapidapi-host': process.env.APIHOST || '',
              'x-rapidapi-key': process.env.APIKEY || ''
            }
          };
          
        return await axios.request(options).then(function (response) {
            if (response.data.status !== "OK") throw new Error(`API Error. ${response.data.status_message}`);
            return response.data;
        }).catch((error) => {
            console.log(error.message);
            throw error;
        });
    }

}

export default new RapidApi();