const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/work-api',{
    useNewUrlParser : true,
    useUnifiedTopology : true
    
}).then(() => {
    console.log('connction successfully with db')
}).catch((err) => {
    console.log(err)
})