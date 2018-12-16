import { ConfigInterface } from './config.interface'
import { config } from './config'
import { developmentConfig } from './config.development'
import { productionConfig } from './config.production'

function applyChangeConfig (currentConfig: ConfigInterface) {
  for (var key in currentConfig) {
    config[key] = currentConfig[key]
  }
}

if (process && process.env) {
  switch (process.env.NODE_ENV) {
    case 'development':
      applyChangeConfig(developmentConfig)
      break
    case 'production':
      applyChangeConfig(productionConfig)
      break
    default:
      break
  }
}

console.log(config.ENV)

export const appConfig = config

export * from './config.interface'
