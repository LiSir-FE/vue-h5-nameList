import axios from 'axios'
import { tl } from '../mixin/tool'
import qs from 'qs'
import wx from 'weixin-jsapi'
import store from '@/store'

axios.defaults.baseURL = 'http://api.tucmedia.com'
export const loginService = {
  api: {},
  /* 查询 */
  getSummits: function(params) {
    return axios.get('/summits' + tl.getParam(params))
  },
  /* 查询排行 */
  getSummitsTop: function(params) {
    return axios.get('/summits/top' + tl.getParam(params))
  },
  /* 分享成功 */
  // shares: function (params) {
  //   return axios.post('/shares' + tl.getParam(params))
  // },
  getWxJssdk: function () {
    let url
    if (typeof localStorage != 'undefined') url = encodeURIComponent(window.location.href.split('#')[0])
    let p = new Promise(function (resolve, reject) {
      axios.get('/wxconfig?url=' + url).then(function (res) {
        let temp = res.data.datas
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: temp.appId, // 必填，公众号的唯一标识
          timestamp: temp.wxTimestamp + '', // 必填，生成签名的时间戳
          nonceStr: temp.wxNoncestr + '', // 必填，生成签名的随机串
          signature: temp.wxSignature, // 必填，签名，见附录1
          jsApiList: [
            'updateAppMessageShareData', 'updateTimelineShareData', 'checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord', 'onRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice',
            'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow',
            'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard'
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
        wx.ready(function () {
          resolve(wx)
        });
        // wx.error(function(error){
        //   alert(JSON.stringify(error) + ";url=" + url);
        // })
        wx.checkJsApi({
          jsApiList: [
            'updateAppMessageShareData', 'updateTimelineShareData', 'checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord', 'onRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice',
            'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow',
            'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard'
          ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
          success: function (res) {
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
          }
        });
      })
    });
    return p;
  },
  getWxShare: function (params, title, flag, parms) {
    const that = this
    // if(typeof localStorage!='undefined' && params) params.url =window.location.href
    // alert(window.location.href)
    if (params.hasGet) {
      let appShare = {
        title: params.title || title,
        imageUrl: params.imageUrl ? params.imageUrl : 'https://www.wetuc.com/src/assets/image/logo.jpg',
        // imageUrl: '',
        brief: params.brief || '物流知识登顶之战',
        url: params.url || window.location.href.split('#')[0]
      }
      setTimeout(function () {
        that.wxShare(appShare, title, flag, parms)
      }, 200)
      return;
    }
    axios.get('/shares/' + tl.getParam(params)).then(function (res) {
      let appShare
      if (res.data && res.data.datas) {
        /*
    * 返回参数
    * dataUrl；desc；imgUrl；link；shareType
    * title；type；typeId
    * */
        appShare = {
          title: res.data.datas.title || title,
          imageUrl: res.data.datas.imgUrl ? res.data.datas.imgUrl : 'https://www.wetuc.com/src/assets/image/logo.jpg',
          // imageUrl: '',
          brief: res.data.datas.desc || '物流知识登顶之战',
          url: res.data.datas.dataUrl || window.location.href
        }
        // console.log('share',res.data.datas);
      } else {
        appShare = {
          title: title,
          imageUrl: null,
          brief: null,
          url: params.url
        }
      }
      that.wxShare(appShare, title, flag, parms)
    })
  },
  wxShare: function (shareInfo, title, flag, parms) {
    // alert(shareInfo.title)
    // console.log(title);
    //分享到朋友圈
    wx.onMenuShareTimeline({
      title: shareInfo.title, // 分享标题
      link: shareInfo.url, // 分享链接
      imgUrl: shareInfo.imageUrl, // 分享图标
      success: function(res) {
        console.log('分享成功至朋友圈+++++++++++++++++++++++++++++++++++++++++', res)
        // 用户确认分享后执行的回调函数
      },
      cancel: function() {
        // 用户取消分享后执行的回调函数
      },
      trigger: function() {
        // console.log(shareInfo)
        // 用户取消分享后执行的回调函数
      }
    });
    //分享给好友
    wx.onMenuShareAppMessage({
      title: shareInfo.title, // 分享标题
      link: shareInfo.url, // 分享链接
      imgUrl: shareInfo.imageUrl, // 分享图标
      success: function(res) {
        console.log('分享成功至好友+++++++++++++++++++++++++++++++++++++++++', res)
        // 用户确认分享后执行的回调函数
        // alert('分享设置成功：'+shareInfo.brief)
      },
      cancel: function() {
        // 用户取消分享后执行的回调函数
      },
      trigger: function() {
        // console.log(shareInfo)
        // 用户取消分享后执行的回调函数
      }
    });
    /*wx.onMenuShareAppMessage({
        title: 'test', // 分享标题
        desc: 'test', // 分享描述
        link: window.location.href, // 分享链接
        imgUrl: '', // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });*/
    //分享到QQ
    wx.onMenuShareQQ({
      title: shareInfo.title, // 分享标题
      desc: shareInfo.brief, // 分享描述
      link: shareInfo.url, // 分享链接
      imgUrl: shareInfo.imageUrl, // 分享图标
      success: function() {
        // 用户确认分享后执行的回调函数
      },
      cancel: function() {
        // 用户取消分享后执行的回调函数
      }
    });
    //分享到微博
    wx.onMenuShareWeibo({
      title: shareInfo.title, // 分享标题
      desc: shareInfo.brief, // 分享描述
      link: shareInfo.url, // 分享链接
      imgUrl: shareInfo.imageUrl, // 分享图标
      success: function() {
        // 用户确认分享后执行的回调函数
      },
      cancel: function() {
        // 用户取消分享后执行的回调函数
      }
    });
    //分享到QQ空间
    wx.onMenuShareQZone({
      title: shareInfo.title, // 分享标题
      desc: shareInfo.brief, // 分享描述
      link: shareInfo.url, // 分享链接
      imgUrl: shareInfo.imageUrl, // 分享图标
      success: function() {
        // 用户确认分享后执行的回调函数
      },
      cancel: function() {
        // 用户取消分享后执行的回调函数
      }
    });
  }
}
