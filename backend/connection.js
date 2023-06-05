require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
const connectionStr = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@cluster0.x9ipk.mongodb.net/ecommerce?retryWrites=true&w=majority`;
mongoose.connect(connectionStr, {useNewUrlparser:true})
.then(()=>{
    console.log(`connection is successful`);
}).catch((e)=>{
    console.log(`no connection established`);
})
mongoose.connection.on("error", (err) => {
  console.log(err);
});
