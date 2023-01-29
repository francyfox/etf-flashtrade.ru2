require('dotenv').config()
const { merge } = require('webpack-merge')
const CommonConfig = require('./config/webpack.config.common')
const DevConfig = require('./config/webpack.config.dev')
const ProdConfig = require('./config/webpack.config.prod')
const TestConfig = require('./config/webpack.config.test')

module.exports = () => {
    switch (process.env.MODE) {
        case 'prod':
        case 'production':
            return merge(CommonConfig, ProdConfig)
            break;
        case 'test':
        case 'testing':
            return merge(CommonConfig, TestConfig)
            break;
        case 'dev':
        case 'development':
        default:
            return merge(CommonConfig, DevConfig)
    }
}
