var layerTreeJson = [{
    "id": "layerFather",
    "text": "上层图层"
}];
function openChangeName(name) {
    $('#changeName').find('#nameForChange').val(name);
    $('#changeName').window('open');
}
function changeName() {
    $('#changeName').window('close');
    myMapMana.mapname = $('#changeName').find('#nameForChange').val();
    echartsoption.title.text = $('#changeName').find('#nameForChange').val();
    $('.accordion').find('.panel-header').find('.panel-title').html(myMapMana.mapname);
    redraw();
}

function initLayertree() {
    //
    $('.accordion').find('.panel-header').find('.panel-title').html(myMapMana.mapname);//not save TODO find a save way to change title name.
    // 
    $('.accordion').find('.panel-header').bind("contextmenu", function () {
        return false;
    });
    $('.accordion').find('.panel-header').mousedown(function (e) {
        console.log(e.which);
        //右键为3
        if (1 == e.which) {
            openChangeName(myMapMana.mapname);
            ;
        }
    });
    $("#layerTree").tree({
        dataType: "json",
        data: layerTreeJson,
        //是否显示复选框
        checkbox: function (node) {
            if (node.id == "layerFather") {
                return false;
            } else {
                return true;
            }
        },
        //DONE 一些情况下不允许拖动
        onBeforeDrop: function (target, source, point) {
            //Father不能被拖动
            if (source.id === 'layerFather') {
                return false;
            };
            //append：移动为子节点
            if (point === 'append') {
                //有些node不能添加子node，即不能拖图层到其他图层下级           
                var targetNode = $(this).tree('getNode', target);
                if (targetNode.type === 'layer') {
                    return false;
                };
                //图层不能移动到别的父节点下
                var parentNode = $(this).tree('getParent', source.target);
                if (parentNode.id != targetNode.id) {
                    return false;
                };
            }
            //point == 'top' OR 'bottom'：移动到目标节点的上/下方
            else {
                //Father中的节点不能被拖出去
                var targetNode = $(this).tree('getNode', target);
                if (targetNode.id === 'layerFather' || targetNode.id === 'intensityFather') {
                    return false;
                };
                //图层不能移动到别的父节点下
                var parentNodeS = $(this).tree('getParent', source.target);
                var parentNodeT = $(this).tree('getParent', target);
                if (parentNodeS.id != parentNodeT.id) {
                    return false;
                };
            }
        },
        //选中复选框后触发
        onCheck: function (node, checked) {
            onLayerCheck(node, checked);
        },
        //DONE 拖动结束放置好节点后触发
        onDrop: function (target, source, point) {
            var roots = $(this).tree('getRoots');
            nodeOrders = new Array();
            getOrders(roots);
            setLayerOverlay(nodeOrders);
        },
        //右键节点弹出菜单，用于删除图层
        onContextMenu: function (e, node) {
            e.preventDefault();
            // select the node
            $('#layerTree').tree('select', node.target);
            // display context menu
            $('#mm').menu('show', {
                left: e.pageX,
                top: e.pageY
            });
        }
    });
    for (var i = 0; i < myMapMana.maplayerlist.length; i++) {
        addTreeNode(myMapMana.maplayerlist[i]);
    }
}
//======================== 图层树节点操作 ========================//
//DONE 在图层树中添加新节点
function addTreeNode(layer) {
    //创建新节点
    var newLayer = {
        "id": layer.layerid,
        "text": layer.layername,
        "checked": layer.state,
        "type": layer.type
    };

    //如果是echarts图层
    if (newLayer.type > 0) {
        //假如图层树尚空，创建子节点数组容器
        if (layerTreeJson[0]["children"] == null) {
            layerTreeJson[0]["children"] = new Array();
        };

        layerTreeJson[0]["children"].unshift(newLayer);
    }

    else if (newLayer.type == 0) {
        if (layerTreeJson.length < 2) {
            var newFather = {
                "id": "layerFather",
                "text": "下层图层"
            };
            layerTreeJson.push(newFather);
        };
        //假如图层树尚空，创建子节点数组容器
        if (layerTreeJson[1]["children"] == null) {
            layerTreeJson[1]["children"] = new Array();
        };
        //插入新节点
        layerTreeJson[1]["children"].unshift(newLayer);
    };

    //刷新图层树
    $("#layerTree").tree({
        dataType: "json",
        data: layerTreeJson
    });
};

//DONE 在图层树中删除节点
function removeTreeNode(node, treeJson) {
    for (var i = treeJson.length - 1; i >= 0; i--) {
        if (treeJson[i].id == node.id) {
            treeJson.splice(i, 1);
            //有待重构 这里只删除分层设色图层的根节点是不是不太合适？ 不过总之功能实现的挺好
            if ((layerTreeJson.length > 1) && (layerTreeJson[1]["children"].length == 0)) {
                layerTreeJson.splice(1, 1);
            };
            //刷新图层树
            $("#layerTree").tree({
                dataType: "json",
                data: layerTreeJson
            });
            return;
        } else if (treeJson[i].children != null)
            removeTreeNode(node, treeJson[i].children);
    };
};


