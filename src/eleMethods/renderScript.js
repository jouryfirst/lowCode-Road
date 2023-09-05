module.exports = function generateVueScript (form) {
    const importTemplate = ''
    const data = getDataRender(form)
    console.log('12',data)
    return `
        ${importTemplate}

        export default {
            name: 'listPage',
            mixins: [getTableDatMixin],
            ${data},
            created () {
                this.getDictsData()
                this._getTableData()
            },
            methods: {
                
            }
        }
    `
}

function getDataRender (form) {
    let searchFormObj = {}
    let optionDicts = {}
    // let dictsTemplate = ''
    form.forEach(element => {
        if (['select', 'date'].includes(element.type)) {
            searchFormObj[element.modelName] = []
            optionDicts[`${element.modelName}Dicts`] = []
            // dictsTemplate += `${element.modelName}Dicts: []\n`
        } else {
            searchFormObj[element.modelName] = element.initValue || ''
        } 
    });
    const paginationObj = {
        page: 1,
        pageSize: 20,
        total: 0,
        pageSizes: [10, 20, 50, 100]
    }
    const dataCb = {
        searchForm: searchFormObj,
        ...optionDicts
    }
    return `
    data () {
        return ${JSON.stringify(dataCb)}
    }
    `
}

function getMethodsRender (arrayItem) {
    arrayItem.forEach(item => {

    })
}