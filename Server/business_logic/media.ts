import { Request, response, Response } from 'express';
import MovieAccess from '../data_access/movies';
import TVShowAccess from '../data_access/tvshows';
import { StatusCodes } from 'http-status-codes';
import IMediaShowTitleData from '../contracts/media/IMediaShowTitleData';

class MediaLogic {
  
    getMediaDataByTitle = async (req: Request, res: Response): Promise<void> => {
        try {
            this.ensureTitle(req);
            const movieData = await MovieAccess.getMoviesByTitle(req.params.title);
            const tvShowData = await TVShowAccess.getTVShowsByTitle(req.params.title);

            const mediaData = [
                ...(movieData.movie_results ?? []).map((movieResult) => ({ ...movieResult, type: 'Movie' })),
                ...(tvShowData.tv_results ?? []).map((tvResult) => ({
                    imdb_id: tvResult.imdb_id,
                    year: new Date(tvResult.release_date).getFullYear(),
                    title: tvResult.title,
                    type: 'TV Show'
                })),
            ] as IMediaShowTitleData[];

            res.send(mediaData);
        } catch(error: any) {
            if (error?.message?.includes('Movie/TV Show Title Cannot Be Empty.')) {
                res.status(StatusCodes.BAD_REQUEST).send(error.message);
            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
            }
        }
    }


    ensureTitle = (req: Request) => {
        if ((req?.params?.title ?? '').length <= 0)
            throw new Error("Movie/TV Show Title Cannot Be Empty.");
    }

}

export default new MediaLogic();