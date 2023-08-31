# Kafka Node.js Project

This project uses Kafka for message passing, orchestrated through Docker. Before running, make sure Docker and Docker Compose are installed on your system.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm
- Docker
- Docker Compose

### Setting Up & Running the Project

Follow these steps to get the project up and running:
#### Edit Ip address of The Bash file --run and skip till step 3
```bash
chmod +x setup.sh
./setup.sh

```
#### 1. Install Node.js dependencies:

```bash
npm install
```

#### 2. Start Zookeeper:

```bash
docker run -p 2181:2181 zookeeper
```

#### 3. Start Kafka:

Note: Ensure your IP address . If using the Docker Compose method mentioned earlier, you can skip this step and simply use `docker-compose up` to start both Kafka and Zookeeper.

```bash
docker run -p 9092:9092 \
-e KAFKA_ZOOKEEPER_CONNECT=<IPAddress>:2181 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<IPAddress>:9092 \
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
confluentinc/cp-kafka
```

#### 4. Start the Kafka Producer:

```bash
node producer.js
```

#### 5. Start the Kafka Consumer:

```bash
node consumer.js
```

