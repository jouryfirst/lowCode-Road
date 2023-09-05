<template>
  <div class="home-container is-flex">
    <form-panel></form-panel>
    <code-panel></code-panel>
  </div>
</template>

<script>
import FormPanel from './FormPanel.vue';
import CodePanel from './CodePanel.vue';
export default {
  name: "HomePage",
  components: {
    FormPanel,
    CodePanel
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped lang='scss'>
.home-container {
  padding: 8px;
}
</style>