//====================== 图层树相关图层操作 ======================//
//DONE 添加图层后集中保存//layerpanel.js以及yukimap.js里面的相关函数取代
function addLayertoSilo(lname, ltype) {
    var newLayer = {
        name: lname,
        type: ltype,
        checked: true
    };
    layerSilo.push(newLayer);
};

//DONE 重绘所有被勾选的分层图//整合至yukimap的redraw函数
function redrawMapv() {
    for (var i = 0; i < layerSilo.length; i++) {
        if (layerSilo[i].checked == true) {
            for (var j = 0; j < layers.length; j++) {
                if (layers[j].options.name == layerSilo[i].name) {
                    var tmp = layers[j];
                    layers[j].destroy();
                    layers.splice(j, 1, new mapv.baiduMapLayer(bmap, tmp.dataSet, tmp.options));
                }
            };
        };
    };
};

//DONE 移除一个图层//need
function removeLayer() {
    var t = $('#layerTree');
    var node = t.tree('getSelected');
    for (var i = 0; i <= myMapMana.maplayerlist.length; i++) {
        if (myMapMana.maplayerlist[i].layerid == node.id) {
            if (myMapMana.maplayerlist[i].type == 0) {
                myMapMana.maplayerlist[i].mapv.destroy();
            }
            myMapMana.maplayerlist.splice(i, 1);
            break;
        }
    }
    removeTreeNode(node, layerTreeJson);
    redraw();
};

//DONE 图层树复选框控制图层显隐
function onLayerCheck(node, checked) {
    //获取图层类型('mapv' OR 'echarts')，并更新layerSilo
    var layerType;
    for (var i = myMapMana.maplayerlist.length - 1; i >= 0; i--) {
        if (myMapMana.maplayerlist[i].layerid == node.id) {
            layerType = myMapMana.maplayerlist[i].type;
            myMapMana.maplayerlist[i].state = checked;
            break;
        }
    };

    //去除部分代码为已经整合到yukimap的redraw里面了 (逻辑不太一样 所以用不上)
    redraw();

};

//DONE 保存图层顺序
var nodeOrders; //图层次序数组
function getOrders(roots) {
    for (var i = roots.length - 1; i >= 0; i--) {
        if (roots[i].children == null && roots[i].type > 0) {
            if (roots[i].checked == true)
                nodeOrders.push({
                    "id": roots[i].id,
                    "checked": 1
                });
            else
                nodeOrders.push({
                    "id": roots[i].id,
                    "checked": 0
                });
        } else if (roots[i].children != null) {
            getOrders(roots[i].children);
        }
    };
};

//DONE 更新图层叠放次序
var setLayerOverlay = function () {
    for (var i = myMapMana.maplayerlist.length - 1; i >= 0; i--) {
        for (var j = nodeOrders.length - 1; j >= 0; j--) {
            if (myMapMana.maplayerlist[i].layerid == nodeOrders[j].id) {
                myMapMana.maplayerlist[i].zIndex = j;
            }
        };
    };

    redraw();
    //重绘所有被勾选的分层图
    //
};


