import express from 'express';
import { Login } from '../controllers/authControllers';

const router = express.Router();

const login = router.post('/login', Login);

module.exports = router;
