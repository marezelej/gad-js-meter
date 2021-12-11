import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import DistanceService from 'App/Distance/DistanceService'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    this.app.container.singleton('GAD/Distance', () => {
      return new DistanceService()
    })
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
