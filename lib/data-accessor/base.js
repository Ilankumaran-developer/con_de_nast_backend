const _ = require('lodash'),
    Request = require('request'),
    winston = require('winston'),
    asyncRedis = require('async-redis');


class Base {
    constructor(dependencies) {
        this.dependencies = dependencies;
        this.redisClient = null;
        this.logger = null;
        if (this.dependencies.config.use_redis)
            this.connectRedis()
        if (this.dependencies.config.use_logger)
            this.createLogger()
    }

    get(options) {
        this.log('info', 'calling news API')
        return new Promise(function (resolve, reject) {
            return Request(options, function (error, response, body) {

                if (!_.isEmpty(response) || !_.isEmpty(body))
                    resolve(body)
                if (error)
                    reject(error)
            })
        })
    }

    connectRedis() {
        try {
            this.redisClient = asyncRedis.createClient()
        } catch (e) {
            console.log('redis cannot be used in this machine as it is not installed. It is optional to install to witness a good performace')
        }
    }

    createLogger() {
        try {
            this.logger = winston.createLogger({
                level: 'log',
                transports: [
                    new (winston.transports.Console)({ level: 'info' }),
                    new (winston.transports.File)({ filename: 'combined.log' })
                ]
            });
        } catch (e) {
            console.log('silencing error ')
        }
    }

    async isCached(key) {
        let me = this;
        try {
            let res = await me.redisClient.get(key)
            if (res)
                return res;
            else
                return null;
        } catch (e) {
            // console.log(e)
            return null;
        }
    }

    async setCache(key, data) {
        let me = this;
        try {
            await me.redisClient.set(key, data);
            await me.redisClient.expireat(key, parseInt((+new Date)/1000) + 120);
        } catch (e) {
            //console.log(e)
            return null;
        }
    }

    log(scope, message) {
        try {
            let me = this;
            me.logger.log(scope, message);
        } catch (e) {
            console.log(message)
        }
    }
}

module.exports = Base;