const NewsDataAccessor = require('./news-data-accessor'),
enums = require('./../common/enum');

class DataAccessor{
    constructor(dependencies){
        this.dependencies = dependencies;
    }

    getAccessor(accessor){
        const me = this;
        try{
            switch(accessor){
                case enums.ACCESSORS.NEWS:
                    return new NewsDataAccessor(me.dependencies)
            }
        }catch(e){
            throw e;
        }
        
    }
}

module.exports = DataAccessor;