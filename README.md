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
      console.log("[res.data]:"), console.log(res.data);
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
        console.log("[favorites]:"), console.log(favorites);
      }
    }
  });
}
```

## 列表
>风光
>>冰岛蓝湖地热温泉<br>
>>唯美的法属波利尼西亚<br>
>>梦中向往的海底世界<br>
>>惊艳的九寨沟五彩池<br>
>>迪拜城市建筑群<br>
>>俯瞰纽约中央公园<br>
>>震撼心灵的那一抹极光<br>

>建筑
>>纳米比亚鬼镇卡曼斯科<br>
>>巴黎诶菲尔铁塔<br>
>>悉尼歌剧院<br>
>>郑州千玺广场<br>
>>卢克索卡纳克神庙<br>

>人文
>>复活节岛摩艾石像<br>
>>秦始皇兵马俑坑内视角<br>
>>西西伯利亚汉特人的家<br>
>>西藏天葬骷髅墙<br>
>>最后的国营理发店<br>

>其他
>>荒凉广袤的火星平原<br>
>>驶离地球航向深空<br>