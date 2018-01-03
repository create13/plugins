const app=getApp();
const first=require("../modules/first")
console.log(first.num)
first.num = 1000;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // me:app.mydata
    myid:"v1",
    me:{
      name: "leo1",
      age: '21'
    },
    arr:[{name:"leo"}],
    info:{group:"javascript",tag:"node.js"}

  },
  changeColor(){
   let color= this.data.myid==="red" ? "green" : "red";
   this.setData({ myid: color});
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad");
    me: app.mydata
    this.setData({
      "arr[0].name":"aaaa",
      "info.tag":"webpack"
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
   
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("onReachBottom");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})