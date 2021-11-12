import axios from 'axios';
import ITVShowDetails from "../interfaces/ITVShowDetails";

export const getTVShowDetailsById = async (imdbId: string): Promise<ITVShowDetails | null> => {
    return axios.get(`http://localhost:8001/api/v1/tvshows/${imdbId}`)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        throw new Error(error?.response?.data ?? error?.message ?? 'Unknown Error');
    });
}
