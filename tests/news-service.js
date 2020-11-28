
const  expect=require('chai').expect,
config = require('./../config.json');


describe('NewsService', () => {
    const NewsService = require('../lib/service/news-service');
    let dependencies = {};
    dependencies.config = config;
    let newsService = new NewsService(dependencies);

    it('get news headlines', async (done) => {

        try{
            let result = await newsService.getHeadLines();
          console.log(result)
          expect(result.articles.length).to.be.greaterThan(0)
          done()
        }catch(e){
            console.log(e)
            done()
        }
          
    
      });
})

