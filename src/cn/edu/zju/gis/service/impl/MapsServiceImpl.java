package cn.edu.zju.gis.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import cn.edu.zju.gis.mapper.MapsMapper;
import cn.edu.zju.gis.po.MapLayer;
import cn.edu.zju.gis.po.Maps;
import cn.edu.zju.gis.po.MapsVo;
import cn.edu.zju.gis.service.MapsService;

public class MapsServiceImpl implements MapsService{

	@Autowired
	private MapsMapper mapsMapper;
	


	@Override
	public Maps findMapById(int id) throws Exception {
		Maps map = mapsMapper.findMapById(id);
		return map;
	}


	@Override
	public int insertMap(Maps map) throws Exception {
		int i = mapsMapper.insertMap(map);
		return i;
	}
	@Override
	public int insertMapLayer(MapLayer layer) throws Exception {
		int i = mapsMapper.insertMapLayer(layer);
		return i;
	}
	@Override
	public int updateMap(Maps map) throws Exception {
		int i = mapsMapper.updateMap(map);
		return i;
	}
	@Override
	public int updateMapLayer(MapLayer layer) throws Exception {
		int i = mapsMapper.updateMapLayer(layer);
		return i;
	}

	@Override
	public List<MapLayer> findMapLayerByMapId(int mapid) throws Exception {
		List<MapLayer> result = mapsMapper.findMapLayerByMapId(mapid);
		return result;
	}

	@Override
	public List<Maps> getMapList() throws Exception {
		List<Maps> result = mapsMapper.findMaps();
		return result;
	}

	@Override
	public int deleteMapLayer(MapLayer layer) throws Exception {
		int i = mapsMapper.deleteMapLayer(layer);
		return i;
	}

	@Override
	public List<Maps> getMapList2(MapsVo querymap) throws Exception {
		List<Maps> result = mapsMapper.findMaps2(querymap);
		return result;
	}

	@Override
	public int countMaps(MapsVo querymap) throws Exception {
		int count = mapsMapper.countMaps(querymap);
		return count;
	}


	@Override
	public int banMap(int id) throws Exception {
		MapsVo querymap = new MapsVo();
		querymap.setId(id);
		querymap.setAddable(0);
		mapsMapper.changeAddable(querymap);
		return 0;
	}


	@Override
	public int passMap(int id) throws Exception {
		MapsVo querymap = new MapsVo();
		querymap.setId(id);
		querymap.setAddable(1);
		mapsMapper.changeAddable(querymap);
		return 0;
	}
	
	@Override
	public int openMap(MapsVo querymap) throws Exception {
		querymap.setAccessibility(1);
		mapsMapper.changeAccessibility(querymap);
		return 0;
	}


	@Override
	public int closeMap(MapsVo querymap) throws Exception {	
		querymap.setAccessibility(0);
		mapsMapper.changeAccessibility(querymap);
		return 0;
	}


	@Override
	public List<Maps> getMapListForIndex(MapsVo querymap) throws Exception {
		return mapsMapper.getShortList(querymap);
		
	}


	@Override
	public int deleteMapById(int id) throws Exception {
		return mapsMapper.deleteMapById(id);
	}
}
