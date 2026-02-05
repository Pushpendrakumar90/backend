const express = require('express');
const session = require('express-session');

const router = express.Router();   // get route and use crud -
const userSchema = require('../models/userSchema');

// create users
router.post('/', async (req, res) => {
    const user = new userSchema(req.body)
    const { email } = user;
    const isExist = await userSchema.findOne({ email });
    if (isExist)
        return res.json({ error: 'user is Exist allready', Email: email });
    const newUser = await user.save();
    res.json({ msg: 'created successfully !', data: newUser })
})



// get all users
router.get('/', async (req, res) => {
    const users = await userSchema.find();
    res.status(200).json({users})
})


// find by id and  user
router.get('/:id', async(req, res) => {
    const id = req.params.id;
    const isExist = await userSchema.findOne({_id: id});

    if (!isExist)
        return res.json({ error: 'involid Id', id: id });
    res.status(200).json(isExist)
})



//delete
router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    const isExist = await userSchema.findOne({_id: id });
    if (!isExist)
        return res.json({ error: 'ID is  involid', id: id });
    await userSchema.findOneAndDelete({_id: id});
    res.status(200).json({msg: 'user is deleted' , id})
})

// for login 
router.post('/login', async(req, res) => {
    const {email , password} = req.body;
    const isExist = await userSchema.findOne({email: email });
    
    if (!isExist)
        return res.json({ error: 'Involid email' });

    
    if(isExist.password == password){
        req.session.user = isExist;
         if(req.session.user)
          return res.status(200).json({user: req.session.user , msg : 'login success !'})
    }
     res.status(402).json({ error: 'involid password' });
})


//log out ---------
router.post('/logout', async(req, res) => {
    req.session.destroy((err)=>{
        if(err){
           return res.status(500).json({msg: 'logout failed'})
        }
        res.clearCookie('connect.sid');
        res.json({msg: 'LogOut success'});

    })
})



// send session 
router.post('/getsession/:username', async(req, res) => {
    const username = req.params.username;

         if(req.session.user.email == username)
          return res.status(200).json({user: req.session.user , msg : 'isActive'})
    
     res.status(402).json({ error: 'user notActive' });
})


//update route
router.put('/:id', async(req, res) => {
    const id = req.params.id;
    const newUser = req.body;
    const isExist = await userSchema.updateOne({_id: id},{$set: newUser});
    // userSchema.findOneAndUpdate(id,newUser)
    if (!isExist)
        return res.json({ error: 'ID is not isExist', id: id });
    
    res.status(200).json({msg: 'user is updated  ' , id: id})
})

module.exports = router;