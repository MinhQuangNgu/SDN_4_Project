const user = require('./user');

function router(app){
    app.use('/user',user);
}

module.exports = router;