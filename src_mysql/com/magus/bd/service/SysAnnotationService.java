package com.magus.bd.service;

import java.util.List;

import com.magus.bd.entity.SysAnotation;

public interface SysAnnotationService {
	
	public List<SysAnotation> getAnnotation(SysAnotation bean);
	
	public int getAnnotationCount(SysAnotation bean);

	public int addAnotation(SysAnotation bean);
	
	public SysAnotation getAnnotationById(int id);
	
	public boolean editAnnotation(SysAnotation bean);
	
	public boolean removeAnotation(String id);
}
