import { Request, response, Response } from 'express';
import MovieAccess from '../data_access/movies';
import { StatusCodes } from 'http-status-codes';
import IMovieData from '../contracts/movies/IMovieData';

class MovieLogic {

    test = (req: Request, res: Response) => {
        res.send("IT WORKED!");
    }
    
    getMovieDataByTitle = async (req: Request, res: Response): Promise<void> => {
        try {
            this.ensureMovieTitle(req);

            const movieData = await MovieAccess.getMoviesByTitle(req.params.movieTitle);
            
            res.send(movieData.movie_results);
        } catch(error: any) {
            if (error?.message?.includes('Movie Title Cannot Be Empty.')) {
                res.status(StatusCodes.BAD_REQUEST).send(error.message);
            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
            }
        }
    }

    getMovieDataById = async (req: Request, res: Response): Promise<void> => {
        try {
            this.ensureMovieId(req);

            const movieDetails = await MovieAccess.getMovieDetailsById(req.params.id);
            const movieImages = await MovieAccess.getMovieImagesById(req.params.id);
            
            const movieData = {
                ...movieDetails,
                ...movieImages,
            } as any;
            
            delete movieData.IMDB;
            delete movieData.status;
            delete movieData.status_message;

            res.send(movieData as IMovieData);
        } catch(error: any) {
            if (error?.message?.includes('IMBD Id Cannot Be Empty.')) {
                res.status(StatusCodes.BAD_REQUEST).send(error.message);
            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
            }
        }
    }

    ensureMovieTitle = (req: Request) => {
        if ((req?.params?.movieTitle ?? '').length <= 0)
            throw new Error("Movie Title Cannot Be Empty.");
    }

    ensureMovieId = (req: Request) => {
        if ((req?.params?.id ?? '').length <= 0)
            throw new Error("IMBD Id Cannot Be Empty.");
    }
}

export default new MovieLogic();