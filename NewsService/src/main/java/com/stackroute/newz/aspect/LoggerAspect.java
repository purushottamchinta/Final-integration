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

	public static final Logger logger = LoggerFactory.getLogger(LoggerAspect.class);
	/*
	 * Write loggers for each of the methods of NewsController, any particular method
	 * will have all the four aspectJ annotation
	 * (@Before, @After, @AfterReturning, @AfterThrowing).
	 */
	@Before("execution (* com.stackroute.newz.controller.NewsController.*(..))")
	public void logFirst() {
		logger.info("News user accesing controller methods");
	}

	@After("personAdd()")
	public void afterCall(JoinPoint joinPoint) {
		logger.info("News details added.." + joinPoint.getSignature());

	}

	@Pointcut("execution (* com.stackroute.newz.controller.NewsController.*(..))")
	public void personAdd() {
		logger.info("News info added..");

	}

	@AfterReturning("execution(* com.stackroute.newz.service.NewsServiceImpl.*(..))")
	public void logAroundAllMethods() {
		logger.info("around code under all newsserviceimpl class..");
	}

	@AfterThrowing("execution(* com.stackroute.newz.controller.NewsController.*(..))")
	public void logAfterThrowingAllMethods() throws Throwable {
		logger.info("logAfterThrowingAllMethods newscontoller class..");

	}


}
