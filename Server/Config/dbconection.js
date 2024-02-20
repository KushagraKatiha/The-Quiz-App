const mongoose = require('mongoose')
const URI = process.env.URI
const connection = async()=>{
   mongoose.connect(URI)
   .then((dbcon)=>{
       console.log("mongodb connected", dbcon.connection.host);
   })
   .catch((err)=>{
       console.log("failed",err.message);
       process.exit(1)
   })
}
module.exports = connection