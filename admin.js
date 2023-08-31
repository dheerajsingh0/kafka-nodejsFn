const {Kafka} = require("./client")


async function init() {
    const admin = Kafka.admin();
    console.log("Admin Connecting.....")
    await admin.connect();
    console.log("admin connect success");
    console.log("creating topics");

    await admin.createTopics({
        topics:[{
            topic: "Rider-update",
            numPartitions: 2,
        }]
    });
    console.log("created topics successfully");
    await admin.disconnect();
    console.log("disconnect")
}
init();