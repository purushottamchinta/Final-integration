package com.stackroute.newz.service;

import java.util.List;

import com.stackroute.newz.model.NewsSource;
import com.stackroute.newz.model.UserNewsSource;
import com.stackroute.newz.util.exception.NewsSourceNotFoundException;

public interface NewsSourceService {
	
	/*
	 * Should not modify this interface. You have to implement these methods in
	 * corresponding Impl classes
	 */

	// newly added method
	boolean addNewsSource(String userId,NewsSource newsSource);
	
	boolean addNewsSource(NewsSource newsSource);

	
	//changed to String
	boolean deleteNewsSource(String userId,String newsSourceId);
	//New
	boolean deleteAllNewsSource(String userId)throws NewsSourceNotFoundException;

	//changed to string
	NewsSource updateNewsSource(NewsSource newsSource, String newsSourceId) throws NewsSourceNotFoundException;

	//changed int to string newsSourceId
	NewsSource getNewsSourceById(String userId,String newsSourceId) throws NewsSourceNotFoundException;

	List<NewsSource> getAllNewsSourceByUserId(String userId);
	
	List<NewsSource> getAllNewsSource();
	
}
