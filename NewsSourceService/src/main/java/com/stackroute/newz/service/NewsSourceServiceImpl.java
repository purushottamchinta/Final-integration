package com.stackroute.newz.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.stackroute.newz.model.NewsSource;
import com.stackroute.newz.model.UserNewsSource;
import com.stackroute.newz.repository.NewsSourceRepository;
import com.stackroute.newz.repository.UserNewsSourceRepository;
import com.stackroute.newz.util.exception.NewsSourceNotFoundException;

/*
* Service classes are used here to implement additional business logic/validation 
* This class has to be annotated with @Service annotation.
* @Service - It is a specialization of the component annotation. It doesn't currently 
* provide any additional behavior over the @Component annotation, but it's a good idea 
* to use @Service over @Component in service-layer classes because it specifies intent 
* better. Additionally, tool support and additional behavior might rely on it in the 
* future.
* */

@Service
public class NewsSourceServiceImpl implements NewsSourceService {

	/*
	 * Autowiring should be implemented for the NewsDao and MongoOperation.
	 * (Use Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword.
	 */
	
	public static final Logger LOG = LoggerFactory.getLogger(NewsSourceServiceImpl.class);
	
	private NewsSourceRepository newsSourceRepository;
	
	@Autowired
	private UserNewsSourceRepository userRepository;
	
	
	
	@Autowired
	public NewsSourceServiceImpl(NewsSourceRepository newsSourceRepository,UserNewsSourceRepository userRepository)
	{
		this.newsSourceRepository=newsSourceRepository;
		this.userRepository=userRepository;
	}
//	
//	@Autowired
//	public NewsSourceServiceImpl(UserNewsSourceRepository userRepository)
//	{
//		this.userRepository=userRepository;
//	}
	
	

	/*
	 * This method should be used to save a newsSource.
	 */

	@Override
	public boolean addNewsSource(NewsSource newsSource) {
		LOG.info("NewsSourceServiceImpl :: Entering addNewsSource method");
		NewsSource news = newsSourceRepository.insert(newsSource);
		if (news != null) {
			return true;
		}
		return false;
	}

	/* This method should be used to delete an existing newsSource. */

	@Override
	public boolean deleteNewsSource(String userId,String newsSourceId) {
		LOG.info("NewsSourceServiceImpl :: Entering deleteNewsSource method");
		
		LOG.info("$$$$$"+userRepository);
		
		Optional<UserNewsSource> userNews = userRepository.findById(userId);
		

		
		if (userNews.isPresent())
			for (NewsSource news : userNews.get().getNewsSourcelist())
				if (news.getNewsSourceId().equals(newsSourceId)) {
					userNews.get().getNewsSourcelist().remove(news);
					this.userRepository.save(userNews.get());
					return true;
				}

		return false;
//		Optional<NewsSource> opt = newsSourceRepository.findById(newsSourceId);
//
//		if (opt != null && opt.isPresent()) {
//			newsSourceRepository.deleteById(newsSourceId);
//			return true;
//		}
//
//		return false;
	}

	/* This method should be used to update an existing newsSource. */
	
	@Override
	public NewsSource updateNewsSource(NewsSource newsSource, String newsSourceId) throws NewsSourceNotFoundException {
		LOG.info("NewsSourceServiceImpl :: Entering updateNewsSource method");
		Optional<NewsSource> opt = newsSourceRepository.findById(newsSourceId);

		if (opt != null && opt.isPresent()) {	
			newsSourceRepository.insert(newsSource);
			return newsSource;
		}
		else {
			throw new NewsSourceNotFoundException("News Source not found");
		}
	}

	/* This method should be used to get a specific newsSource for an user. */

	@Override
	public NewsSource getNewsSourceById(String userId, String newsSourceId) throws NewsSourceNotFoundException {
		LOG.info("NewsSourceServiceImpl :: Entering getNewsSourceById method");
		try {
			List<NewsSource> list = newsSourceRepository.findAllNewsSourceByNewsSourceCreatedBy(userId);

			if (list != null && list.size()>0) {			
				return list.stream().filter(news->news.getNewsSourceId().equals(newsSourceId))
						.findAny()
						.orElse(null);
			}
			else {
				
				return null;
			}
		} catch (NoSuchElementException e) {
			return null;
		}
	}

	
	 /* This method should be used to get all newsSource for a specific userId.*/

	@Override
	public List<NewsSource> getAllNewsSourceByUserId(String userId) {
		LOG.info("NewsSourceServiceImpl :: Entering getAllNewsSourceByUserId method");
   Optional<UserNewsSource> userNews = this.userRepository.findById(userId);
		
		if (userNews.isPresent()) {
			return userNews.get().getNewsSourcelist();
		}

		return null;
		
		//return newsSourceRepository.findAllNewsSourceByNewsSourceCreatedBy(createdBy);
				
	}

	@Override
	public boolean addNewsSource(String userId, NewsSource newsSource) {
		
		
		LOG.info("NewsServiceImpl :: Entering addNews method");

		// get the existing UserNews, particulary newslist
		Optional<UserNewsSource> opt = this.userRepository.findById(userId);
		

		UserNewsSource userNewsSource = null;

		if(opt.isPresent()) {
			userNewsSource = opt.get();
			
			for(NewsSource n : userNewsSource.getNewsSourcelist()) {
				// for avoiding duplications check newsID already exist or not
				if(n.getNewsSourceId().equals(newsSource.getNewsSourceId()))
					return false;
			}
		}else {
			
			userNewsSource = new UserNewsSource();
			userNewsSource.setNewsSourcelist(new ArrayList<NewsSource>());
			userNewsSource.setUserId(userId);
		}
		
		// if it is a new NewsId add to database
		userNewsSource.getNewsSourcelist().add(newsSource);
		
		userRepository.save(userNewsSource);
		return true;
		
		
		
	}

	@Override
	public boolean deleteAllNewsSource(String userId) throws NewsSourceNotFoundException {
		// TODO Auto-generated method stub
		try {
			UserNewsSource userNews = this.userRepository.findById(userId).get();
			
			this.userRepository.delete(userNews);
			
			return true;
			
		} catch (Exception e) {
			throw new NewsSourceNotFoundException("News Source not found");

		}

	}
	
	@Override
	public List<NewsSource> getAllNewsSource() {
		LOG.info("NewsSourceServiceImpl :: Entering getAllNewsSourceByUserId method");
		List<NewsSource> userNews = this.newsSourceRepository.findAll();
		     
		  if(userNews !=null) {
			  System.out.println(userNews.get(0));
		  }

		return userNews;
		
		//return newsSourceRepository.findAllNewsSourceByNewsSourceCreatedBy(createdBy);
				
	}

}
