import { Room } from '@prisma/client';
import bookingRepository from '@/repositories/bookings-repository';
import bookingService from '@/services/bookings-service';

describe('Booking Service test suit', () => {
  it('should return a booking by id', async () => {
    const bookingMock = {
      id: 1,
      Room: {
        id: 2,
        name: 'suit presidencial',
        capacity: 2,
        hotelId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
    jest.spyOn(bookingRepository, 'getBooking').mockImplementationOnce((userId: number): any => {
      userId;
      const room: Room = bookingMock.Room;

      return {
        id: bookingMock.id,
        Room: room,
      };
    });

    const booking = await bookingService.getBooking(5);
    expect(booking).toEqual(bookingMock);
  });

  it('should return status 404 NotFound', async () => {
    jest.spyOn(bookingRepository, 'getBooking').mockImplementationOnce((userId: number): any => {
      userId;
      return undefined;
    });

    const promise = bookingService.getBooking(5);

    expect(promise).rejects.toEqual({ name: 'NotFoundError', message: 'No result for this search!' });
  });
});
