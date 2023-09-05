module.exports = {
    "pageHeader": {},
    "pageSearch": {
        "searchForm": [
            {
                "label": "区域选择",
                "type": "tree",
                "modelName": "regionCode",
                "initValue": "330000",
                "clearable": false
            },
            {
                "label": "单位名称",
                "type": "input",
                "modelName": "unitName",
                "clearable": true
            },
            {
                "label": "排查状态",
                "type": "select",
                "modelName": "objectStatus",
                "clearable": true,
                "optionLists": [
                    {
                        "typeName": "已排查",
                        "typeCode": "1"
                    },
                    {
                        "typeName": "未排查",
                        "typeCode": "2"
                    }
                ]
            },
            {
                "label": "排查类型",
                "type": "select",
                "modelName": "objectType",
                "clearable": false,
                "optionLists": "fromApi",
                "enumName":""
            },
            {
                "label": "排查日期",
                "type": "date",
                "dateType": "datetimerange",
                "modelName": "date",
                "clearable": true
            }
        ],
        "searchBtn": [
            {
                "label": "重置"
            },
            {
                "label": "查询",
                "type": "primary"
            }
        ]
    },
    "pageAction": {
        "left": [
            {
                "label": "添加",
                "icon": "h-icon-add",
                "event": "goCheckEnter"
            },
            {
                "label": "导出",
                "icon": "h-icon-export",
                "event": "goExport"
            }
        ],
        "right": []
    },
    "pageTable": {
        "hasPagination": true,
        "hasSelect": true,
        "needIndex": false,
        "tableColumn": [
            {
                "label": "单位名称",
                "width": "",
                "modelName": "unitName"
            },
            {
                "label": "人员姓名",
                "width": "",
                "modelName": "personName"
            },
            {
                "label": "行政区域",
                "width": "200",
                "modelName": "regionCode"
            }
        ],
        "operateColumn": [
            {
                "icon": "h-icon-edit",
                "event": "goEdit"
            },
            {
                "icon": "h-icon-details",
                "event": "goDetail"
            }
        ]
    }
}