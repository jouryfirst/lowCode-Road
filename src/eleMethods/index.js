const generateVueTemplate  = require('./renderTemplate.js')
const generateVueScript = require('./renderScript.js')

function getArraySearch (json) {
    const { pageSearch } = json
    const dicts = pageSearch.searchForm.filter(item => ['select', 'date'].includes(item.type)).map(item => item.modelName)
    return dicts
}



module.exports =  function renderPage (json) {
    const arrayItem = getArraySearch(json)
    const template = generateVueTemplate(json)
    const script = generateVueScript(json.pageSearch.searchForm, arrayItem)
    return `
    <template>
        ${template}
    </template>

    ${script}
    `
}