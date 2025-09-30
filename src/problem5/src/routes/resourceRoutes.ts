import { Router } from 'express';
import {
  createResource,
  getResources,
  getResourceById,
  updateResource,
  deleteResource
} from '../controllers/resourceController';

const router = Router();

router.post('/', createResource);
router.get('/', getResources);
router.get('/:id', getResourceById);
router.put('/:id', updateResource);
router.delete('/:id', deleteResource);

export default router;
