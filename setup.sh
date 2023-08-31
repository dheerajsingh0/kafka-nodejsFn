#!/bin/bash

# Load the environment variables if needed
source .env

# Check if Docker is installed, if not, install it
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Installing now..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
else
    echo "Docker is already installed."
fi

# Check if Docker Compose is installed, if not, install it

# if ! command -v docker-compose &> /dev/null; then
#     echo "Docker Compose is not installed. Installing now..."
#     sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
#     sudo chmod +x /usr/local/bin/docker-compose
# else
#     echo "Docker Compose is already installed."
# fi
# Check if node_modules directory exists, if not, run npm install
if [ ! -d "node_modules" ]; then
    echo "node_modules directory not found. Running npm install..."
    npm install
else
    echo "node_modules directory already exists."
fi
# Run the Docker commands & replace the <IpAddress> from from below
docker run -p 2181:2181 zookeeper

docker run -p 9092:9092 \
-e KAFKA_ZOOKEEPER_CONNECT=<IpAddress>:2181 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<IpAddress>:9092 \
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
confluentinc/cp-kafka
