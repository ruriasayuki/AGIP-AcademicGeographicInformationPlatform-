package cn.edu.zju.gis.service;

import cn.edu.zju.gis.po.MapLayer;
import cn.edu.zju.gis.po.Maps;

public interface MapsService {
	public void createnewmap(Maps map) throws Exception;//need to rename 
	public Maps findMapById(int id) throws Exception;
	public void addLayerToMap(MapLayer twoid) throws Exception;
}
