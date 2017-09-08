package cn.edu.zju.gis.service;

import java.util.List;

import cn.edu.zju.gis.po.MapLayer;
import cn.edu.zju.gis.po.Maps;
import cn.edu.zju.gis.po.MapsVo;

public interface MapsService {
	public Maps findMapById(int id) throws Exception;
	
	public int insertMap(Maps map) throws Exception;
	
	public int insertMapLayer(MapLayer layer) throws Exception;
	
	public int updateMap(Maps map) throws Exception;
	
	public int updateMapLayer(MapLayer layer) throws Exception;
	
	public List<MapLayer> findMapLayerByMapId(int mapid) throws Exception;
	
	public List<Maps> getMapList() throws Exception;
	
	public List<Maps> getMapList2(MapsVo querymap) throws Exception;
	
	public int deleteMapLayer(MapLayer layer) throws Exception;
	
	public int deleteMapById(int id) throws Exception;
	
	public int countMaps(MapsVo querymap) throws Exception;
	
	public int banMap(int id) throws Exception;
	
	public int passMap(int id) throws Exception;
	
	public int openMap(MapsVo querymap) throws Exception;
	
	public int closeMap(MapsVo querymap) throws Exception;
	
	public List<Maps> getMapListForIndex(MapsVo querymap) throws Exception;
}
