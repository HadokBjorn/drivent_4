import Joi from 'joi';
import { InputRoomIdBody } from '@/protocols';

export const bookingSchema = Joi.object<InputRoomIdBody>({
  roomId: Joi.number().required(),
});
