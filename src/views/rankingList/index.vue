<template>
  <div class="warpper">
    <div class="listAllTop">
      <p class="listAllTopP" v-for="item in listTop" :key="item.value">{{ item.value }}</p>
    </div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="pullRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check='true' :offset='30'>
        <div v-for="(item, index) in dataList" :key="index" class="wanListP">
          <p class="wanListPs">{{ index + 1 }}</p>
          <p class="wanListPs">{{ item.name }}</p>
          <p class="wanListPs">{{ item.num }}</p>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import defaultSettings from '@/config'
import { loginService } from '@/service/loginService'
export default {
  data() {
    return {
      refreshing: false,
      loading: false,
      finished: false,
      dataList: [],
      listTop: [{
        value: '序 列'
      }, {
        value: '姓 名'
      }, {
        value: '场 次'
      }],
      page: {
        pageNum: 1,
        pageSize: 20
      }
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
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        if (this.refreshing) {
          this.dataList = [];
          this.refreshing = false;
        }
        this.getSummitsTop()
        // 加载状态结束
        this.loading = true
      }, 500)
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      this.dataList = [];
      this.page.pageNum = 1
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    // 查询排名
    getSummitsTop() {
      loginService.getSummitsTop({
        pageNo: this.page.pageNum,
        pageSize: this.page.pageSize
      }).then(res => {
        console.log('res+++++++++++++++++++++++++', res)
        this.loading = false;
        this.dataList = this.dataList.concat(res.data.datas.datas)
        this.page.pageNum++
        if(this.page.pageNum > res.data.datas.totalPage) {
          this.finished = true
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.warpper{
  width: 100%;
  position: relative;
  .listAllTop{
    width: 100%;
    display: flex;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
    background-color: white;
    .listAllTopP{
      flex: 1;
      text-align: center;
      overflow: hidden;
      color: #333333;
    }
  }
  .pullRefresh{
    margin-top: 40px;
    box-sizing: border-box;
  }
  .van-cell{
    text-align: center;
    .van-cell__value{
      text-align: center;
    }
  }
  .wanListP{
    width: 100%;
    display: flex;
    .wanListPs{
      flex: 1;
      text-align: center;
    }
  }
}

</style>
