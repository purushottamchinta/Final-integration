package com.stackroute.newz.zuul.filter;


import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpMethod;
import org.springframework.web.filter.GenericFilterBean;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import java.util.Enumeration;

/* This class implements the custom filter by extending org.springframework.web.filter.GenericFilterBean.  
 * Override the doFilter method with ServletRequest, ServletResponse and FilterChain.
 * This is used to authorize the API access for the application.
 */

public class JwtFilter extends GenericFilterBean {

		/*
	 * Override the doFilter method of GenericFilterBean.
     * Retrieve the "authorization" header from the HttpServletRequest object.
     * Retrieve the "Bearer" token from "authorization" header.
     * If authorization header is invalid, throw Exception with message. 
     * Parse the JWT token and get claims from the token using the secret key
     * Set the request attribute with the retrieved claims
     * Call FilterChain object's doFilter() method */
	
	
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)

                            throws IOException, ServletException {

                HttpServletRequest httpRequest = (HttpServletRequest) request;
                HttpServletResponse httpResponse = (HttpServletResponse) response;
                String authHeader = httpRequest.getHeader("Authorization");
                if ("OPTIONS".equals(httpRequest.getMethod())) {

//                         httpResponse.setHeader("Access-Control-Allow-Headers", "*");
//                         httpResponse.setHeader("Access-Control-Allow-Origin", "*");
                            httpResponse.setStatus(HttpServletResponse.SC_OK);
                            chain.doFilter(request, response);
                }else {
//                         httpResponse.setHeader("Access-Control-Allow-Headers", "*");
//                         httpResponse.setHeader("Access-Control-Allow-Origin", "*");
                            Enumeration<String> a = httpRequest.getHeaderNames();
                            while(a.hasMoreElements()) {
                                        System.out.println(a.nextElement());
                            }
                            if (authHeader == null || !authHeader.startsWith("Bearer")) {
                                        throw new ServletException("Missing or Invalid Authentication Header");
                            }
                            try {
                                        String jwtToken = authHeader.substring(7);
                                        Claims claims = Jwts.parser().setSigningKey("secretKey").parseClaimsJws(jwtToken).getBody();
                                        httpRequest.setAttribute("username", claims);
                            }catch(Exception e) {
                                        httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                                        throw new ServletException("Unauthorized");
                            }
                            chain.doFilter(httpRequest, httpResponse);

                }

                }

}
