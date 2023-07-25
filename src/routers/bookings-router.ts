import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import bookingController from '@/controllers/bookings-controller';
import { bookingSchema } from '@/schemas/bookings-schemas';

const bookingRouter = Router();
bookingRouter.get('/', authenticateToken, bookingController.getBooking);
bookingRouter.post('/', authenticateToken, validateBody(bookingSchema), bookingController.createBooking);
export default bookingRouter;
