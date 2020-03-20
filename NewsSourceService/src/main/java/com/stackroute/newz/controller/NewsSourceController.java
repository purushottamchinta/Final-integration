package com.stackroute.newz.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.newz.model.NewsSource;
import com.stackroute.newz.model.UserNewsSource;
import com.stackroute.newz.service.NewsSourceService;
import com.stackroute.newz.util.exception.NewsSourceNotFoundException;


/*
 * As in this assignment, we are working with creating RESTful web service, hence annotate
 * the class with @RestController annotation.A class annotated with @Controller annotation
 * has handler methods which returns a view. However, if we use @ResponseBody annotation along
 * with @Controller annotation, it will return the data directly in a serialized 
 * format. Starting from Spring 4 and above, we can use @RestController annotation which 
 * is equivalent to using @Controller and @ResposeBody annotation
 */

@RestController
@CrossOrigin(origins="*")
public class NewsSourceController {

	/*
	 * Autowiring should be implemented for the NewsService. (Use Constructor-based
	 * autowiring) Please note that we should not create any object using the new
	 * keyword
	 */
	@Autowired
	public NewsSourceService service;

	public static final Logger LOG = LoggerFactory.getLogger(NewsSourceController.class);

	public NewsSourceController(NewsSourceService service) {
		this.service = service;
	}

	/*
	 * Define a handler method which will create a specific newssource by reading
	 * the Serialized object from request body and save the newssource details in
	 * the database.This handler method should return any one of the status messages
	 * basis on different situations: 1. 201(CREATED) - If the newssource created
	 * successfully. 2. 409(CONFLICT) - If the newssourceId conflicts with any
	 * existing user.
	 * 
	 * This handler method should map to the URL "/api/v1/newssource" using HTTP
	 * POST method
	 */

	@PostMapping("/api/v1/newssource")
	public ResponseEntity<?> saveNewsSource(@RequestBody NewsSource newsSource) {
		
		LOG.info("NewsSourceController :: Entering saveNewsSource method");
		boolean newsSourceCreated = service.addNewsSource(newsSource);
		if (newsSourceCreated) {
			return new ResponseEntity<>(newsSourceCreated, HttpStatus.CREATED);
		}
		else {
			return new ResponseEntity<>("Duplicate NewsSourceId", HttpStatus.CONFLICT);
		}
	}
	
	@PostMapping("/api/v1/newssource/{userId}")
	public ResponseEntity<?> saveNews(@PathVariable("userId") String userId,@RequestBody NewsSource newsSource) {
	     
		LOG.info("NewsController :: Entering saveNews method");
		ResponseEntity<?> entity;
	 
		newsSource.setNewsSourceId(newsSource.getNewsSourceId());
		newsSource.setNewsSourceCreationDate();
		
		boolean createdNews = service.addNewsSource(userId,newsSource);
		
		if (createdNews) {
			entity = new ResponseEntity<>("true", HttpStatus.CREATED);
		}
		else {
			entity = new ResponseEntity<>("false", HttpStatus.CONFLICT);
		}
		return entity;
	}

	/*
	 * Define a handler method which will delete a newssource from a database. This
	 * handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the newssource deleted successfully
	 * from database. 2. 404(NOT FOUND) - If the newssource with specified newsId is
	 * not found.
	 *
	 * This handler method should map to the URL "/api/v1/newssource/{newssourceId}"
	 * using HTTP Delete method where "userId" should be replaced by a valid userId
	 * without {} and "newssourceId" should be replaced by a valid newsId without
	 * {}.
	 * 
	 */
	@DeleteMapping("/api/v1/newssource/{userId}/{newssourceId}")
	public ResponseEntity<?> deleteNewsSourceById(@PathVariable("userId") String userId,@PathVariable("newssourceId") String newssourceId){
		LOG.info("NewsSourceController :: Entering deleteNewsSourceById method");
		ResponseEntity<?> entity;
			boolean deleted = service.deleteNewsSource(userId,newssourceId);
			if(deleted) {
				entity = new ResponseEntity<>(deleted, HttpStatus.OK);
			}
			else {
				entity = new ResponseEntity<>("NewsSource Not Found", HttpStatus.NOT_FOUND);
			}

		return entity;
	}
	
	@DeleteMapping("/api/v1/newssource/{userId}")
	public ResponseEntity<?> deleteAllNews(@PathVariable("userId") String userId) {
		
		LOG.info("NewsController :: Entering deleteAllNews method");
		ResponseEntity<?> entity;
		try {
			
			this.service.deleteAllNewsSource(userId);
			entity = new ResponseEntity<>("News Deleted", HttpStatus.OK);
			
		} catch (Exception e) {
			
			entity = new ResponseEntity<>("News Not Found", HttpStatus.NOT_FOUND);
			
		}
		
		return entity;
	}


