let bodyParser = require('body-parser')

//request body object parser to json
function bodyParserJson(router){

    router.use(bodyParser.json()); // for parsing application/json
    router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
}

module.exports = {bodyParserJson}