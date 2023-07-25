import { notFoundError } from '@/errors';
import { forbiddenError } from '@/errors/forbidden-error';
import bookingRepository from '@/repositories/bookings-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelRepository from '@/repositories/hotel-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getBooking(userId: number) {
  const booking = await bookingRepository.getBooking(userId);
  if (!booking) throw notFoundError();
  return booking;
}

async function createBooking(userId: number, roomId: number) {
  const existEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!existEnrollment) throw forbiddenError();
  const existTicket = await ticketsRepository.findTicketByEnrollmentId(existEnrollment.id);
  if (
    !existTicket ||
    existTicket.status === 'RESERVED' ||
    existTicket.TicketType.isRemote === true ||
    existTicket.TicketType.includesHotel === false
  )
    throw forbiddenError();

  const existRoom = await hotelRepository.findRoomById(roomId);
  if (!existRoom) throw notFoundError();

  if (existRoom._count.Booking >= existRoom.capacity) throw forbiddenError();

  const booking = await bookingRepository.createBooking(userId, roomId);
  const response = { bookingId: booking.id };

  return response;
}

const bookingService = {
  getBooking,
  createBooking,
};

export default bookingService;
