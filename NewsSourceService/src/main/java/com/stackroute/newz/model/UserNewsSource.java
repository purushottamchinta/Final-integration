package com.stackroute.newz.model;

import java.util.List;

import org.springframework.data.annotation.Id;

public class UserNewsSource {
	
	@Id
	private String userId;
	private List<NewsSource> newsSourcelist;

	public UserNewsSource(){
		
	}

	public UserNewsSource(String userId, List<NewsSource> newsSourcelist) {
		super();
		this.userId = userId;
		this.newsSourcelist = newsSourcelist;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public List<NewsSource> getNewsSourcelist() {
		return newsSourcelist;
	}

	public void setNewsSourcelist(List<NewsSource> newsSourcelist) {
		this.newsSourcelist = newsSourcelist;
	}
	
	
	   
}
