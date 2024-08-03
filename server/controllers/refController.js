const dbUserConn = require('../config/dbConnection');

const schoolList = (req, res) => {
   return new Promise((resolve, reject) =>{
       dbUserConn.query(
           `select SchoolID, SchoolName  from NYC_High_Schools order by SchoolName;`,
           (err, results) => {
               if(err) {
                   reject(err);
               }else{
                   resolve(results);
               }
           }
       )
   })
   .then(results => {
       res.json(results)
   })
   .catch(err => {
       console.log(err);
       res.sendStatus(500);
   })
}

module.exports = { schoolList };