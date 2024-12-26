package com.kb._config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDbFactory;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;

@EnableMongoAuditing
@Configuration
@PropertySource({"classpath:/application.properties"})
public class MongoConfig {
    @Value("${spring.data.mongodb.host}")
    private String host;

    @Value("${spring.data.mongodb.port}")
    private int port;

    @Value("${spring.data.mongodb.database}")
    private String database;

    @Bean
    public MongoClient mongoClient() {
        String uri = String.format("mongodb://%s:%d/%s", host, port, database);
        return MongoClients.create(uri);
    }

    @Bean
    public SimpleMongoClientDbFactory mongoDbFactory() {
        return new SimpleMongoClientDbFactory(mongoClient(), database);
    }

    @Bean
    public MappingMongoConverter mongoConverter() {
        return new MappingMongoConverter(mongoDbFactory(), new MongoMappingContext());
    }

    @Bean
    public MongoTemplate mongoTemplate() {
        return new MongoTemplate(mongoDbFactory(), mongoConverter());
    }
}
