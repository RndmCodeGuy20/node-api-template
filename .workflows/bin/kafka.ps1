$ipAddress = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -ne "127.0.0.1" -and $_.IPAddress -ne "::1" }).IPAddress[-1]

# Start Zookeeper container and expose port 2181
docker run -d -p 2181:2181 --name zookeeper zookeeper

# Start Kafka container, expose port 9092, and set environment variables
docker run -p 9092:9092 `
    -e KAFKA_ZOOKEEPER_CONNECT=$ipAddress:2181 `
    -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://$ipAddress:9092 `
    -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 `
    --name kafka_broker `
    confluentinc/cp-kafka
