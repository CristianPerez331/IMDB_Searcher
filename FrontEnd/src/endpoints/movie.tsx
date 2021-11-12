import IMovieSearchResult from "../interfaces/IMovieSearchResult";
import axios from 'axios';
import IMovieDetails from "../interfaces/IMovieDetails";

export const searchMovieTitle = async (movieTitle: string): Promise<IMovieSearchResult[] | null> => {
    return axios.get(`http://localhost:8001/api/v1/movies/${movieTitle}/search`)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        throw new Error(error?.response?.data ?? error?.message ?? 'Unknown Error');
    });
}

export const getMovieDetailsById = async (imdbId: string): Promise<IMovieDetails | null> => {
    return axios.get(`http://localhost:8001/api/v1/movies/${imdbId}`)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        throw new Error(error?.response?.data ?? error?.message ?? 'Unknown Error');
    });
}
