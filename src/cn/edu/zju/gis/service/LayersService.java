package cn.edu.zju.gis.service;

import java.util.List;

import cn.edu.zju.gis.po.Layers;

public interface LayersService {
	public boolean addLayers(Layers layer) throws Exception;
	public List<Layers> searchLayers(String keyword, int type) throws Exception;
}
