<template>
  <div id="app">
    <router-view v-if="IsRouterAlive" v-wechat-title="$route.meta.title"/>
  </div>
</template>
<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      IsRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.IsRouterAlive = false
      this.$nextTick(() => {
        this.IsRouterAlive = true
      })
    }
  }
}
</script>
<style lang="scss"></style>
