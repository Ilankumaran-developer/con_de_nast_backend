const _ = require('lodash'),
enums = require('./../common/enum'),
Base = require('./base');

class NewsDataAccessor extends Base{
    constructor(dependencies){
        super(dependencies)
        this.dependencies = dependencies;
        this.APIkey = dependencies.config.APIkey;
        this.url = dependencies.config.APIurl;
      
    }

    async getHeadLines(){
        const me = this;
        try{
            let options = {}, key = `${enums.ENDPOINTS.HEADLINES}_${me.dependencies.config.country}`;
            let cacheData = await me.isCached(key);
            if(!_.isEmpty(cacheData)){
                me.log('info',  'Cache Found')
                return cacheData;
            }
          
            me.log('info', 'Cache not found and so hitting API');
            options.uri = `${me.url}${enums.ENDPOINTS.HEADLINES}?country=${me.dependencies.config.country}&apiKey=${me.APIkey}`;
            options.headers = {};
            options.method = 'GET';
            options.time = true;
            let result = await me.get(options);
            me.log('info', 'Setting Data into Cache');
            await me.setCache(key, result)
            return result;
        }catch(e){
            console.log(e)
            throw e;
        }
    }



    async searchHeadLines(query){
        const me = this;
        try{
            let options = {}, key = `${enums.ENDPOINTS.HEADLINES}_${me.dependencies.config.country}_${query.q}`;
            let cacheData = await me.isCached(key);
            if(!_.isEmpty(cacheData))
                return cacheData;
            me.log('info',  'Cache not found and so hitting API');
            options.uri = `${me.url}${enums.ENDPOINTS.HEADLINES}?q=${query.q}&country=${me.dependencies.config.country}&apiKey=${me.APIkey}`;
            options.headers = {};
            options.method = 'GET';
            options.time = true;
            let result = await me.get(options);
            await me.setCache(key, result);
            me.log('info', 'Setting Data into Cache');
            return result;
        }catch(e){
            console.log(e)
            throw e;
        }
    }
}


module.exports = NewsDataAccessor