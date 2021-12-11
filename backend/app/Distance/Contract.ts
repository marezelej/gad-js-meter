export default interface DistanceServiceInterface {
  distance(a: string, b: string): Promise<number>
}
