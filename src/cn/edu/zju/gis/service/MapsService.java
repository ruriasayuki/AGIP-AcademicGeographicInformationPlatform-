package cn.edu.zju.gis.service;

import java.util.List;

import cn.edu.zju.gis.po.MapLayer;
import cn.edu.zju.gis.po.Maps;

public interface MapsService {
	public void createnewmap(Maps map) throws Exception;//need to rename 
	public Maps findMapById(int id) throws Exception;
	public void addLayerToMap(MapLayer twoid) throws Exception;
	public int insertMap(Maps map) throws Exception;
	public int insertMapLayer(MapLayer layer) throws Exception;
	public int updateMap(Maps map) throws Exception;
	public int updateMapLayer(MapLayer layer) throws Exception;
	public List<MapLayer> findMapLayerByMapId(int mapid) throws Exception;
	public List<Maps> getMapList() throws Exception;
	public int deleteMapLayer(MapLayer layer) throws Exception;
}
