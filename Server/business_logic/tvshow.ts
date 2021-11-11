import { Request, response, Response } from 'express';
import TVShowAccess from '../data_access/tvshows';
import { StatusCodes } from 'http-status-codes';
import ITVShowData from '../contracts/tvshows/ITVShowData';

class TVShowLogic {
    
    getTVShowDataByTitle = async (req: Request, res: Response): Promise<void> => {
        try {
            this.ensureTVShowTitle(req);

            const movieData = await TVShowAccess.getTVShowsByTitle(req.params.tvShowTitle);
            
            res.send(movieData.tv_results);
        } catch(error: any) {
            if (error?.message?.includes('TV Show Title Cannot Be Empty.')) {
                res.status(StatusCodes.BAD_REQUEST).send(error.message);
            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
            }
        }
    }

    getTVShowDataById = async (req: Request, res: Response): Promise<void> => {
        try {
            this.ensureTVShowId(req);

            const movieDetails = await TVShowAccess.getTVShowDetailsById(req.params.id);
            const movieImages = await TVShowAccess.getTVShowImagesById(req.params.id);
            
            const tvShowData = {
                ...movieDetails,
                ...movieImages,
            } as any;
            
            delete tvShowData.IMDB;
            delete tvShowData.status;
            delete tvShowData.status_message;

            res.send(tvShowData as ITVShowData);
        } catch(error: any) {
            if (error?.message?.includes('IMBD Id Cannot Be Empty.')) {
                res.status(StatusCodes.BAD_REQUEST).send(error.message);
            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
            }
        }
    }

    ensureTVShowTitle = (req: Request) => {
        if ((req?.params?.tvShowTitle ?? '').length <= 0)
            throw new Error("TV Show Title Cannot Be Empty.");
    }

    ensureTVShowId = (req: Request) => {
        if ((req?.params?.id ?? '').length <= 0)
            throw new Error("IMBD Id Cannot Be Empty.");
    }
}

export default new TVShowLogic();