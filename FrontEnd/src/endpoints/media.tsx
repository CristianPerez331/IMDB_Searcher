import axios from 'axios';
import IMediaSearchResult from "../interfaces/IMediaSearchResult";

export const searchTitle = async (title: string): Promise<IMediaSearchResult[] | null> => {
    return axios.get(`http://localhost:8001/api/v1/media/${title}/search`)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        throw new Error(error?.response?.data ?? error?.message ?? 'Unknown Error');
    });
}

