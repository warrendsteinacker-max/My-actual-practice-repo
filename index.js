import express from 'express';
import Users from '/data.js';

const app = express()

app.post('/login', (req, res)=>{
    try{
    const {pass} = req.body
    const user = Users.find((U)=> U.pass === pass) 
    return res.status(200).json({User: user})}
    catch(error){
    console.error(error.message)
    return res.status(400).json({nouser: 'nouser'})
    }
})

app.listen(8000, ()=>{
    console.log('server on 8000')
})