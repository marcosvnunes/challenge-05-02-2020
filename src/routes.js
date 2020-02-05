import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import FullnameController from './app/controllers/FullnameController';
import CPFController from './app/controllers/CPFController';
import BirthdayController from './app/controllers/BirthdayController';
import PhoneNumberController from './app/controllers/PhoneNumberController';
import AddressController from './app/controllers/AddressController';
import AmountRequested from './app/controllers/AmountRequested';

import authMiddleware from './app/middlewares/auth';
import responseStepsUser from './app/middlewares/resposeStepsUser';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.get('/users', UserController.index);
routes.put('/users', UserController.update);

routes.post('/request/cpf', responseStepsUser, CPFController.store);
routes.post('/request/fullName', responseStepsUser, FullnameController.store);
routes.post('/request/birthday', responseStepsUser, BirthdayController.store);
routes.post(
  '/request/phoneNumber',
  responseStepsUser,
  PhoneNumberController.store
);
routes.post('/request/address', responseStepsUser, AddressController.store);
routes.post(
  '/request/amountRequested',
  responseStepsUser,
  AmountRequested.store
);

export default routes;
