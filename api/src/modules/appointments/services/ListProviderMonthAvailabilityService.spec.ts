// import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'p1',
      user_id: '1',
      date: new Date(2020, 6, 12, 8, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'p1',
      user_id: '1',
      date: new Date(2020, 6, 12, 9, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'p1',
      user_id: '1',
      date: new Date(2020, 6, 12, 10, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'p1',
      user_id: '1',
      date: new Date(2020, 6, 12, 11, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'p1',
      user_id: '1',
      date: new Date(2020, 6, 12, 12, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'p1',
      user_id: '1',
      date: new Date(2020, 6, 12, 13, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'p1',
      user_id: '1',
      date: new Date(2020, 6, 12, 14, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'p1',
      user_id: '1',
      date: new Date(2020, 6, 12, 15, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'p1',
      user_id: '1',
      date: new Date(2020, 6, 12, 16, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'p1',
      user_id: '1',
      date: new Date(2020, 6, 12, 17, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'p1',
      user_id: '1',
      date: new Date(2020, 6, 13, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'p1',
      month: 7,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 11, available: true },
        { day: 12, available: false },
        { day: 13, available: true },
        { day: 14, available: true },
      ]),
    );
  });
});
