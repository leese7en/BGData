package com.magus.bd.interceptor;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Before;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class LogInterceptor {

	private String requestPath = null; // 请求地址
	private String userName = null; // 用户名
	private Map<?, ?> inputParamMap = null; // 传入参数
	private Map<String, Object> outputParamMap = null; // 存放输出结果
	private long startTimeMillis = 0; // 开始时间
	private long endTimeMillis = 0; // 结束时间

	public void doAccessCheck() {
		System.out.println("前置通知");
	}

	public void doAfterReturning() {
		System.out.println("后置通知");
	}

	public void doAfter() {
		System.out.println("最终通知");
	}

	public void doAfterThrowing() {
		System.out.println("例外通知");
	}

	public Object doBasicProfiling(ProceedingJoinPoint pjp) throws Throwable {
		System.out.println("进入方法");
		Object result = pjp.proceed();
		System.out.println("退出方法");
		return result;
	}
}
