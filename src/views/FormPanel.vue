<template>
  <div class="form-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="面包屑" name="pageHeader">
          <div class="page-header-wrap">
            <div
              class="header-item-wrap is-flex flex-center flex-between"
              v-for="(crumb, index) in form.pageHeader"
              :key="index"
            >
              <el-form-item
                :label="`面包屑${index + 1}`"
                :prop="'pageHeader.' + index + '.value'"
                :rules="{
      required: true, message: '此项必填', trigger: 'blur'
    }"
              >
                <el-input v-model="crumb.value"></el-input>
              </el-form-item>
              <el-button
                style="margin-bottom: 22px;"
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteHeaderItem(index)"
                circle
              ></el-button>
            </div>
          </div>

          <div class="add-btn is-flex flex-center" @click="addHeaderItem">
            <i class="el-icon-plus"></i>
            <span class="text">({{form.pageHeader.length}}/5)</span>
          </div>
        </el-collapse-item>
        <el-collapse-item title="搜索栏" name="pageSearch">
          <div class="page-search-wrap">
            <div
              class="search-item-wrap"
              v-for="(searchItem, index) in form.pageSearch"
              :key="index"
            >
              <div class="title is-flex flex-center">
                <div class="text">筛选项{{ index + 1 }}</div>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="deleteSearchItem(index)"
                  circle
                ></el-button>
              </div>
              <el-form-item
                label="名称"
                :prop="'pageSearch.' + index + '.label'"
                :rules="{
      required: true, message: '此项必填', trigger: 'blur'
    }"
              >
                <el-input v-model="searchItem.label"></el-input>
              </el-form-item>
              <el-form-item label="类型" :prop="'pageSearch.' + index + '.type'">
                <el-select v-model="searchItem.type" placeholder="请选择">
                  <el-option
                    v-for="item in searchTypeOptions"
                    :key="item.typeCode"
                    :label="item.typeName"
                    :value="item.typeCode"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="字段名称"
                :prop="'pageSearch.' + index + '.modelName'"
                :rules="{
      required: true, message: '此项必填', trigger: 'blur'
    }"
              >
                <el-input v-model="searchItem.modelName"></el-input>
              </el-form-item>
              <el-form-item label="初始值" :prop="'pageSearch.' + index + '.initValue'">
                <el-input v-model="searchItem.initValue"></el-input>
              </el-form-item>
            </div>
            <div class="add-btn" @click="addSearchItem">
              <i class="el-icon-plus"></i>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="工具栏" name="pageAction">
            <div class="page-action-wrap">
            <div class="action-item-wrap" v-for="(actionItem, index) in form.pageAction" :key="index">
              <div class="title is-flex flex-center">
                <div class="text">工具栏{{ index + 1 }}</div>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="deleteActionItem(index)"
                  circle
                ></el-button>
              </div>
              <el-form-item
                label="名称"
                :prop="'pageAction.' + index + '.label'"
                :rules="{
      required: true, message: '此项必填', trigger: 'blur'
    }"
              >
                <el-input v-model="actionItem.label"></el-input>
              </el-form-item>
              <el-form-item
                label="图标"
                :prop="'pageAction.' + index + '.icon'"
                :rules="{
      required: true, message: '此项必填', trigger: 'blur'
    }"
              >
                <el-input v-model="actionItem.icon"></el-input>
              </el-form-item>
              <el-form-item label="事件名称" :prop="'pageAction.' + index + '.event'">
                <el-input v-model="actionItem.event"></el-input>
              </el-form-item>
              <el-form-item label="在右侧" :prop="'pageAction.' + index + '.right'">
                <el-switch v-model="actionItem.right"></el-switch>
              </el-form-item>
            </div>
            <div class="add-btn" @click="addActionItem">
              <i class="el-icon-plus"></i>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="表格" name="pageTable">
            <el-form-item label="是否有分页" label-width="120px">
                <el-switch v-model="form.hasPagination"></el-switch>
            </el-form-item>
            <el-form-item label="是否可多选" label-width="120px">
                <el-switch v-model="form.hasSelect"></el-switch>
            </el-form-item>
            <el-form-item label="展示序号列" label-width="120px">
                <el-switch v-model="form.needIndex"></el-switch>
            </el-form-item>
          <div class="page-table-wrap">
            <div class="table-item-wrap" v-for="(tableItem, index) in form.pageTable" :key="index">
              <div class="title is-flex flex-center">
                <div class="text">表格列{{ index + 1 }}</div>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="deleteTableItem(index)"
                  circle
                ></el-button>
              </div>
              <el-form-item
                label="名称"
                :prop="'pageTable.' + index + '.label'"
                :rules="{
      required: true, message: '此项必填', trigger: 'blur'
    }"
              >
                <el-input v-model="tableItem.label"></el-input>
              </el-form-item>
              <el-form-item
                label="字段名称"
                :prop="'pageTable.' + index + '.modelName'"
                :rules="{
      required: true, message: '此项必填', trigger: 'blur'
    }"
              >
                <el-input v-model="tableItem.modelName"></el-input>
              </el-form-item>
              <el-form-item label="宽度" :prop="'pageTable.' + index + '.width'">
                <el-input v-model="tableItem.width"></el-input>
              </el-form-item>
            </div>
            <div class="add-btn" @click="addTableItem">
              <i class="el-icon-plus"></i>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <el-button type="primary" round class="submit-btn" @click="submit">生 成</el-button>
    </el-form>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
