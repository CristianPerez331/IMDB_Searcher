import { Router } from 'express';
import TVShowLogic from '../business_logic/tvshow';

const router = Router();

router.get('/:tvShowTitle?/search', TVShowLogic.getTVShowDataByTitle);
router.get('/:id?', TVShowLogic.getTVShowDataById);


export default router;