import { Router } from 'express';
import MovieLogic from '../business_logic/movies';

const router = Router();

router.get('/test', MovieLogic.test);

router.get('/:movieTitle?/search', MovieLogic.getMovieDataByTitle);
router.get('/:id?', MovieLogic.getMovieDataById);


export default router;