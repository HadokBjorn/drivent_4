import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/bookings-service';

async function getBooking(req: AuthenticatedRequest, res: Response) {
  const booking = await bookingService.getBooking(req.userId);
  res.status(httpStatus.OK).send(booking);
}

async function createBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  const booking = await bookingService.createBooking(userId, roomId);
  res.status(httpStatus.OK).send(booking);
}

const bookingController = {
  getBooking,
  createBooking,
};
export default bookingController;
