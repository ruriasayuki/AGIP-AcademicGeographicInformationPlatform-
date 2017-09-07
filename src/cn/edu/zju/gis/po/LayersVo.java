package cn.edu.zju.gis.po;

public class LayersVo {
    private Integer id;

    private String layername;

    private Integer userid;

    private String storelocation;

    private Boolean accessibility;

    private Integer type;

    private String datacontent;
    
    private String appendDataSrc;
    
    private String course;
    
    private int limit;
	private int offset;

	public String getCourse(){
		return course;
	}
	
	public void setCourse(String course){
		this.course = course;
	}
	
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}
	public int getOffset() {
		return offset;
	}
	public void setOffset(int offset) {
		this.offset = offset;
	}
    
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLayername() {
        return layername;
    }

    public void setLayername(String layername) {
        this.layername = layername == null ? null : layername.trim();
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getStorelocation() {
        return storelocation;
    }

    public String getAppendDataSrc() {
		return appendDataSrc;
	}

	public void setAppendDataSrc(String appendDataSrc) {
		this.appendDataSrc = appendDataSrc;
	}

	public void setStorelocation(String storelocation) {
        this.storelocation = storelocation == null ? null : storelocation.trim();
    }

    public Boolean getAccessibility() {
        return accessibility;
    }

    public void setAccessibility(Boolean accessibility) {
        this.accessibility = accessibility;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getDatacontent() {
        return datacontent;
    }

    public void setDatacontent(String datacontent) {
        this.datacontent = datacontent == null ? null : datacontent.trim();
    }
}