# BLUES VR for WeChat
全景图片浏览微信小程序，支持 VR 模式。
![](https://github.com/iflycn/vr_wechat/blob/master/images/vr_device.png)

## 依赖
基于 `WeUI`、`krpano` 实现。

## 关键代码
### 获取全景图列表
```html
<!--pages/index/index.wxml-->

<block wx:for="{{pano_type}}" wx:key="{{item.id}}">
  <view>{{item.type}}</view>
  <view>
    <navigator url="url?v={{item.id}}" wx:for="{{item.list}}" wx:key="{{item.id}}">
      <view>{{item.title}}</view>
      <view wx:if="{{item.isNew}}">New</view>
      ...
    </navigator>
  </view>
</block>
```
```javascript
// pages/index/index.js

data: {
  pano_type: []
},

onLoad: function (options) {
  var that = this;
  wx.request({
    url: "url",
    success: function (res) {
      console.log("[res.data]: %o", res.data);
      that.setData({
        pano_type: res.data.pano
      })
    }
  });
}
```
### 加入/移除收藏
```html
<!--pages/index/index.wxml-->

<navigator bindlongpress="joinFavorite" data-id="{{item.id}}" data-title="{{item.title}}">
  ...
</navigator>
```
```javascript
// pages/index/index.js

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
        console.log("[favorites]: %o", favorites);
      }
    }
  });
}
```
### 获取收藏列表
```html
<!--pages/index/my_favorites.wxml-->

<block wx:for="{{favorites_list}}" wx:for-index="i" wx:key="{{favorites_list[i][0]}}">
  <navigator url="url?v={{favorites_list[i][0]}}">
    <view>{{favorites_list[i][1]}}</view>
    ...
  </navigator>
</block>
```
```javascript
// pages/my_favorites/my_favorites.js

data: {
  favorites_list: []
},

onLoad: function (options) {
  var that = this;
  wx.request({
    url: "url",
    success: function (res) {
      var favorites_list = [], favorites = wx.getStorageSync("favorites") || [];
      for (var i = 0; i < res.data.pano.length; i++) {
        for (var j = 0; j < res.data.pano[i].list.length; j++) {
          favorites.indexOf(res.data.pano[i].list[j].id) >= 0 && favorites_list.push([res.data.pano[i].list[j].id, res.data.pano[i].list[j].title]);
        };
      };
      console.log("[favorites_list]: %o", favorites_list);
      that.setData({
        favorites_list: favorites_list
      })
    }
  });
}
```

## 嵌入 H5
详见 [https://github.com/iflycn/vr](https://github.com/iflycn/vr)