import DistanceServiceInterface from 'App/Distance/Contract'
import MetricVectorsDistance from 'App/Distance/Euclidean/MetricVectorsDistance'

export default class DistanceService implements DistanceServiceInterface {
  private strategy = new MetricVectorsDistance()
  async distance(a: string, b: string): Promise<number> {
    if (a === b) return 0
    return this.strategy.distance(a, b)
  }
}
