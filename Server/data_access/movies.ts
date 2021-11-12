import IGetMoviesByTitle from '../models/movies/IGetMoviesByTitle';
import IGetMovieDetailsById from '../models/movies/IGetMovieDetailsById';
import IGetMovieImagesById from '../models/movies/IGetMovieImagesById';
import RapidAPI from './rapidapi';

class MovieAccess {

    getMoviesByTitle = async (movieTitle: string): Promise<IGetMoviesByTitle> => 
        await RapidAPI.callEndpoint({type: 'get-movies-by-title', title: movieTitle});

    getMovieDetailsById = async (id: string): Promise<IGetMovieDetailsById> => 
        await RapidAPI.callEndpoint({type: 'get-movie-details', imdb: id});

    getMovieImagesById = async (id: string): Promise<IGetMovieImagesById> => 
        await RapidAPI.callEndpoint({type: 'get-movies-images-by-imdb', imdb: id});

}

export default new MovieAccess();