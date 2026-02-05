const express = require('express'); 
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
// const envfile = require('./.env');


const userRouter = require('./routes/users')

const app = express();

// parse express data is json-
app.use(express.json());

// body parser -
app.use(bodyParser.urlencoded({extended: true}))


// third party middleware like- cookie , session , cors
app.use(cors());
app.use(cookieParser());
app.use(session({
    secret: 'secret1234',
    resave: false,
    saveUninitialized: true
}))

// create route for api 
app.use('/api/users', userRouter)


// connect mongo db -
// let URI = 'mongodb://127.0.0.1:27017/userDummy'
let URI = 'mongodb+srv://sujeetbhai:ps123456@ecommerce.aayqcnq.mongodb.net/userDummy'
mongoose.connect(URI)
.then(()=> console.log('db created/connected successfully')
)
.catch((err)=>{
    console.log('Mongoose Error: ' + err.message)  
})



// error handler for this app-
app.use((err, req,res,next)=> {
    if(err){
        res.status(500).json({error: err.message})
    }
})


// port number and listen server-
let PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`server is ready http://localhost:${PORT}`); 
})
