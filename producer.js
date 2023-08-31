const  { Kafka} = require("./client");

const readLine = require("readline");


const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
})

async function init(){
    const producer = Kafka.producer();
    console.log("connecting.....")
    await producer.connect();
    console.log("connected");

    rl.setPrompt('> ');
    rl.prompt();
    rl.on('line', async function(line) {
        const [riderName, location] = line.split(' ');
        await producer.send({
            topic: "Rider-update",
            messages: [{
                partition: location.toLowerCase()=== 'north' ? 0 :1,
                key: 'location-update', value: JSON.stringify({
                    name: riderName ,loc : location,
                })
            }]
        })
    }).on('close', async() =>{

        await producer.disconnect();
    })
    
}   


init();