import { SEARCH_TYPE_DICTS } from "./dicts";
export default {
  name: "FormPanel",
  data() {
    return {
      form: {
        pageHeader: [
          {
            value: ""
          }
        ],
        pageSearch: [{ label: "", type: "input", modelName: "", initValue: "" }],
        pageAction: [{label: "", icon: "", event: ""}],
        hasPagination: true,
              hasSelect: false,
              needIndex: false,
        pageTable: [{ label: "", modelName: "", width: "" }]
      },
      activeName: "pageHeader",
      searchTypeOptions: SEARCH_TYPE_DICTS
    };
  },
  methods: {
    addHeaderItem() {
      if (this.form.pageHeader.length >= 5) {
        return;
      }
      this.form.pageHeader.push({ value: "" });
    },
    deleteHeaderItem(index) {
      this.form.pageHeader.splice(index, 1);
    },
    addSearchItem() {
      this.form.pageSearch.push({
        label: "",
        type: "input",
        modelName: "",
        initValue: ""
      });
    },
    deleteSearchItem(index) {
      this.form.pageSearch.splice(index, 1);
    },
    addActionItem() {
      this.form.pageAction.push({ label: "", modelName: "", width: "" });
    },
    deleteActionItem(index) {
      this.form.pageAction.splice(index, 1);
    },
    addTableItem() {
      this.form.pageTable.push({ label: "", modelName: "", width: "" });
    },
    deleteTableItem(index) {
      this.form.pageTable.splice(index, 1);
    },
    submit() {
      this.$refs.form.validate(flag => {
        if (flag) {
          const panelData = {
            pageHeader: this.form.pageHeader.map(item => item.value),
            pageSearch: {
              searchForm: this.form.pageSearch,
        searchBtn: [
            {
                label: "重置"
            },
            {
                label: "查询",
                type: "primary"
            }
        ]
            },
            pageAction: {
                left: this.form.pageAction.filter(item => !item.isRight),
                right: this.form.pageAction.filter(item => item.isRight)
            },
            pageTable: {
              hasPagination: this.form.hasPagination,
              hasSelect: this.form.hasSelect,
              needIndex: this.form.needIndex,
              tableColumn: this.form.pageTable,
        operateColumn: [
            {
                icon: "h-icon-edit",
                event: "goEdit"
            },
            {
                icon: "h-icon-details",
                event: "goDetail"
            }
        ]
            }
          };
          // const jsonData = JSON.stringify(panelData)
          ipcRenderer.send('getJson', panelData)
        } else {
          this.$message.error("有必填项未填，请检查");
        }
      });
    }
  }
};
</script>

<style scoped lang='scss'>
.form-container {
  width: 400px;
  height: calc(100vh - 24px);
  overflow-y: auto;
  ::v-deep .el-input {
    width: 240px;
  }
  .add-btn {
    border: 1px dashed rgba(0, 0, 0, 0.7);
    cursor: pointer;
    text-align: center;
    line-height: 34px;
    font-size: 24px;
    &:hover {
      background-color: #66b1ff;
      color: #ffffff;
    }
    &.is-flex {
      justify-content: center;
      .text {
        font-size: 16px;
        margin-left: 12px;
      }
    }
  }
  .page-search-wrap,.page-action-wrap,.page-table-wrap {
    padding: 4px;
    .search-item-wrap {
      padding: 12px;
      background-color: #fafafa;
      border: 1px solid #ebe8e8;
      margin-bottom: 8px;
    }
    .title {
      justify-content: center;
      margin-bottom: 12px;
      .text {
        margin-right: 12px;
      }
    }
  }
  .submit-btn {
    position: absolute;
    width: 240px;
    bottom: 12px;
    left: 80px;
  }
}
</style>
