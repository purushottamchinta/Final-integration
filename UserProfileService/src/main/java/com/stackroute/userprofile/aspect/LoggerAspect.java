package com.stackroute.userprofile.aspect;
/* Annotate this class with @Aspect and @Component */

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoggerAspect {
	/*
	 * Write loggers for each of the methods of User controller, any particular
	 * method will have all the four aspectJ annotation
	 * (@Before, @After, @AfterReturning, @AfterThrowing).
	 */
	public static final Logger logger = LoggerFactory.getLogger(LoggerAspect.class);

	
	@Before("execution (* com.stackroute.userprofile.controller.*(..))")
	public void logFirst() {
		logger.info("News user accesing controller methods");
	}

	@After("personAdd()")
	public void afterCall(JoinPoint joinPoint) {
		logger.info("News details added.." + joinPoint.getSignature());

	}

	@Pointcut("execution (* com.stackroute.userprofile.controller.*(..))")
	public void personAdd() {
		logger.info("News info added..");

	}

	@AfterReturning("execution(* com.stackroute.userprofile.controller.*(..))")
	public void logAroundAllMethods() {
		logger.info("around code under all serviceimpl class..");
	}

	@AfterThrowing("execution(* com.stackroute.userprofile.controller.*(..))")
	public void logAfterThrowingAllMethods() throws Throwable {
		logger.info("logAfterThrowingAllMethods contoller class..");

	}
}
