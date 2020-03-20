package com.stackroute.newz.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.newz.model.UserNewsSource;

@Repository
public interface UserNewsSourceRepository extends MongoRepository<UserNewsSource, String> {

}
