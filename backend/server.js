const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
require('dotenv').config({ path: './.env' })
const stripe = require('stripe')('sk_test_51MIvJWSH80fDEZ0X9p4bxEIhB3EDzBEPnzneC1uomhLedKQlASQipe1iwSSy3kQlQlV6MPHVMpIFmG5Ue7IrqREy00HBRjKe2D')
// const stripe = require('stripe')(process.env.STRIPE_SECRET);
require('./connection')
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server, {
  cors: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PATCH', "DELETE"]
})


const User = require('./Models/User');
const userRoutes = require('./Routes/userRoutes');
const productRoutes = require('./Routes/productRoutes');
const orderRoutes = require('./Routes/orderRoutes');
const imageRoutes = require('./Routes/imageRoutes');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/images', imageRoutes);


app.post('/create-payment', async(req, res)=> {
  const {amount} = req.body;
  console.log(amount);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'inr',
      payment_method_types: ['card']
    });
    res.status(200).json(paymentIntent)
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e.message);
   }
})


server.listen(8080, ()=> {
  console.log('server running at port', 8080)
})

app.set('socketio', io);