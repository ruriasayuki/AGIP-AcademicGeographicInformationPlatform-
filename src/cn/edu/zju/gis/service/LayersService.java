package cn.edu.zju.gis.service;

import java.util.List;

import cn.edu.zju.gis.po.Layers;
import cn.edu.zju.gis.po.LayersVo;
import cn.edu.zju.gis.po.Maps;

public interface LayersService {
	public boolean addLayers(Layers layer) throws Exception;
	public List<Layers> searchLayers(String keyword, int type) throws Exception;
	public List<Layers> getLayerList(LayersVo queryLayer) throws Exception;
	public int countLayers(LayersVo queryLayer) throws Exception;
	
	public int deleteLayer(LayersVo quertLayer) throws Exception;
}
