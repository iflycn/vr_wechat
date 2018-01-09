// pages/my_favorites/my_favorites.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    favorites_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: "https://www.easy-mock.com/mock/5a53888d90626970a964c412/vr_wechat/list",
      success: function (res) {
        var favorites_list = [], favorites = wx.getStorageSync("favorites") || [];
        for (var i = 0; i < res.data.pano.length; i++) {
          for (var j = 0; j < res.data.pano[i].list.length; j++) {
            favorites.indexOf(res.data.pano[i].list[j].id) >= 0 && favorites_list.push([res.data.pano[i].list[j].id, res.data.pano[i].list[j].title]);
          };
        };
        console.log("[favorites_list]:"), console.log(favorites_list);
        that.setData({
          favorites_list: favorites_list
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