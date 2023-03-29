const sequelize = require('../utils/connection');
require('../models/Genre')
require('../models/Actors')
require('../models/Directors')
require('../models/Movies')
require('../models')

const main = async() => {
    try{
        await sequelize.sync({ force: true });
        // funciones de create...
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();