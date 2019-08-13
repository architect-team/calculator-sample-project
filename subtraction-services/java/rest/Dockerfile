# Build stage
FROM gradle:jdk11 as build_container

WORKDIR /usr/src/app

COPY build.gradle ./
COPY settings.gradle ./
COPY gradle/* ./gradle/wrapper
COPY gradlew ./
COPY src/main/java/architect_subtraction_service/* ./src/main/java/architect_subtraction_service/
COPY build/libs/* ./build/libs/

RUN ./gradlew installDist

# Run stage
FROM openjdk:8-jre-alpine

WORKDIR /usr/src/app

COPY --from=build_container /usr/src/app/build/install/architect_subtraction_service/ /usr/src/app/

RUN ls /usr/src/app

EXPOSE $PORT

CMD ["/usr/src/app/bin/architect_subtraction_service"]