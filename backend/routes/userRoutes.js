import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { getUsersSlidebar } from '../controllers/user.controller.js';

const router = express.Router();

router.get("/", protectRoute,getUsersSlidebar)

export default router