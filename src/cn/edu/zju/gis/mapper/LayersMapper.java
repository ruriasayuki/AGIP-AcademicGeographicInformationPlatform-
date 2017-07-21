package cn.edu.zju.gis.mapper;

import cn.edu.zju.gis.po.Layers;
import cn.edu.zju.gis.po.LayersExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface LayersMapper {
    int countByExample(LayersExample example);

    int deleteByExample(LayersExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(Layers record);
    
    int myinsert(Layers record);
    
    int insertSelective(Layers record);

    List<Layers> selectByExample(LayersExample example);

    Layers selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") Layers record, @Param("example") LayersExample example);

    int updateByExample(@Param("record") Layers record, @Param("example") LayersExample example);

    int updateByPrimaryKeySelective(Layers record);

    int updateByPrimaryKey(Layers record);
}