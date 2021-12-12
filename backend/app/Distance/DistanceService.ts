import DistanceServiceInterface from 'App/Distance/Contract'
import EuclideanDistance from 'App/Distance/Euclidean/EuclideanDistance'

export default class DistanceService implements DistanceServiceInterface {
  private strategy = new EuclideanDistance()
  async distance(a: string, b: string): Promise<number> {
    if (a === b) return 0
    return this.strategy.distance(a, b)
  }
}
