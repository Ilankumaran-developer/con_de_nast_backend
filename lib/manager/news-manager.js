
const _ = require('lodash'),
enums = require('./../common/enum'),
DataAccessor = require('./../data-accessor');

class NewsManager extends DataAccessor{
    constructor(dependencies){
        super(dependencies);
        this.accessor = this.getAccessor(enums.ACCESSORS.NEWS);
    }

    async getHeadLines(){
        const me = this;
        try{
            return await me.accessor.getHeadLines()
        }catch(e){
            throw e;
        }
    }


    async searchHeadLines(query){
        const me = this;
        try{
            return await me.accessor.searchHeadLines(query)
        }catch(e){
            throw e;
        }
    }
}

module.exports = NewsManager;