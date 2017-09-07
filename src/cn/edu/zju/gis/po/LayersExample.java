package cn.edu.zju.gis.po;

import java.util.ArrayList;
import java.util.List;

public class LayersExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public LayersExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andIdIsNull() {
            addCriterion("id is null");
            return (Criteria) this;
        }

        public Criteria andIdIsNotNull() {
            addCriterion("id is not null");
            return (Criteria) this;
        }

        public Criteria andIdEqualTo(Integer value) {
            addCriterion("id =", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotEqualTo(Integer value) {
            addCriterion("id <>", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThan(Integer value) {
            addCriterion("id >", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("id >=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThan(Integer value) {
            addCriterion("id <", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThanOrEqualTo(Integer value) {
            addCriterion("id <=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdIn(List<Integer> values) {
            addCriterion("id in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotIn(List<Integer> values) {
            addCriterion("id not in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdBetween(Integer value1, Integer value2) {
            addCriterion("id between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotBetween(Integer value1, Integer value2) {
            addCriterion("id not between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andLayernameIsNull() {
            addCriterion("layername is null");
            return (Criteria) this;
        }

        public Criteria andLayernameIsNotNull() {
            addCriterion("layername is not null");
            return (Criteria) this;
        }

        public Criteria andLayernameEqualTo(String value) {
            addCriterion("layername =", value, "layername");
            return (Criteria) this;
        }

        public Criteria andLayernameNotEqualTo(String value) {
            addCriterion("layername <>", value, "layername");
            return (Criteria) this;
        }

        public Criteria andLayernameGreaterThan(String value) {
            addCriterion("layername >", value, "layername");
            return (Criteria) this;
        }

        public Criteria andLayernameGreaterThanOrEqualTo(String value) {
            addCriterion("layername >=", value, "layername");
            return (Criteria) this;
        }

        public Criteria andLayernameLessThan(String value) {
            addCriterion("layername <", value, "layername");
            return (Criteria) this;
        }

        public Criteria andLayernameLessThanOrEqualTo(String value) {
            addCriterion("layername <=", value, "layername");
            return (Criteria) this;
        }

        public Criteria andLayernameLike(String value) {
            addCriterion("layername like", value, "layername");
            return (Criteria) this;
        }

        public Criteria andLayernameNotLike(String value) {
            addCriterion("layername not like", value, "layername");
            return (Criteria) this;
        }

        public Criteria andLayernameIn(List<String> values) {
            addCriterion("layername in", values, "layername");
            return (Criteria) this;
        }

        public Criteria andLayernameNotIn(List<String> values) {
            addCriterion("layername not in", values, "layername");
            return (Criteria) this;
        }

        public Criteria andLayernameBetween(String value1, String value2) {
            addCriterion("layername between", value1, value2, "layername");
            return (Criteria) this;
        }

        public Criteria andLayernameNotBetween(String value1, String value2) {
            addCriterion("layername not between", value1, value2, "layername");
            return (Criteria) this;
        }

        public Criteria andUseridIsNull() {
            addCriterion("userid is null");
            return (Criteria) this;
        }

        public Criteria andUseridIsNotNull() {
            addCriterion("userid is not null");
            return (Criteria) this;
        }

        public Criteria andUseridEqualTo(Integer value) {
            addCriterion("userid =", value, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridNotEqualTo(Integer value) {
            addCriterion("userid <>", value, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridGreaterThan(Integer value) {
            addCriterion("userid >", value, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridGreaterThanOrEqualTo(Integer value) {
            addCriterion("userid >=", value, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridLessThan(Integer value) {
            addCriterion("userid <", value, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridLessThanOrEqualTo(Integer value) {
            addCriterion("userid <=", value, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridIn(List<Integer> values) {
            addCriterion("userid in", values, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridNotIn(List<Integer> values) {
            addCriterion("userid not in", values, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridBetween(Integer value1, Integer value2) {
            addCriterion("userid between", value1, value2, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridNotBetween(Integer value1, Integer value2) {
            addCriterion("userid not between", value1, value2, "userid");
            return (Criteria) this;
        }

        public Criteria andStorelocationIsNull() {
            addCriterion("storelocation is null");
            return (Criteria) this;
        }

        public Criteria andStorelocationIsNotNull() {
            addCriterion("storelocation is not null");
            return (Criteria) this;
        }

        public Criteria andStorelocationEqualTo(String value) {
            addCriterion("storelocation =", value, "storelocation");
            return (Criteria) this;
        }

        public Criteria andStorelocationNotEqualTo(String value) {
            addCriterion("storelocation <>", value, "storelocation");
            return (Criteria) this;
        }

        public Criteria andStorelocationGreaterThan(String value) {
            addCriterion("storelocation >", value, "storelocation");
            return (Criteria) this;
        }

        public Criteria andStorelocationGreaterThanOrEqualTo(String value) {
            addCriterion("storelocation >=", value, "storelocation");
            return (Criteria) this;
        }

        public Criteria andStorelocationLessThan(String value) {
            addCriterion("storelocation <", value, "storelocation");
            return (Criteria) this;
        }

        public Criteria andStorelocationLessThanOrEqualTo(String value) {
            addCriterion("storelocation <=", value, "storelocation");
            return (Criteria) this;
        }

        public Criteria andStorelocationLike(String value) {
            addCriterion("storelocation like", value, "storelocation");
            return (Criteria) this;
        }

        public Criteria andStorelocationNotLike(String value) {
            addCriterion("storelocation not like", value, "storelocation");
            return (Criteria) this;
        }

        public Criteria andStorelocationIn(List<String> values) {
            addCriterion("storelocation in", values, "storelocation");
            return (Criteria) this;
        }

        public Criteria andStorelocationNotIn(List<String> values) {
            addCriterion("storelocation not in", values, "storelocation");
            return (Criteria) this;
        }

        public Criteria andStorelocationBetween(String value1, String value2) {
            addCriterion("storelocation between", value1, value2, "storelocation");
            return (Criteria) this;
        }

        public Criteria andStorelocationNotBetween(String value1, String value2) {
            addCriterion("storelocation not between", value1, value2, "storelocation");
            return (Criteria) this;
        }

        public Criteria andAccessibilityIsNull() {
            addCriterion("accessibility is null");
            return (Criteria) this;
        }

        public Criteria andAccessibilityIsNotNull() {
            addCriterion("accessibility is not null");
            return (Criteria) this;
        }

        public Criteria andAccessibilityEqualTo(Boolean value) {
            addCriterion("accessibility =", value, "accessibility");
            return (Criteria) this;
        }

        public Criteria andAccessibilityNotEqualTo(Boolean value) {
            addCriterion("accessibility <>", value, "accessibility");
            return (Criteria) this;
        }

        public Criteria andAccessibilityGreaterThan(Boolean value) {
            addCriterion("accessibility >", value, "accessibility");
            return (Criteria) this;
        }

        public Criteria andAccessibilityGreaterThanOrEqualTo(Boolean value) {
            addCriterion("accessibility >=", value, "accessibility");
            return (Criteria) this;
        }

        public Criteria andAccessibilityLessThan(Boolean value) {
            addCriterion("accessibility <", value, "accessibility");
            return (Criteria) this;
        }

        public Criteria andAccessibilityLessThanOrEqualTo(Boolean value) {
            addCriterion("accessibility <=", value, "accessibility");
            return (Criteria) this;
        }

        public Criteria andAccessibilityIn(List<Boolean> values) {
            addCriterion("accessibility in", values, "accessibility");
            return (Criteria) this;
        }

        public Criteria andAccessibilityNotIn(List<Boolean> values) {
            addCriterion("accessibility not in", values, "accessibility");
            return (Criteria) this;
        }

        public Criteria andAccessibilityBetween(Boolean value1, Boolean value2) {
            addCriterion("accessibility between", value1, value2, "accessibility");
            return (Criteria) this;
        }

        public Criteria andAccessibilityNotBetween(Boolean value1, Boolean value2) {
            addCriterion("accessibility not between", value1, value2, "accessibility");
            return (Criteria) this;
        }

        public Criteria andTypeIsNull() {
            addCriterion("type is null");
            return (Criteria) this;
        }

        public Criteria andTypeIsNotNull() {
            addCriterion("type is not null");
            return (Criteria) this;
        }

        public Criteria andTypeEqualTo(Integer value) {
            addCriterion("type =", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotEqualTo(Integer value) {
            addCriterion("type <>", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeGreaterThan(Integer value) {
            addCriterion("type >", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeGreaterThanOrEqualTo(Integer value) {
            addCriterion("type >=", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeLessThan(Integer value) {
            addCriterion("type <", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeLessThanOrEqualTo(Integer value) {
            addCriterion("type <=", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeIn(List<Integer> values) {
            addCriterion("type in", values, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotIn(List<Integer> values) {
            addCriterion("type not in", values, "type");
            return (Criteria) this;
        }

        public Criteria andTypeBetween(Integer value1, Integer value2) {
            addCriterion("type between", value1, value2, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotBetween(Integer value1, Integer value2) {
            addCriterion("type not between", value1, value2, "type");
            return (Criteria) this;
        }

        public Criteria andDatacontentIsNull() {
            addCriterion("datacontent is null");
            return (Criteria) this;
        }

        public Criteria andDatacontentIsNotNull() {
            addCriterion("datacontent is not null");
            return (Criteria) this;
        }

        public Criteria andDatacontentEqualTo(String value) {
            addCriterion("datacontent =", value, "datacontent");
            return (Criteria) this;
        }

        public Criteria andDatacontentNotEqualTo(String value) {
            addCriterion("datacontent <>", value, "datacontent");
            return (Criteria) this;
        }

        public Criteria andDatacontentGreaterThan(String value) {
            addCriterion("datacontent >", value, "datacontent");
            return (Criteria) this;
        }

        public Criteria andDatacontentGreaterThanOrEqualTo(String value) {
            addCriterion("datacontent >=", value, "datacontent");
            return (Criteria) this;
        }

        public Criteria andDatacontentLessThan(String value) {
            addCriterion("datacontent <", value, "datacontent");
            return (Criteria) this;
        }

        public Criteria andDatacontentLessThanOrEqualTo(String value) {
            addCriterion("datacontent <=", value, "datacontent");
            return (Criteria) this;
        }

        public Criteria andDatacontentLike(String value) {
            addCriterion("datacontent like", value, "datacontent");
            return (Criteria) this;
        }

        public Criteria andDatacontentNotLike(String value) {
            addCriterion("datacontent not like", value, "datacontent");
            return (Criteria) this;
        }

        public Criteria andDatacontentIn(List<String> values) {
            addCriterion("datacontent in", values, "datacontent");
            return (Criteria) this;
        }

        public Criteria andDatacontentNotIn(List<String> values) {
            addCriterion("datacontent not in", values, "datacontent");
            return (Criteria) this;
        }

        public Criteria andDatacontentBetween(String value1, String value2) {
            addCriterion("datacontent between", value1, value2, "datacontent");
            return (Criteria) this;
        }

        public Criteria andDatacontentNotBetween(String value1, String value2) {
            addCriterion("datacontent not between", value1, value2, "datacontent");
            return (Criteria) this;
        }

        public Criteria andAppenddatasrcIsNull() {
            addCriterion("appenddatasrc is null");
            return (Criteria) this;
        }

        public Criteria andAppenddatasrcIsNotNull() {
            addCriterion("appenddatasrc is not null");
            return (Criteria) this;
        }

        public Criteria andAppenddatasrcEqualTo(String value) {
            addCriterion("appenddatasrc =", value, "appenddatasrc");
            return (Criteria) this;
        }

        public Criteria andAppenddatasrcNotEqualTo(String value) {
            addCriterion("appenddatasrc <>", value, "appenddatasrc");
            return (Criteria) this;
        }

        public Criteria andAppenddatasrcGreaterThan(String value) {
            addCriterion("appenddatasrc >", value, "appenddatasrc");
            return (Criteria) this;
        }

        public Criteria andAppenddatasrcGreaterThanOrEqualTo(String value) {
            addCriterion("appenddatasrc >=", value, "appenddatasrc");
            return (Criteria) this;
        }

        public Criteria andAppenddatasrcLessThan(String value) {
            addCriterion("appenddatasrc <", value, "appenddatasrc");
            return (Criteria) this;
        }

        public Criteria andAppenddatasrcLessThanOrEqualTo(String value) {
            addCriterion("appenddatasrc <=", value, "appenddatasrc");
            return (Criteria) this;
        }

        public Criteria andAppenddatasrcLike(String value) {
            addCriterion("appenddatasrc like", value, "appenddatasrc");
            return (Criteria) this;
        }

        public Criteria andAppenddatasrcNotLike(String value) {
            addCriterion("appenddatasrc not like", value, "appenddatasrc");
            return (Criteria) this;
        }

        public Criteria andAppenddatasrcIn(List<String> values) {
            addCriterion("appenddatasrc in", values, "appenddatasrc");
            return (Criteria) this;
        }

        public Criteria andAppenddatasrcNotIn(List<String> values) {
            addCriterion("appenddatasrc not in", values, "appenddatasrc");
            return (Criteria) this;
        }

        public Criteria andAppenddatasrcBetween(String value1, String value2) {
            addCriterion("appenddatasrc between", value1, value2, "appenddatasrc");
            return (Criteria) this;
        }

        public Criteria andAppenddatasrcNotBetween(String value1, String value2) {
            addCriterion("appenddatasrc not between", value1, value2, "appenddatasrc");
            return (Criteria) this;
        }

        public Criteria andCourseIsNull() {
            addCriterion("course is null");
            return (Criteria) this;
        }

        public Criteria andCourseIsNotNull() {
            addCriterion("course is not null");
            return (Criteria) this;
        }

        public Criteria andCourseEqualTo(String value) {
            addCriterion("course =", value, "course");
            return (Criteria) this;
        }

        public Criteria andCourseNotEqualTo(String value) {
            addCriterion("course <>", value, "course");
            return (Criteria) this;
        }

        public Criteria andCourseGreaterThan(String value) {
            addCriterion("course >", value, "course");
            return (Criteria) this;
        }

        public Criteria andCourseGreaterThanOrEqualTo(String value) {
            addCriterion("course >=", value, "course");
            return (Criteria) this;
        }

        public Criteria andCourseLessThan(String value) {
            addCriterion("course <", value, "course");
            return (Criteria) this;
        }

        public Criteria andCourseLessThanOrEqualTo(String value) {
            addCriterion("course <=", value, "course");
            return (Criteria) this;
        }

        public Criteria andCourseLike(String value) {
            addCriterion("course like", value, "course");
            return (Criteria) this;
        }

        public Criteria andCourseNotLike(String value) {
            addCriterion("course not like", value, "course");
            return (Criteria) this;
        }

        public Criteria andCourseIn(List<String> values) {
            addCriterion("course in", values, "course");
            return (Criteria) this;
        }

        public Criteria andCourseNotIn(List<String> values) {
            addCriterion("course not in", values, "course");
            return (Criteria) this;
        }

        public Criteria andCourseBetween(String value1, String value2) {
            addCriterion("course between", value1, value2, "course");
            return (Criteria) this;
        }

        public Criteria andCourseNotBetween(String value1, String value2) {
            addCriterion("course not between", value1, value2, "course");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}