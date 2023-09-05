<template>
    <div class="code-container">
        <highlightjs
        :code="code"
    />
    </div>
</template>            

<script>
import { ipcRenderer } from 'electron';

export default {
 name: 'CodePanel',
 data () {
  return {
    code: ''
   }
  },
  mounted () {
    this.$nextTick(() => {
        ipcRenderer.on('setCode', this.getCode)
    })
  },
 methods: {
    getCode (ev, code) {
        this.code = `${code}`
    }
 }
}
</script>

<style lang='scss'>
    .code-container {
        width: 600px;
        height: calc(100vh - 24px);
        overflow-y: auto;
        .code-wrap {
            height: 100%;
        }
        pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#ddd;background:#303030}.hljs-keyword,.hljs-link,.hljs-literal,.hljs-section,.hljs-selector-tag{color:#fff}.hljs-addition,.hljs-attribute,.hljs-built_in,.hljs-bullet,.hljs-name,.hljs-string,.hljs-symbol,.hljs-template-tag,.hljs-template-variable,.hljs-title,.hljs-type,.hljs-variable{color:#d88}.hljs-comment,.hljs-deletion,.hljs-meta,.hljs-quote{color:#979797}.hljs-doctag,.hljs-keyword,.hljs-literal,.hljs-name,.hljs-section,.hljs-selector-tag,.hljs-strong,.hljs-title,.hljs-type{font-weight:700}.hljs-emphasis{font-style:italic}
    }
</style>
