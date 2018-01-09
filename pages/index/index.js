// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_vr_device_h: 0,
    pano_type: []
  },

  joinFavorite: function (e) {
    var id = e.currentTarget.dataset.id, favorites = wx.getStorageSync("favorites") || [], i = favorites.indexOf(id);
    wx.showModal({
      title: i < 0 ? "加入收藏" : "移出收藏",
      content: "将“" + e.currentTarget.dataset.title + "”" + (i < 0 ? "加入" : "移出") + "个人收藏?",
      confirmText: i < 0 ? "加入" : "移出",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          i < 0 ? favorites.unshift(id) : favorites.splice(i, 1);
          wx.setStorageSync("favorites", favorites);
          console.log("[favorites]:"), console.log(favorites);
        }
      }
    });
  },

  openLoading: function (v, t) {
    wx.showToast({
      title: v,
      icon: "loading",
      duration: t
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth;
        console.log("[windowWidth]:"), console.log(windowWidth);
        that.setData({
          img_vr_device_h: windowWidth / 900 * 326
        })
      }
    });
    that.openLoading("全景图加载中", 1000);
    wx.request({
      url: "https://www.easy-mock.com/mock/5a53888d90626970a964c412/vr_wechat/list",
      success: function (res) {
        console.log("[res.data]:"), console.log(res.data);
        that.setData({
          pano_type: res.data.pano
        })
      }
    });
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