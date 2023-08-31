const  { Kafka} = require("./client");
const group =  process.argv[2];

async function init(){
    if (!group || typeof group !== 'string' || group.trim() === '') {
        console.error('Please provide a valid non-empty groupId as an argument.');
        process.exit(1);
    }
    const consumer = Kafka.consumer({ groupId: group })

    await consumer.connect()
    await consumer.subscribe({ topic: 'Rider-update', fromBeginning: true })
    
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(`${group}[${topic}]: PART:${partition}: ${message.value.toString()}`);
      },
    })
}
init();