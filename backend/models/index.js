const mongoose = require('mongoose');

const connect = () => {
  let path = 'mongodb://172.17.0.2/db'
  if(process.env.MONGO_HOST){
    path = `mongodb://${process.env.MONGO_HOST}/db`
    
  }
    mongoose
      .connect(path, {
      })
      .then(()=>{
          console.log('Mongodb connection success')
          console.log(path);
      })
      .catch(err => console.log(err))
  
  };
  mongoose.connection.on("error", err => {
    console.error("몽고디비 연결 에러", err);
  });
  
  module.exports = connect;