const devConfig = {}

const testConfig = {}

const prodConfig = {}

const defaultConfig = {
  PORT : process.env.PORT || 000
}

function envConfig(env){
  switch(env){
    case 'development':
       return defaultConfig
    case 'test':
       return testConfig
    default:
       return prodConfig
  }
}

module.export = {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV)
}

