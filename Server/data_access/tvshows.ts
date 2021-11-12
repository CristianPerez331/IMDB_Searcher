import IGetTVShowsByTitle from '../models/tvshows/IGetTVShowsByTitle';
import IGetTVShowDetailsById from '../models/tvshows/IGetTVShowDetailsById';
import IGetTVShowImagesById from '../models/tvshows/IGetTVShowImagesById';
import RapidAPI from './rapidapi';

class TVShowAccess {

    getTVShowsByTitle = async (movieTitle: string): Promise<IGetTVShowsByTitle> => 
        await RapidAPI.callEndpoint({type: 'get-shows-by-title', title: movieTitle});

    getTVShowDetailsById = async (id: string): Promise<IGetTVShowDetailsById> => 
        await RapidAPI.callEndpoint({type: 'get-show-details', imdb: id});

    getTVShowImagesById = async (id: string): Promise<IGetTVShowImagesById> => 
        await RapidAPI.callEndpoint({type: 'get-show-images-by-imdb', imdb: id });

}

export default new TVShowAccess();