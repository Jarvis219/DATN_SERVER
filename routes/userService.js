import express from 'express';
import {
  listUserService,
  userServiceId,
  readUserService,
  removeUserService,
  updateUserService,
  createUserService,
  searchUserService,
} from '../controllers/userServiceControllers';

const router = express.Router();

router.get('/list/user/service', listUserService);
router.get('/read/user/service/:id', readUserService);
router.post('/create/user/service', createUserService);
router.put('/update/user/service/:id', updateUserService);
router.delete('/remove/user/service/:id', removeUserService);

router.param('id', userServiceId);

module.exports = router;
