/*
 * package com.stackroute.newz.zuul.filter;
 * 
 * import javax.servlet.http.HttpServletRequest;
 * 
 * import org.slf4j.Logger; import org.slf4j.LoggerFactory; import
 * org.springframework.stereotype.Component;
 * 
 * import com.netflix.zuul.ZuulFilter; import
 * com.netflix.zuul.context.RequestContext; import
 * com.netflix.zuul.exception.ZuulException;
 * 
 * //Implement zuul logging filter by extending zuul filter
 * 
 * @Component public class LoggerFilter extends ZuulFilter {
 * 
 * private Logger logger = LoggerFactory.getLogger(this.getClass());
 * 
 * @Override public boolean shouldFilter() { return true; }
 * 
 * @Override public Object run() throws ZuulException { HttpServletRequest req =
 * RequestContext.getCurrentContext().getRequest();
 * System.out.println(req.getHeader("Authorization"));
 * System.out.println(req.getPathInfo()); return null; }
 * 
 * @Override public String filterType() { return "LoogerFilter class"; }
 * 
 * @Override public int filterOrder() { return 0; }
 * 
 * }
 */