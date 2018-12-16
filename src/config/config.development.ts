import { ConfigInterface } from './config.interface'

export const developmentConfig: ConfigInterface = {
  ENV: 'development enviroment',
  Parse_APP_ID: 'app.id.debug',
  Parse_Server_Url: 'http://localhost:1337/parse',
  Base_Url: '/'
}
