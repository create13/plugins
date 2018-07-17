import Vue from 'vue';
import wx from 'weixin-js-sdk';

export default {
    init: jsApiList =>
        new Promise(resolve =>
            Vue.http
                .get('mp/getToken', {
                    params: {
                        href: location.href.split('#')[0]
                    }
                })
                .then(result => {
                    wx.config({
                        //debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: result.data.appid, // 必填，公众号的唯一标识
                        timestamp: result.data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: result.data.nonceStr, // 必填，生成签名的随机串
                        signature: result.data.signature, // 必填，签名
                        jsApiList: ['checkJsApi'].concat(jsApiList || []) // 必填，需要使用的JS接口列表
                    });
                    wx.ready(() => {
                        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                        wx.checkJsApi({
                            jsApiList: jsApiList || [], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                            success: res => {
                                // 以键值对的形式返回，可用的api值true，不可用为false
                                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                                resolve(wx);
                            }
                        });
                    });
                    wx.error(res => {
                        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                        console.warn('微信JS SDK配置错误！', res);
                    });
                })
        )
};
