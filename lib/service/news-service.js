const _ = require('lodash'),
Helper = require('./../common/helper'),
NewsManager = require('./../manager/news-manager');


class NewsService extends NewsManager{
    constructor(dependencies){
        super(dependencies)
    }

    async getHeadLinesData(req, res){
        try{
            let me = this;
            let result = await me.getHeadLines();
            res.send(result)
        }catch(e){
            res.status(401).end(e.message) 
        }
    }

    async searchHeadLinesData(req, res){
        try{
            let me = this, result;
            if(_.isEmpty(req.query.q))  
                result =  await me.getHeadLinesData()
            else
                result = await me.searchHeadLines(req.query);
            res.send(result)
        }catch(e){
            res.status(401).end(e.message) 
        }
    }

}

module.exports = NewsService;