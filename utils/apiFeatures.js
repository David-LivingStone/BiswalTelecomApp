class APIFeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    filter(){
        const queryObj = {...this.queryString};
        const excludedFields = ['page','sort', 'limit', 'fields'];//Array of fields a user cannot query
        excludedFields.forEach(el => delete queryObj[el]);

        let querystr = JSON.stringify(queryObj);
        querystr = querystr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        this.query = this.query.find(JSON.parse(querystr));
        return this;

    }

    sort(){
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join('');
            this.query = this.query.sort(sortBy);
        }
        else {
            this.query = this.query.sort('-date');
        }

        return this;
    }

    limitFields(){
        if (this.queryString.Fields){
            const queryObj = this.queryString.Fields.split(',').join('');
            this.query = this.query.select(Fields);
        }
        else{
            this.query = this.query.select('-__v');
        }
        return this;
    }

    paginate(){
        //Page=1 & limit=10 (1-10), page=2 & limit=10 (11-20) 
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 10;
        const skip = (page -1)*limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}
module.exports = APIFeatures;