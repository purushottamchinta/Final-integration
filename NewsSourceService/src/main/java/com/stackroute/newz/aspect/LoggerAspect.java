package com.stackroute.newz.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/* Annotate this class with @Aspect and @Component */

@Aspect
@Component
public class LoggerAspect {

	/*
	 * Write loggers for each of the methods of NewsController, any particular method
	 * will have all the four aspectJ annotation
	 * (@Before, @After, @AfterReturning, @AfterThrowing).
	 */


	public static final Logger LOG = LoggerFactory.getLogger(LoggerAspect.class);
	
	@Before("execution (* com.stackroute.newz.controller.NewsSourceController.*(..))")
	public void logFirst() {
		
	LOG.info("User executing controller");
	
	}

	
	@After("newsInfoAdd()")
	public void afterCall(JoinPoint joinPoint) {
		
	LOG.info("News source added.."+joinPoint.getSignature());
	

	}

	@Pointcut("execution (* com.stackroute.newz.controller.NewsSourceController.*(..))")
	
	public void newsInfoAdd() {
		
	LOG.info("News source added..");

	}
	
	 @AfterReturning("execution(* com.stackroute.newz.service.NewsSourceServiceImpl.*(..))")
	    public void logAroundAllMethods() { 
		 LOG.info(" After NewsSourceServiceImpl methods returning..");
	 }
	 
	 
	 @AfterThrowing ("execution(* com.stackroute.newz.service.NewsSourceServiceImpl.*(..))")
	    public void logAfterThrowingAllMethods() throws Throwable {
		 LOG.info(" After NewsSourceServiceImpl methods throwing the exception.."); 
	 }
}
