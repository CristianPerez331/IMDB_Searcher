import { Router } from 'express';
import movieRoutes from './movies';
import tvShowRoutes from './tvshows';
import mediaRoutes from './media';

const router = Router();

router.use('/media', mediaRoutes);
router.use('/movies', movieRoutes);
router.use('/tvshows', tvShowRoutes);


export default router;