//修改样式弹出框
function changstyle() {
    var t = $('#layerTree');
    var node = t.tree('getSelected');
    $('#win').window('open'); // open a window
    for (var i = 0; i < myMapMana.maplayerlist.length; i++) {
        if (myMapMana.maplayerlist[i].layerid == node.id) {
            if (myMapMana.maplayerlist[i].type == 2) {//如果是点图
                var div = '<div style="margin:10px;"><br/><br/>点基本颜色： &ensp; &ensp;<input type="color" id="color1" /><br/><br/>点高亮颜色： &ensp; &ensp;<input type="color" id="color2" /><br/><br/>点样式 ：</span> &ensp; &ensp;<select id="pointStyle" class="easyui-combobox"><option value="1">无</option><option value="2">点</option><option value="3">箭头</option></select>' +
                    '</br></br>点大小：<input type="text" id="pointSize" value="' + myMapMana.maplayerlist[i].style.symbolSize + '">';
                $('#stylediv').html(div);
                $("#color1")[0].value = myMapMana.maplayerlist[i].style.itemStyle.normal.color;
                $("#color2")[0].value = myMapMana.maplayerlist[i].style.itemStyle.emphasis.color;
            }
            if (myMapMana.maplayerlist[i].type == 3) {//如果是轨迹图
                var div = '<div style="margin:10px;"><label><input type="radio" name="curvevalue" checked="checked" value="str"/>直线</label> <label><input type="radio" name="curvevalue" value="cur"/>曲线</label><br/><br/>轨迹起点颜色： &ensp; &ensp;<input type="color" id="color1" /><br/><br/>轨迹终点颜色： &ensp; &ensp;<input type="color" id="color2" /><br/><br/>轨迹方向点颜色  ： <input type="color" id="color3" /><br/>' +
                    '<br/><span>轨迹方向样式 ：</span> &ensp; &ensp;<select id="cBoxDirection" class="easyui-combobox"><option value="1">无</option><option value="2">点</option><option value="3">箭头</option></select>';
                $('#stylediv').html(div);
                $("#color1")[0].value = myMapMana.maplayerlist[i].style.lineStyle.normal.color.colorStops[0].color;
                $("#color2")[0].value = myMapMana.maplayerlist[i].style.lineStyle.normal.color.colorStops[1].color;
                $("#color3")[0].value = myMapMana.maplayerlist[i].style.effect.color;
                if (myMapMana.maplayerlist[i].style.effect.show == 'false')
                    $("#cBoxDirection").val("1");
                else {
                    if (myMapMana.maplayerlist[i].style.effect.symbol == 'pin')
                        $("#cBoxDirection").val("2");
                    else
                        $("#cBoxDirection").val("3");
                }
                if (myMapMana.maplayerlist[i].style.lineStyle.normal.curveness == 0) {
                    $('input:radio[name="curvevalue"][value="str"]').attr("checked", true);
                }
                else {
                    $('input:radio[name="curvevalue"][value="cur"]').attr("checked", true);
                }
            }
            if (myMapMana.maplayerlist[i].type == '0') {
                var div = '<div style="margin:10px;">最大值颜色：<input type="color" id="maxcolor" /><br/><br/>最小值颜色：<input type="color" id="mincolor" />';
                $('#stylediv').html(div);
                $("#mincolor")[0].value = myMapMana.maplayerlist[i].mapv.options.gradient['0'];
                $("#maxcolor")[0].value = myMapMana.maplayerlist[i].mapv.options.gradient['1.0'];
            }
            break;
        }
    }
}
//更改样式并保存
function savestyle() {
    var t = $('#layerTree');
    var node = t.tree('getSelected');
    for (var i = 0; i < myMapMana.maplayerlist.length; i++) {
        if (myMapMana.maplayerlist[i].layerid == node.id) {
            if (myMapMana.maplayerlist[i].type == '2') {
                myMapMana.maplayerlist[i].style.itemStyle.normal.color = $("#color1")[0].value;
                myMapMana.maplayerlist[i].style.itemStyle.emphasis.color = $("#color2")[0].value;
                myMapMana.maplayerlist[i].style.symbolSize = $('#pointSize').val();
            }
            if (myMapMana.maplayerlist[i].type == '3') {//判断是哪种图层类型
                var checkValue = $('input:radio[name="curvevalue"]:checked').val();
                if (checkValue == "str")
                    myMapMana.maplayerlist[i].style.lineStyle.normal.curveness = '0';
                else if (checkValue == "cur")
                    myMapMana.maplayerlist[i].style.lineStyle.normal.curveness = '0.15';
                myMapMana.maplayerlist[i].style.lineStyle.normal.color.colorStops[0].color = $("#color1")[0].value;
                myMapMana.maplayerlist[i].style.lineStyle.normal.color.colorStops[1].color = $("#color2")[0].value;
                myMapMana.maplayerlist[i].style.effect.color = $("#color3")[0].value;
                var show = $("#cBoxDirection").val();
                switch (show) {
                    case "1":
                        myMapMana.maplayerlist[i].style.effect.show = 'false';
                        myMapMana.maplayerlist[i].style.effect.symbol = 'none';
                        break;
                    case "2":
                        myMapMana.maplayerlist[i].style.effect.show = 'true';
                        myMapMana.maplayerlist[i].style.effect.symbol = 'pin';
                        break;
                    case "3":
                        myMapMana.maplayerlist[i].style.effect.show = 'true';
                        myMapMana.maplayerlist[i].style.effect.symbol = 'arrow';
                        break;
                }

            }
            if (myMapMana.maplayerlist[i].type == '0') {
                myMapMana.maplayerlist[i].mapv.options.gradient['0'] = $("#mincolor")[0].value;
                myMapMana.maplayerlist[i].mapv.options.gradient['1.0'] = $("#maxcolor")[0].value;
                //TODO drawLegend();
                myMapMana.maplayerlist[i].mapv.update({
                    options: {
                        gradient: {
                            '0': $("#mincolor")[0].value,
                            '1.0': $("#maxcolor")[0].value
                        }
                    }
                });
            }
            redraw();
            break;
        }
    }
}

function closewin() {
    $('#win').window('close');
}
