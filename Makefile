include .env
export $(shell sed 's/=.*//' .env)

JAR_NAME=rmtjs
VERSION=0.0.1
MAIN_CLASS=com.rmtjb.api.RemoteJobsApplication  
PORT ?= 8080

run-client:
	@export $(grep -v '^#' .env | xargs) && cd ./src/main/client/ && pnpm run dev

run:
	@echo "Running Spring Boot application..."
	@export $(grep -v '^#' .env | xargs) && mvn spring-boot:run

build:
	@echo "Building Spring Boot application..."
	@mvn clean package -DskipTests

clean:
	@echo "Cleaning project..."
	@mvn clean
