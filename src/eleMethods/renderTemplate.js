
module.exports = function generateVueTemplate (json) {
    const pageSearch = getSearchTemplate(json.pageSearch)
    const pageAction = getActionTemplate(json.pageAction)
    const pageTable = getTableTemplate(json.pageTable)
    return `
        <h-page-container>
            <h-layout direction="vertical">
                <h-page-content>
                    ${pageSearch}
                    ${pageAction}
                    ${pageTable}
                </h-page-content>
            </h-layout>
        </h-page-container>
    `
}

function getSearchTemplate (json) {
    const searchForm = json.searchForm
    const searchBtn = json.searchBtn
    const searchItemTemplate = searchForm.map(item => {
        return searchItem(item)
    }).join('\n')
    const searchBtnTemplate = searchBtn.map(item => {
        return `
        <el-button type="${item.type || "default"}">${item.label}</el-button>
        `
    }).join('\n')
    return `
        <h-page-search ref="searchForm" :model="searchForm">
            ${searchItemTemplate}
            <template slot="pageSearchAction">
            ${searchBtnTemplate}
            </template>
        </h-page-search>
    `
}

function searchItem (item) {
    let fieldTemplate = ''
    switch (item.type) {
        case "tree":
            fieldTemplate = ``
            break
        case "input":
            fieldTemplate = `
            <el-input
                v-model.trim="searchForm.${item.modelName}"
                placeholder="请输入"
                ${item.clearable ? "clearable" : ''}
            ></el-input>
            `
            break
        case "select":
            fieldTemplate = `
            <el-select 
                v-model="searchForm.${item.modelName}"
                placeholder="请选择"
                ${item.clearable ? "clear" : ''}
            >
                <el-option
                    v-for="item in ${item.modelName}Dicts"
                    :key="item.typeCode"
                    :label="item.typeName"
                    :value="item.typeCode"
                ></el-option>
            </el-select>
            `
            break
        case "date": 
            fieldTemplate = `
            <el-date-picker
                v-model="searchForm.${item.modelName}"
                type="${item.dateType}"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
            />
            `
            break
    }
    return `
            <h-page-search-item label="${item.label}" prop="${item.modelName}">
                ${fieldTemplate}
            </h-page-search-item>
        `
}

function getActionTemplate (actionJson) {
    const { left, right } = actionJson
    const leftTemplate = left.map(item => {
        return `<el-button type="iconButton" icon="${item.icon}" @click="${item.event}">${item.label}</el-button>`
    }).join('\n')
    const rightTemplate = right.map(item => {
        return `<el-button type="iconButton" icon="${item.icon}" @click="${item.event}">${item.label}</el-button>`
    }).join('\n')
    return `
    <h-page-action>
        ${leftTemplate}
        ${right.length ? `
        <template slot="rightAction">
            ${rightTemplate}
        </template>
        ` : ""}
    </h-page-action>
    `
}

function getTableTemplate(tableJson) {
    const { hasPagination, hasSelect, needIndex, tableColumn, operateColumn } = tableJson
    const operateColumnTemplate = operateColumn.map(item => {
        return `<el-button type="iconButton" icon="${item.icon}" @click="${item.event}(row)"></el-button>`
    }).join('\n')
    const tableColumnTemplate = tableColumn.map(item => {
        return `
            <el-table-column label="${item.label}">
                <template slot-scope="{ row }">
                    {{checkEmpty(row.${item.modelName})}}
                </template>
            </el-table-column>
        `
    }).join('\n')
    const tableContent = `
        <el-table
            v-loading="tableLoading"
            :data="tableData"
            :height="tableHeight"
            show-overflow-title
            stripe
            force-scroll-"horizontal"
            ${hasSelect ? '@selection-change="selectionChange"' : ""}
        >
        ${hasSelect ? '<el-table-column type="selection"></el-table-column>' : ""}
        ${needIndex ? `
        <el-table-column prop="devId" label="序号" show-overflow-tooltip width="60">
            <template v-slot="{ $index }">
                {{ $index + 1 + pageSize * (page - 1) }}
            </template>
        </el-table-column>
        `: ""}
        ${tableColumnTemplate}
        ${operateColumn.length ? `
            <el-table-column label="操作">
                <template slot-scope="{ row }">
                    ${operateColumnTemplate}
                </template>
            </el-table-column>
        ` : ''}
        </el-table>
    `
    return hasPagination ? `
    <h-page-table>
        ${tableContent}
        <el-pagination
            slot="pagination"
            @size-change="sizeChange"
            @current-change="currentChange"
            :current-page="page"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        ></el-pagination>
    </h-page-table>
    ` : tableContent
}