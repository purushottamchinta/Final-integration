package com.stackroute.newz.service;

import java.util.LinkedList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.newz.model.News;
import com.stackroute.newz.model.UserNews;
import com.stackroute.newz.repository.NewsRepository;
import com.stackroute.newz.util.exception.NewsNotFoundException;

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
public class NewsServiceImpl implements NewsService {

	/*
	 * Autowiring should be implemented for the NewsDao and MongoOperation.
	 * (Use Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword.
	 */
	private NewsRepository repo;
	
	@Autowired
	public NewsServiceImpl(NewsRepository repo) {
		this.repo = repo;
	}
	

	/*
	 * This method should be used to save a new news.
	 */
	@Override
	public boolean addNews(News news) {
		Optional<UserNews> optionalUser = repo.findById(news.getAuthor());
		List<News> newsList = new LinkedList<>();

		UserNews savedNews = null;

		if (optionalUser.isPresent()) {
			int newsId = news.getNewsId();
			newsList = optionalUser.get().getNewslist();
			long count = newsList.stream().filter(filterId -> filterId.getNewsId() == newsId).count();

			if (count > 0)
				return false;
		}
		UserNews userNews = new UserNews();
		newsList.add(news);
		userNews.setNewslist(newsList);
		userNews.setUserId(news.getAuthor());

		savedNews = repo.insert(userNews);
		if (savedNews == null)
			return false;
		return true;
	}

	/* This method should be used to delete an existing news. */
	
	public boolean deleteNews(String userId, int newsId) {
		Optional<UserNews> optional = repo.findById(userId);
		List<News> newsList = new LinkedList<>();

		if (optional.isPresent()) {
			newsList = optional.get().getNewslist();
			long count = newsList.stream().filter(filterId -> filterId.getNewsId() == newsId).count();

			if (count > 0) {
				newsList = newsList.stream().filter(filterId -> filterId.getNewsId() != newsId)
						.collect(Collectors.toList());
				UserNews userNews = new UserNews();
				userNews.setNewslist(newsList);
				userNews.setUserId(userId);

				repo.save(userNews);
				return true;
			}
		}
		return false;
	}

	/* This method should be used to delete all news for a  specific userId. */
	
	public boolean deleteAllNews(String userId) throws NewsNotFoundException {
		try {
			Optional<UserNews> optionalUser = repo.findById(userId);
			if(optionalUser.isPresent()) {
				repo.deleteById(userId);
				return true;
			}
		}catch(NoSuchElementException e) {
			throw new NewsNotFoundException("News not found exceptions");
			
		}
		return false;
	}

	/*
	 * This method should be used to update a existing news.
	 */

	public News updateNews(News news, int newsId, String userId) throws NewsNotFoundException {
		try {
			Optional<UserNews> optionalUser = repo.findById(userId);
			List<News> listNews = new LinkedList<>();
			if (optionalUser.isPresent()) {
				listNews = optionalUser.get().getNewslist();
				long count = listNews.stream().filter(filterId -> filterId.getNewsId() == newsId).count();
				if (count > 0) {
					UserNews userNews = new UserNews();
					listNews = listNews.stream().filter(filterId -> filterId.getNewsId() != newsId)
							.collect(Collectors.toList());
					listNews.add(news);

					userNews.setNewslist(listNews);
					userNews.setUserId(userId);

					repo.save(userNews);
					return news;
				} else {
					throw new NewsNotFoundException("News not found exceptions");
				}
			}

		} catch (NoSuchElementException e) {
			throw new NewsNotFoundException("News not found exceptions");
		}
		return news;
	}

	/*
	 * This method should be used to get a news by newsId created by specific user
	 */

	public News getNewsByNewsId(String userId, int newsId) throws NewsNotFoundException {
		try {
			Optional<UserNews> optionalUser = repo.findById(userId);
			List<News> listNews = new LinkedList<>();
			if (optionalUser.isPresent()) {
				listNews = optionalUser.get().getNewslist();
				Optional<News> optionalNews = listNews.stream().filter(filterId -> filterId.getNewsId() == newsId).findAny();
				if (optionalNews.isPresent()) {
					return optionalNews.get();
				} else {
					throw new NewsNotFoundException("News not found exceptions");
				}
			}

		} catch (NoSuchElementException e) {
			throw new NewsNotFoundException("News not found exceptions");
		}
		return null;
	}

	/*
	 * This method should be used to get all news for a specific userId.
	 */

	public List<News> getAllNewsByUserId(String userId) {
		Optional<UserNews> optionalUser = repo.findById(userId);
		if(optionalUser.isPresent()) {
			return optionalUser.get().getNewslist();
				
	}
		return null;
	}
	
	public List<UserNews> getAllNews() {
		return repo.findAll();
	}

}
