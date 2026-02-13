import { AppDataSource } from '../data-source';
import { Reservation } from '../entities/Reservation';

const reservationRepository = AppDataSource.getRepository(Reservation);

export const getAllReservations = async (): Promise<Reservation[]> => {
  return await reservationRepository.find({ relations: ["table"] });
};

export const getReservationById = async (id: string): Promise<Reservation | null> => {
  return await reservationRepository.findOne({ where: { id }, relations: ["table"] });
};

export const createReservation = async (reservationData: Partial<Reservation>): Promise<Reservation> => {
  const reservation = reservationRepository.create(reservationData);
  return await reservationRepository.save(reservation);
};

export const updateReservation = async (id: string, reservationData: Partial<Reservation>): Promise<Reservation | null> => {
  const reservation = await reservationRepository.findOneBy({ id });
  if (!reservation) return null;
  reservationRepository.merge(reservation, reservationData);
  return await reservationRepository.save(reservation);
};

export const deleteReservation = async (id: string): Promise<boolean> => {
  const result = await reservationRepository.delete(id);
  return result.affected !== 0;
};
