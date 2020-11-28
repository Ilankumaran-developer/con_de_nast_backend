const _ = require('lodash'),
enums = require('./../common/enum'),
NewsService  = require('./../service/news-service');

class RouteHandler{
    constructor(dependencies, app){
        this.app = app;
        this.dependencies = dependencies;
        this.newsService = new NewsService(dependencies);
    }

    

    buildRoutes(){
        let me = this;
        try{
            me.app.get('/getHeadLines', async (req, res)=>{
                await me.newsService.getHeadLinesData(req,res)})
            me.app.get('/searchHeadLines', async (req, res)=>{
                    await me.newsService.searchHeadLinesData(req,res)})
        }catch(e){
            throw e;
        }  
        
    }
}

module.exports = RouteHandler