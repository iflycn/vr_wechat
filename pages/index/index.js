// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_vr_device_h: 0,
    pano_type: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth;
        console.log("[Debug]: " + windowWidth);
        that.setData({
          img_vr_device_h: windowWidth / 900 * 326
        })
      }
    })
    wx.request({
      url: "https://www.easy-mock.com/mock/5a53888d90626970a964c412/vr_wechat/list",
      success: function (res) {
        console.log("[Ajax]: " + res.data);
        that.setData({
          pano_type: res.data.pano
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})