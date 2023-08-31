const { Kafka} = require("kafkajs")

exports.Kafka = new Kafka ({
    clientId: "my-app",
    brokers: ["192.168.169.187:9092"]
})