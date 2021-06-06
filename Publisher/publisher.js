const amqp = require('amqplib');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
const PORT = 3000;


async function postMessage(message){
    try{
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue('news');
        channel.sendToQueue('news',Buffer.from(JSON.stringify(message)));
        console.log('Posted '+JSON.stringify(message));
    }catch(ex){
        console.log(ex);
    }
}

app.post('/',(req,res)=>{
    const message = req.body;
    postMessage(message);
    res.send("Successfully published the image");
})

app.get('/',(req,res,next)=>{
    res.send("Getting message");
})



app.listen(PORT,()=>{
    console.log('Listening at port '+PORT);
})