import axios from 'axios';
import ITVShowDetails from "../interfaces/ITVShowDetails";

export const getTVShowDetailsById = async (imbdId: string): Promise<ITVShowDetails | null> => {
    return axios.get(`http://localhost:8001/api/v1/tvshows/${imbdId}`)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        throw new Error(error?.response?.data ?? error?.message ?? 'Unknown Error');
    });
}
