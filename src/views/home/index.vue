<template>
  <div class="warpper">
    <van-search v-model="value" shape="round" background="#4fc08d" @search="getSummits" placeholder="请输入名称/手机号" />
    <div class="content">
      <template v-for="(item, index) in data">
        <van-cell title="姓名" :value="item.name" v-if="index == (data.length - 1)"/>
        <van-cell title="公司" :value="item.company" v-if="index == (data.length - 1)"/>
        <van-cell title="参与" :value="sessions" v-if="index == (data.length - 1)"/>
        <van-cell title="共计" :value="data.length + '次'" v-if="index == (data.length - 1)"/>
      </template>
    </div>
  </div>
</template>

<script>

import {loginService} from '@/service/loginService'
import defaultSettings from '@/config'

export default {

  data() {
    return {
      value: '',
      sessions: '',
      data: []
    }
  },

  computed: {},
  mounted() {
    this.$nextTick(() => {
      const share = {
        hasGet: true,
        title: '运联峰会十年回忆',
        url: defaultSettings.baseUrl + '/home',
        imageUrl: 'https://resource.wetuc.com/g/img/logo3.jpg'
      }
      loginService.getWxJssdk().then(res => {
        loginService.getWxShare(share, share.title, true)
      })
    })
  },




  methods: {
    getSummits() {
      loginService.getSummits({
        param: this.value,
        company: this.value
      }).then(res => {
        this.sessions = ''
        this.data = res.data.datas.his.length > 0 ? res.data.datas.his : res.data.datas.companies
        this.data.forEach(item => {
          this.sessions += item.year + '年峰会,'
        })
        this.sessions = this.sessions.substring(0, this.sessions.lastIndexOf(','))
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

