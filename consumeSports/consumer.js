const amqp = require('amqplib');


connect();
async function connect(){
    try{
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue('news');
        channel.consume('news',message=>{
            const input = JSON.parse(message.content.toString())
            if(input.subject=='Sports'){
            console.log(JSON.parse(message.content.toString()));
            channel.ack(message);
            }
        });
        console.log('Waiting for messagess..')
    }catch(ex){

    }
}