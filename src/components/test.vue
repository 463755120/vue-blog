<template>
    <div class="markdown">
        <markdown-editor v-model="content"></markdown-editor>
    </div>
</template>

<script>
    import markdownEditor from 'vue-simplemde/src/markdown-editor';
    export default {
        components: { markdownEditor },
        data() {
            return {
                content: '',
                configs: {}
            };
        }
    }
</script>

<style scoped>
  .markdown{
      width: 60%;
      margin: 0 auto;
  }
</style>
