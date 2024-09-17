import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -26.3120059,
      longitude: -48.8505344,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -26.2081706,
      longitude: -48.7830206,
    })

    const { gyms } = await sut.execute({
      userLatitude: -26.3120059,
      userLongitude: -48.8505344,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
