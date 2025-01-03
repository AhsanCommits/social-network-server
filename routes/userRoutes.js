import express from 'express';
import { getUser, updateUser } from '../controllers/userController.js';

import userAuth from '../middleware/authMiddleware.js';
import { friendRequest, getFriendRequest, acceptRequest, profileViews, suggestedFriends } from '../controllers/userController.js';

const router = express.Router();

router.post("/get-user/:id?", userAuth, getUser);
router.put("/update-user", userAuth, updateUser);

router.post("/friend-request", userAuth, friendRequest);
router.post("/get-friend-request", userAuth, getFriendRequest);

router.post("/accept-request", userAuth, acceptRequest);

router.post("/profile-view", userAuth, profileViews);

router.post("/suggested-friends", userAuth, suggestedFriends);

export default router;