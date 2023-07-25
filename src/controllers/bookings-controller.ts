import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/bookings-service';

async function getBooking(req: AuthenticatedRequest, res: Response) {
  const booking = await bookingService.getBooking(req.userId);
  res.status(httpStatus.OK).send(booking);
}

const bookingController = {
  getBooking,
};
export default bookingController;
