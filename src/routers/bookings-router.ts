import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import bookingController from '@/controllers/bookings-controller';

const bookingRouter = Router();
bookingRouter.get('/', authenticateToken, bookingController.getBooking);
export default bookingRouter;
