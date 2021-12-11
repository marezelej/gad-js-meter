import DistanceServiceInterface from 'App/Distance/Contract'

export default class DistanceService implements DistanceServiceInterface {
  async distance(a: string, b: string): Promise<number> {
    if (a === b) return 0
    return 1
  }
}
