import { Router } from 'express';
import MediaLogic from '../business_logic/media';

const router = Router();

router.get('/:title?/search', MediaLogic.getMediaDataByTitle);

export default router;