	/*
	 * Define a handler method which will update a specific newssource by reading
	 * the Serialized object from request body and save the updated newssource
	 * details in a database. This handler method should return any one of the
	 * status messages basis on different situations: 1. 200(OK) - If the newssource
	 * updated successfully. 2. 404(NOT FOUND) - If the newssource with specified
	 * newssourceId is not found.
	 * 
	 * This handler method should map to the URL "/api/v1/newssource/{newssourceId}"
	 * using HTTP PUT method where "newssourceId" should be replaced by a valid
	 * newssourceId without {}.
	 * 
	 */

	@PutMapping("/api/v1/newssource/{newssourceId}")
	public ResponseEntity<?> updateNewsSourceById(@RequestBody NewsSource newsSource,
			@PathVariable("newssourceId") String newsSourceId) {
		LOG.info("NewsSourceController :: Entering updateNewsSourceById method");
		
		ResponseEntity<?> entity;
		
		NewsSource newsSourceUpdated = null;
		try {
			
			newsSourceUpdated = service.updateNewsSource(newsSource, newsSourceId);
			entity = new ResponseEntity<>(newsSourceUpdated, HttpStatus.OK);
			
		} catch (NewsSourceNotFoundException e) {
			
			entity = new ResponseEntity<>("NewsSourceNotFoundException", HttpStatus.NOT_FOUND);
			
		} catch (Exception e) {
			
			entity = new ResponseEntity<>("Some internal error occured", HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
		return entity;

	}

	/*
	 * Define a handler method which will get us the specific newssource by a
	 * userId. This handler method should return any one of the status messages
	 * basis on different situations: 1. 200(OK) - If the newssource found
	 * successfully. 2. 404(NOT FOUND) - If the newssource with specified newsId is
	 * not found.
	 * 
	 * This handler method should map to the URL
	 * "/api/v1/newssource/{userId}/{newssourceId}" using HTTP GET method where
	 * "userId" should be replaced by a valid userId without {} and "newssourceId"
	 * should be replaced by a valid newsId without {}.
	 * 
	 */

	@GetMapping("/api/v1/newssource/{userId}/{newssourceId}")
	public ResponseEntity<?> getNewsSource(@PathVariable("userId") String userId,
			@PathVariable("newssourceId") String newssourceId) {
		LOG.info("NewsSourceController :: Entering getNewsSource method");
		ResponseEntity<?> entity;
		try {
			entity = new ResponseEntity<>(this.service.getNewsSourceById(userId, newssourceId), HttpStatus.OK);
		} catch (NewsSourceNotFoundException e) {
			entity = new ResponseEntity<>("Not found", HttpStatus.NOT_FOUND);
		}
		return entity;
	}

	/*
	 * Define a handler method which will show details of all newssource created by
	 * specific user. This handler method should return any one of the status
	 * messages basis on different situations: 1. 200(OK) - If the newssource found
	 * successfully. 2. 404(NOT FOUND) - If the newssource with specified newsId is
	 * not found. This handler method should map to the URL
	 * "/api/v1/newssource/{userId}" using HTTP GET method where "userId" should be
	 * replaced by a valid userId without {}.
	 * 
	 */

	@GetMapping("/api/v1/newssource/{userId}")
	public ResponseEntity<?> getNewsSource(@PathVariable("userId") String userId)
			throws NewsSourceNotFoundException {
		LOG.info("NewsSourceController :: Entering getNewsSource method");
		ResponseEntity<?> entity;
		List<NewsSource> list = service.getAllNewsSourceByUserId(userId);
		
		if(list != null) {
			entity = new ResponseEntity<>(list, HttpStatus.OK);
		}else {
			entity = new ResponseEntity<>("Resource not found", HttpStatus.NOT_FOUND);
		}
		return entity;
	}
	
	@GetMapping("/api/v1/newssource/")
	public ResponseEntity<?> getNewsSourceData()
			throws NewsSourceNotFoundException {
		LOG.info("NewsSourceController :: Entering getNewsSource method");
		ResponseEntity<?> entity;
		List<NewsSource> list = service.getAllNewsSource();
		
		if(list != null) {
			entity = new ResponseEntity<>(list, HttpStatus.OK);
		}else {
			entity = new ResponseEntity<>("Resource not found", HttpStatus.NOT_FOUND);
		}
		return entity;
	}

}
