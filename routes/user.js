import express from 'express';
import {
  listUser,
  userId,
  readUser,
  removeUser,
  updateUser,
  searchUser,
} from '../controllers/userControllers';

const router = express.Router();

router.get('/search-user', searchUser);
router.get('/list-user', listUser);
router.get('/read-user/:id', readUser);
router.put('/update-user/:id', updateUser);
router.delete('/remove-user/:id', removeUser);

router.param('id', userId);

module.exports = router;
