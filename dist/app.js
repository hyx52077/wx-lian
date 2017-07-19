'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _default);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _default.__proto__ || Object.getPrototypeOf(_default)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      pages: ['pages/dian', 'pages/index', 'pages/user', 'pages/dd', 'pages/zd'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
      },
      tabBar: {
        list: [{
          pagePath: 'pages/dian',
          text: '首页',
          iconPath: 'images/home.png',
          selectedIconPath: 'images/home_hover.png'
        }, {
          pagePath: 'pages/index',
          text: '附近商户',
          iconPath: 'images/fujin.png',
          selectedIconPath: 'images/fujin_hover.png'
        }, {
          pagePath: 'pages/user',
          text: '个人中心',
          iconPath: 'images/user.png',
          selectedIconPath: 'images/user_hover.png'
        }, {
          pagePath: 'pages/dd',
          text: '我的订单',
          iconPath: 'images/dd.png',
          selectedIconPath: 'images/dd_hover.png'
        }]
      }
    }, _this.globalData = {
      userInfo: {},
      url: 'https://wechatapp.aiuplus.com/shareline/wechatapi/',
      APPID: 'wx7e6a0f6fdd9fc25e'
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_default, [{
    key: 'applogin',
    value: function applogin(cb) {
      var that = this;
      _wepy2.default.login({
        success: function success(lres) {
          _wepy2.default.getUserInfo({
            success: function success(res) {
              var data = res.userInfo;
              var appid = that.globalData.APPID;
              _wepy2.default.request({
                url: that.globalData.url + 'wechatAppLogin',
                data: { code: lres.code, appid: appid },
                method: 'POST',
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                success: function success(d) {
                  if (d.statusCode === 500) {
                    cb && cb(that.globalData.userInfo);
                    return;
                  }
                  if (d.data.code === "0") {
                    return;
                  }
                  data.openid = d.data.data.openid;
                  wx.setStorageSync('Openid', data.openid);
                  that.weblogin(data);
                  that.websetsid(cb);
                }
              });
            }
          });
        }
      });
    }
  }, {
    key: 'weblogin',
    value: function weblogin(adata) {
      var that = this;
      adata.appid = that.globalData.APPID;
      _wepy2.default.request({
        'url': that.globalData.url + 'wechatAppUpdateUserInfo',
        'data': adata,
        'method': 'POST',
        'header': { 'content-type': 'application/x-www-form-urlencoded' },
        'success': function success(d) {
          if (d.data.code === "1") {
            //更新信息成功
          }
        }
      });
    }
  }, {
    key: 'websetsid',
    value: function websetsid(cb) {
      var that = this;

      _wepy2.default.request({
        url: that.globalData.url + 'wechatAppUserInfo',
        data: { 'openid': _wepy2.default.getStorageSync('Openid'), 'appid': that.globalData.APPID },
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function success(data) {
          if (data.data.code === "1") {
            _wepy2.default.setStorageSync('ShowSid', parseInt(data.data.sid));
            that.globalData.userInfo = data.data.data;
            that.globalData.userInfo.error = false;
            cb && cb(that.globalData.userInfo);
          } else {
            console.log("获取用户信息失败");
            console.log(data);

            if (data.statusCode === 500) {
              that.globalData.userInfo.msg = "网络请求失败:500";
            } else {
              that.globalData.userInfo.msg = data.data.msg;
            }
            that.globalData.userInfo.error = true;

            cb && cb(that.globalData.userInfo);
          }
        },
        fail: function fail() {
          that.globalData.userInfo.error = true;
          that.globalData.userInfo.msg = "网络请求失败";
          cb && cb(that.globalData.userInfo);
        }
      });
    }
  }, {
    key: 'getUserInfo',
    value: function getUserInfo(cb) {
      var that = this;
      if (this.globalData.userInfo) {
        cb && cb(this.globalData.userInfo);
        return;
      }
      _wepy2.default.checkSession({
        success: function success(res) {
          _wepy2.default.getUserInfo({
            withCredentials: true,
            success: function success(UserInfo) {
              var setdata = UserInfo.userInfo;
              that.globalData.userInfo = UserInfo.userInfo;
              var id = wx.getStorageSync('Openid');
              if (!id) {
                that.applogin(cb);
              } else {
                console.log(id);
                setdata.openid = id;
                that.weblogin(setdata);
                that.websetsid(cb);
              }
            }
          });
        },
        fail: function fail() {
          that.applogin(cb);
        }
      });
    }
  }, {
    key: 'endpay',
    value: function endpay(webdata) {
      var that = this;
      console.log("请求退款");
      _wepy2.default.request({
        url: that.globalData.url + 'toWechatAppPay',
        data: webdata,
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function success(data) {
          //退款成功, 更新用户金额?

        }
      });
    }
  }, {
    key: 'fpay',
    value: function fpay(data, webdata) {
      var that = this;
      _wepy2.default.requestPayment({
        'timeStamp': data.timeStamp,
        'nonceStr': data.nonceStr,
        'package': data.packageValue,
        'signType': 'MD5',
        'paySign': data.paySign,
        'success': function success(res) {
          _wepy2.default.showModal({
            title: '支付成功',
            content: "",
            showCancel: false,
            success: function success(res) {
              _wepy2.default.switchTab({
                url: '/pages/dd'
              });
            }
          });
        },
        'fail': function fail(res) {
          that.endpay(webdata);
          if (res.errMsg === "requestPayment:fail cancel") {
            _wepy2.default.showModal({
              title: '支付失败',
              content: '原因:用户取消支付',
              showCancel: false,
              success: function success(res) {}
            });
          } else {
            _wepy2.default.showModal({
              title: '支付失败',
              content: '原因:关闭支付',
              showCancel: false,
              success: function success(res) {}
            });
          }
        }
      });
    }
  }, {
    key: 'gopay',
    value: function gopay(orderid) {
      var d = {};
      var that = this;
      d.orderid = orderid;
      d.openid = _wepy2.default.getStorageSync('Openid');
      d.appid = that.globalData.APPID;
      _wepy2.default.request({
        url: that.globalData.url + 'toWechatAppPay',
        data: d,
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function success(data) {
          _wepy2.default.hideNavigationBarLoading();
          var dat = data.data;
          if (parseInt(dat.code) === 1) {
            that.fpay(dat.data, d);
          } else if (parseInt(dat.code) === 2) {
            _wepy2.default.showModal({
              title: '支付成功',
              content: dat.msg,
              success: function success(res) {
                _wepy2.default.switchTab({
                  url: '/pages/dd'
                });
              }
            });
          } else {
            console.log('支付出错');
            console.log(d);
            _wepy2.default.showModal({
              title: '支付出错了',
              content: dat.msg,
              showCancel: false
            });
          }
        }
      });
    }
  }, {
    key: 'isuserpay',
    value: function isuserpay(obj) {
      var that = this;
      var value = true;
      try {
        var Openid = _wepy2.default.getStorageSync('Openid');
        if (Openid === 'null' || Openid === 'undefined') {
          value = false;
        }
      } catch (e) {
        value = false;
      }
      if (value === false) {
        _wepy2.default.showModal({
          title: '获取用户失败',
          content: "获取当前用户唯一识别失败",
          showCancel: false
        });
        wx.openSetting();
      }
      console.log("请求订单状态");
      _wepy2.default.showNavigationBarLoading();
      obj.data.openid = _wepy2.default.getStorageSync('Openid');
      obj.data.appid = that.globalData.APPID;
      _wepy2.default.request({
        url: that.globalData.url + 'getOrderById',
        data: obj.data,
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: obj.success,
        fail: function fail(data) {
          _wepy2.default.showModal({
            title: '请求失败',
            content: "网络请求失败,请稍后重试",
            showCancel: false
          });
        }
      });
    }
  }, {
    key: 'onLaunch',
    value: function onLaunch(options) {
      _wepy2.default.setStorageSync('ShowSid', 0);
    }
  }, {
    key: 'showpay',
    value: function showpay(dd) {
      try {
        _wepy2.default.removeStorageSync('dingdan');
      } catch (e) {
        // Do something when catch error
      }
      if (!dd) {
        _wepy2.default.showModal({
          title: '取消支付',
          content: "无效订单" + dd,
          showCancel: false
        });
        return;
      }
      var self = this;
      self.isuserpay({
        data: { orderid: dd },
        success: function success(data) {
          if (parseInt(data.data.code) === 1) {
            var orderFee = data.data.data.orderFee;
            self.websetsid(function (userdata) {
              if (userdata.error) {
                _wepy2.default.hideNavigationBarLoading();
                _wepy2.default.showModal({
                  title: '取消支付',
                  content: userdata.msg,
                  showCancel: false
                });
                return;
              }
              if (userdata.allMoney >= orderFee) {
                _wepy2.default.showModal({
                  title: '￥' + orderFee,
                  content: '可使用金额抵扣付款\n是否使用金额抵扣',
                  success: function success(res) {
                    if (res.confirm) {
                      self.gopay(dd);
                    } else {
                      _wepy2.default.hideNavigationBarLoading();
                      _wepy2.default.showModal({
                        title: '取消支付',
                        content: "用户取消订单支付",
                        showCancel: false
                      });
                    }
                  }
                });
              } else {
                self.gopay(dd);
              }
            });
          } else {
            _wepy2.default.hideNavigationBarLoading();
            _wepy2.default.showModal({
              title: '取消支付',
              content: data.dat.msg,
              showCancel: false
            });
          }
        }
      });
    }
  }, {
    key: 'onShow',
    value: function onShow(options) {
      console.log(options);
      if (options.scene >= 1011 && options.scene <= 1012 && options.query) {
        console.log(options.query);
        var scene = options.query;
        var k = scene.hasOwnProperty('scene') ? scene.scene : null;
        console.log("存储订单号", k);
        _wepy2.default.setStorageSync('dingdan', decodeURIComponent(k));
        _wepy2.default.reLaunch({
          url: '/pages/dian'
        });
        console.log("入场值", options.scene);
      }
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJsaXN0IiwicGFnZVBhdGgiLCJ0ZXh0IiwiaWNvblBhdGgiLCJzZWxlY3RlZEljb25QYXRoIiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwidXJsIiwiQVBQSUQiLCJjYiIsInRoYXQiLCJsb2dpbiIsInN1Y2Nlc3MiLCJscmVzIiwiZ2V0VXNlckluZm8iLCJyZXMiLCJkYXRhIiwiYXBwaWQiLCJyZXF1ZXN0IiwiY29kZSIsIm1ldGhvZCIsImhlYWRlciIsImQiLCJzdGF0dXNDb2RlIiwib3BlbmlkIiwid3giLCJzZXRTdG9yYWdlU3luYyIsIndlYmxvZ2luIiwid2Vic2V0c2lkIiwiYWRhdGEiLCJnZXRTdG9yYWdlU3luYyIsInBhcnNlSW50Iiwic2lkIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwibXNnIiwiZmFpbCIsImNoZWNrU2Vzc2lvbiIsIndpdGhDcmVkZW50aWFscyIsIlVzZXJJbmZvIiwic2V0ZGF0YSIsImlkIiwiYXBwbG9naW4iLCJ3ZWJkYXRhIiwicmVxdWVzdFBheW1lbnQiLCJ0aW1lU3RhbXAiLCJub25jZVN0ciIsInBhY2thZ2VWYWx1ZSIsInBheVNpZ24iLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzaG93Q2FuY2VsIiwic3dpdGNoVGFiIiwiZW5kcGF5IiwiZXJyTXNnIiwib3JkZXJpZCIsImhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZyIsImRhdCIsImZwYXkiLCJvYmoiLCJ2YWx1ZSIsIk9wZW5pZCIsImUiLCJvcGVuU2V0dGluZyIsInNob3dOYXZpZ2F0aW9uQmFyTG9hZGluZyIsIm9wdGlvbnMiLCJkZCIsInJlbW92ZVN0b3JhZ2VTeW5jIiwic2VsZiIsImlzdXNlcnBheSIsIm9yZGVyRmVlIiwidXNlcmRhdGEiLCJhbGxNb25leSIsImNvbmZpcm0iLCJnb3BheSIsInNjZW5lIiwicXVlcnkiLCJrIiwiaGFzT3duUHJvcGVydHkiLCJkZWNvZGVVUklDb21wb25lbnQiLCJyZUxhdW5jaCIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBMQUVFQSxNLEdBQVM7QUFDUEMsYUFBTyxDQUNMLFlBREssRUFFTCxhQUZLLEVBR0wsWUFISyxFQUlMLFVBSkssRUFLTCxVQUxLLENBREE7QUFRUEMsY0FBUTtBQUNOQyw2QkFBcUIsT0FEZjtBQUVOQyxzQ0FBOEIsTUFGeEI7QUFHTkMsZ0NBQXdCLFFBSGxCO0FBSU5DLGdDQUF3QjtBQUpsQixPQVJEO0FBY1BDLGNBQVE7QUFDTkMsY0FBTSxDQUFDO0FBQ0xDLG9CQUFVLFlBREw7QUFFTEMsZ0JBQU0sSUFGRDtBQUdMQyxvQkFBVSxpQkFITDtBQUlMQyw0QkFBa0I7QUFKYixTQUFELEVBS0o7QUFDQUgsb0JBQVUsYUFEVjtBQUVBQyxnQkFBTSxNQUZOO0FBR0FDLG9CQUFVLGtCQUhWO0FBSUFDLDRCQUFrQjtBQUpsQixTQUxJLEVBVUg7QUFDREgsb0JBQVUsWUFEVDtBQUVEQyxnQkFBTSxNQUZMO0FBR0RDLG9CQUFVLGlCQUhUO0FBSURDLDRCQUFrQjtBQUpqQixTQVZHLEVBZUg7QUFDREgsb0JBQVUsVUFEVDtBQUVEQyxnQkFBTSxNQUZMO0FBR0RDLG9CQUFVLGVBSFQ7QUFJREMsNEJBQWtCO0FBSmpCLFNBZkc7QUFEQTtBQWRELEssUUFzQ1RDLFUsR0FBYTtBQUNYQyxnQkFBVSxFQURDO0FBRVhDLFdBQUssb0RBRk07QUFHWEMsYUFBTztBQUhJLEs7Ozs7OzZCQUtIQyxFLEVBQUk7QUFDWixVQUFNQyxPQUFPLElBQWI7QUFDQSxxQkFBS0MsS0FBTCxDQUFXO0FBQ1RDLGVBRFMsbUJBQ0RDLElBREMsRUFDSztBQUNaLHlCQUFLQyxXQUFMLENB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SUYsTUFBTUcsY0FBTixDQUFxQixPQUFyQixJQUE4QkgsTUFBTUEsS0FBcEMsR0FBMEMsSUFBbEQ7QUFDQTNDLGdCQUFRQyxHQUFSLENBQVksT0FBWixFQUFvQjRDLENBQXBCO0FBQ0EsdUJBQUtyRCxjQUFMLENBQW9CLFNBQXBCLEVBQThCdUQsbUJBQW1CRixDQUFuQixDQUE5QjtBQUNBLHVCQUFLRyxRQUFMLENBQWM7QUFDWjNFLGVBQUs7QUFETyxTQUFkO0FBR0QyQixnQkFBUUMsR0FBUixDQUFZLEtBQVosRUFBa0JnQyxRQUFRVSxLQUExQjtBQUNBO0FBQ0Y7Ozs7RUFsWDBCLGVBQUtNLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIHBhZ2VzOiBbXHJcbiAgICAgICdwYWdlcy9kaWFuJyxcclxuICAgICAgJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgJ3BhZ2VzL3VzZXInLFxyXG4gICAgICAncGFnZXMvZGQnLFxyXG4gICAgICAncGFnZXMvemQnXHJcbiAgICBdLFxyXG4gICAgd2luZG93OiB7XHJcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1dlQ2hhdCcsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaydcclxuICAgIH0sXHJcbiAgICB0YWJCYXI6IHtcclxuICAgICAgbGlzdDogW3tcclxuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2RpYW4nLFxyXG4gICAgICAgIHRleHQ6ICfpppbpobUnLFxyXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2VzL2hvbWUucG5nJyxcclxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2VzL2hvbWVfaG92ZXIucG5nJ1xyXG4gICAgICB9LHtcclxuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgICB0ZXh0OiAn6ZmE6L+R5ZWG5oi3JyxcclxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlcy9mdWppbi5wbmcnLFxyXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZXMvZnVqaW5faG92ZXIucG5nJ1xyXG4gICAgICB9LCB7XHJcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy91c2VyJyxcclxuICAgICAgICB0ZXh0OiAn5Liq5Lq65Lit5b+DJyxcclxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlcy91c2VyLnBuZycsXHJcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlcy91c2VyX2hvdmVyLnBuZydcclxuICAgICAgfSwge1xyXG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvZGQnLFxyXG4gICAgICAgIHRleHQ6ICfmiJHnmoTorqLljZUnLFxyXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2VzL2RkLnBuZycsXHJcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlcy9kZF9ob3Zlci5wbmcnXHJcbiAgICAgIH1dXHJcbiAgICB9XHJcbiAgfVxyXG4gIGdsb2JhbERhdGEgPSB7XHJcbiAgICB1c2VySW5mbzoge30sXHJcbiAgICB1cmw6ICdodHRwczovL3dlY2hhdGFwcC5haXVwbHVzLmNvbS9zaGFyZWxpbmUvd2VjaGF0YXBpLycsXHJcbiAgICBBUFBJRDogJ3d4N2U2YTBmNmZkZDlmYzI1ZSdcclxuICB9XHJcbiAgYXBwbG9naW4gKGNiKSB7XHJcbiAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgd2VweS5sb2dpbih7XHJcbiAgICAgIHN1Y2Nlc3MobHJlcykge1xyXG4gICAgICAgIHdlcHkuZ2V0VXNlckluZm8oe1xyXG4gICAgICAgICAgc3VjY2VzcyAocmVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXMudXNlckluZm87XHJcbiAgICAgICAgICAgIGxldCBhcHBpZCA9IHRoYXQuZ2xvYmFsRGF0YS5BUFBJRFxyXG4gICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgIHVybDogdGhhdC5nbG9iYWxEYXRhLnVybCArICd3ZWNoYXRBcHBMb2dpbicsXHJcbiAgICAgICAgICAgICAgZGF0YToge2NvZGU6IGxyZXMuY29kZSwgYXBwaWQ6IGFwcGlkfSxcclxuICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzonYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30sXHJcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZCkgeyAgXHJcbiAgICAgICAgICAgICAgICBpZiAoZC5zdGF0dXNDb2RlPT09NTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNiICYmIGNiKHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mbylcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZC5kYXRhLmNvZGU9PT1cIjBcIikge1xyXG4gICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGF0YS5vcGVuaWQgPSBkLmRhdGEuZGF0YS5vcGVuaWRcclxuICAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdPcGVuaWQnLGRhdGEub3BlbmlkKSBcclxuICAgICAgICAgICAgICAgIHRoYXQud2VibG9naW4oZGF0YSlcclxuICAgICAgICAgICAgICAgIHRoYXQud2Vic2V0c2lkKGNiKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KSBcclxuICAgICAgfX0pXHJcbiAgfVxyXG4gIHdlYmxvZ2luIChhZGF0YSkge1xyXG4gICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgIGFkYXRhLmFwcGlkID0gdGhhdC5nbG9iYWxEYXRhLkFQUElEXHJcbiAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAndXJsJzogdGhhdC5nbG9iYWxEYXRhLnVybCArICd3ZWNoYXRBcHBVcGRhdGVVc2VySW5mbycsXHJcbiAgICAgICdkYXRhJzogYWRhdGEsXHJcbiAgICAgICdtZXRob2QnOiAnUE9TVCcsXHJcbiAgICAgICdoZWFkZXInOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfSxcclxuICAgICAgJ3N1Y2Nlc3MnOiBmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgaWYgKGQuZGF0YS5jb2RlPT09XCIxXCIpIHtcclxuICAgICAgICAgIC8v5pu05paw5L+h5oGv5oiQ5YqfXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuICB3ZWJzZXRzaWQoY2Ipe1xyXG4gICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgIFxyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiB0aGF0Lmdsb2JhbERhdGEudXJsICsgJ3dlY2hhdEFwcFVzZXJJbmZvJyxcclxuICAgICAgZGF0YTogeydvcGVuaWQnOndlcHkuZ2V0U3RvcmFnZVN5bmMoJ09wZW5pZCcpLCdhcHBpZCc6IHRoYXQuZ2xvYmFsRGF0YS5BUFBJRH0sXHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzonYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30sXHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YS5kYXRhLmNvZGU9PT1cIjFcIikge1xyXG4gICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygnU2hvd1NpZCcscGFyc2VJbnQoZGF0YS5kYXRhLnNpZCkpXHJcbiAgICAgICAgICB0aGF0Lmdsb2JhbERhdGEudXNlckluZm8gPSBkYXRhLmRhdGEuZGF0YVxyXG4gICAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJJbmZvLmVycm9yID0gZmFsc2VcclxuICAgICAgICAgIGNiICYmIGNiKHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mbylcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwi6I635Y+W55So5oi35L+h5oGv5aSx6LSlXCIpXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG5cclxuICAgICAgICAgIGlmIChkYXRhLnN0YXR1c0NvZGU9PT01MDApIHtcclxuICAgICAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJJbmZvLm1zZyA9IFwi572R57uc6K+35rGC5aSx6LSlOjUwMFwiXHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJJbmZvLm1zZyA9IGRhdGEuZGF0YS5tc2dcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mby5lcnJvciA9IHRydWVcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgY2IgJiYgY2IodGhhdC5nbG9iYWxEYXRhLnVzZXJJbmZvKVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZmFpbDogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGF0Lmdsb2JhbERhdGEudXNlckluZm8uZXJyb3IgPSB0cnVlXHJcbiAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJJbmZvLm1zZyA9IFwi572R57uc6K+35rGC5aSx6LSlXCJcclxuICAgICAgICBjYiAmJiBjYih0aGF0Lmdsb2JhbERhdGEudXNlckluZm8pXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG4gIGdldFVzZXJJbmZvKGNiKSB7XHJcbiAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgaWYgKHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbykgeyBcclxuICAgICAgY2IgJiYgY2IodGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIHdlcHkuY2hlY2tTZXNzaW9uKHtcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKXsgXHJcbiAgICAgICAgIHdlcHkuZ2V0VXNlckluZm8oe1xyXG4gICAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczp0cnVlLFxyXG4gICAgICAgICAgICAgIHN1Y2Nlc3MgKFVzZXJJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZXRkYXRhID0gVXNlckluZm8udXNlckluZm9cclxuICAgICAgICAgICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IFVzZXJJbmZvLnVzZXJJbmZvXHJcbiAgICAgICAgICAgICAgICB2YXIgaWQgPSAgd3guZ2V0U3RvcmFnZVN5bmMoJ09wZW5pZCcpXHJcbiAgICAgICAgICAgICAgICBpZiAoIWlkKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoYXQuYXBwbG9naW4oY2IpXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpZClcclxuICAgICAgICAgICAgICAgICAgICBzZXRkYXRhLm9wZW5pZCA9IGlkXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC53ZWJsb2dpbihzZXRkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQud2Vic2V0c2lkKGNiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWw6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhhdC5hcHBsb2dpbihjYilcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbiAgZW5kcGF5ICh3ZWJkYXRhKSB7XHJcbiAgICBsZXQgdGhhdCA9IHRoaXNcclxuICAgIGNvbnNvbGUubG9nKFwi6K+35rGC6YCA5qy+XCIpXHJcbiAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6IHRoYXQuZ2xvYmFsRGF0YS51cmwgKyAndG9XZWNoYXRBcHBQYXknLFxyXG4gICAgICBkYXRhOiB3ZWJkYXRhLFxyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6J2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LFxyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgIC8v6YCA5qy+5oiQ5YqfLCDmm7TmlrDnlKjmiLfph5Hpop0/XHJcbiAgICAgICAgXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG4gIGZwYXkgKGRhdGEsd2ViZGF0YSkge1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzXHJcbiAgICB3ZXB5LnJlcXVlc3RQYXltZW50KHtcclxuICAgICAndGltZVN0YW1wJzogZGF0YS50aW1lU3RhbXAsXHJcbiAgICAgJ25vbmNlU3RyJzogZGF0YS5ub25jZVN0cixcclxuICAgICAncGFja2FnZSc6IGRhdGEucGFja2FnZVZhbHVlLFxyXG4gICAgICdzaWduVHlwZSc6ICdNRDUnLFxyXG4gICAgICdwYXlTaWduJzogZGF0YS5wYXlTaWduLFxyXG4gICAgICdzdWNjZXNzJzpmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+aUr+S7mOaIkOWKnycsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiXCIsXHJcbiAgICAgICAgICAgIHNob3dDYW5jZWw6ZmFsc2UsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcclxuICAgICAgICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL2RkJ1xyXG4gICAgICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgIH0sXHJcbiAgICAgJ2ZhaWwnOmZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgdGhhdC5lbmRwYXkod2ViZGF0YSlcclxuICAgICAgICBpZiAocmVzLmVyck1zZz09PVwicmVxdWVzdFBheW1lbnQ6ZmFpbCBjYW5jZWxcIikge1xyXG4gICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAn5pSv5LuY5aSx6LSlJyxcclxuICAgICAgICAgICAgICBjb250ZW50OiAn5Y6f5ZugOueUqOaIt+WPlua2iOaUr+S7mCcsXHJcbiAgICAgICAgICAgICAgc2hvd0NhbmNlbDpmYWxzZSxcclxuICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgIHdlcHkuc2hvd01vZGFsICh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICfmlK/ku5jlpLHotKUnLFxyXG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICfljp/lm6A65YWz6Zet5pSv5LuYJyxcclxuICAgICAgICAgICAgICBzaG93Q2FuY2VsOmZhbHNlLFxyXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbiAgZ29wYXkob3JkZXJpZCl7XHJcbiAgICBsZXQgZCA9IHt9XHJcbiAgICBsZXQgdGhhdCA9IHRoaXNcclxuICAgIGQub3JkZXJpZCA9IG9yZGVyaWRcclxuICAgIGQub3BlbmlkID0gd2VweS5nZXRTdG9yYWdlU3luYygnT3BlbmlkJylcclxuICAgIGQuYXBwaWQgPSB0aGF0Lmdsb2JhbERhdGEuQVBQSURcclxuICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgIHVybDogdGhhdC5nbG9iYWxEYXRhLnVybCArICd0b1dlY2hhdEFwcFBheScsXHJcbiAgICAgIGRhdGE6IGQsXHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzonYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30sXHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICB3ZXB5LmhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZygpXHJcbiAgICAgICAgbGV0IGRhdCA9IGRhdGEuZGF0YVxyXG4gICAgICAgIGlmIChwYXJzZUludChkYXQuY29kZSk9PT0xKSB7XHJcbiAgICAgICAgICB0aGF0LmZwYXkoZGF0LmRhdGEsZClcclxuICAgICAgICB9ZWxzZSBpZiAocGFyc2VJbnQoZGF0LmNvZGUpPT09Mikge1xyXG4gICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICfmlK/ku5jmiJDlip8nLFxyXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IGRhdC5tc2csXHJcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvZGQnXHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCfmlK/ku5jlh7rplJknKVxyXG4gICAgICAgICAgY29uc29sZS5sb2coZClcclxuICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgdGl0bGU6ICfmlK/ku5jlh7rplJnkuoYnLFxyXG4gICAgICAgICAgICBjb250ZW50OiBkYXQubXNnLFxyXG4gICAgICAgICAgICBzaG93Q2FuY2VsOmZhbHNlLFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuICBpc3VzZXJwYXkgKG9iail7XHJcbiAgICBsZXQgdGhhdCA9IHRoaXNcclxuICAgIHZhciB2YWx1ZSA9IHRydWVcclxuICAgIHRyeSB7XHJcbiAgICAgIGxldCBPcGVuaWQgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdPcGVuaWQnKVxyXG4gICAgICBpZiAoT3BlbmlkID09PSAnbnVsbCcgfHwgT3BlbmlkID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHZhbHVlID0gZmFsc2VcclxuICAgICAgfVxyXG4gICAgfWNhdGNoIChlKSB7XHJcbiAgICAgICAgdmFsdWUgPSBmYWxzZVxyXG4gICAgfVxyXG4gICAgaWYgKHZhbHVlID09PSBmYWxzZSkge1xyXG4gICAgICB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgdGl0bGU6ICfojrflj5bnlKjmiLflpLHotKUnLFxyXG4gICAgICAgIGNvbnRlbnQ6IFwi6I635Y+W5b2T5YmN55So5oi35ZSv5LiA6K+G5Yir5aSx6LSlXCIsXHJcbiAgICAgICAgc2hvd0NhbmNlbDpmYWxzZVxyXG4gICAgICB9KVxyXG4gICAgICB3eC5vcGVuU2V0dGluZygpXHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyhcIuivt+axguiuouWNleeKtuaAgVwiKVxyXG4gICAgd2VweS5zaG93TmF2aWdhdGlvbkJhckxvYWRpbmcoKVxyXG4gICAgb2JqLmRhdGEub3BlbmlkID0gd2VweS5nZXRTdG9yYWdlU3luYygnT3BlbmlkJylcclxuICAgIG9iai5kYXRhLmFwcGlkID0gdGhhdC5nbG9iYWxEYXRhLkFQUElEXHJcbiAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6IHRoYXQuZ2xvYmFsRGF0YS51cmwgKyAnZ2V0T3JkZXJCeUlkJyxcclxuICAgICAgZGF0YTogb2JqLmRhdGEsXHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzonYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30sXHJcbiAgICAgIHN1Y2Nlc3M6IG9iai5zdWNjZXNzLFxyXG4gICAgICBmYWlsOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgdGl0bGU6ICfor7fmsYLlpLHotKUnLFxyXG4gICAgICAgICAgICBjb250ZW50OiBcIue9kee7nOivt+axguWksei0pSzor7fnqI3lkI7ph43or5VcIixcclxuICAgICAgICAgICAgc2hvd0NhbmNlbDpmYWxzZVxyXG4gICAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbiAgb25MYXVuY2ggKG9wdGlvbnMpIHtcclxuICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ1Nob3dTaWQnLDApXHJcbiAgfVxyXG4gIHNob3dwYXkoZGQpe1xyXG4gICAgdHJ5IHtcclxuICAgICB3ZXB5LnJlbW92ZVN0b3JhZ2VTeW5jKCdkaW5nZGFuJylcclxuICAgIH1jYXRjaCAoZSkge1xyXG4gICAgICAvLyBEbyBzb21ldGhpbmcgd2hlbiBjYXRjaCBlcnJvclxyXG4gICAgfVxyXG4gICAgaWYgKCFkZCkge1xyXG4gICAgICB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgdGl0bGU6ICflj5bmtojmlK/ku5gnLFxyXG4gICAgICAgIGNvbnRlbnQ6IFwi5peg5pWI6K6i5Y2VXCIrZGQsXHJcbiAgICAgICAgc2hvd0NhbmNlbDpmYWxzZSxcclxuICAgICAgfSlcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgIHNlbGYuaXN1c2VycGF5KHtcclxuICAgICAgZGF0YTp7b3JkZXJpZDpkZH0sXHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICBpZiAocGFyc2VJbnQoZGF0YS5kYXRhLmNvZGUpPT09MSkge1xyXG4gICAgICAgICAgbGV0IG9yZGVyRmVlID0gZGF0YS5kYXRhLmRhdGEub3JkZXJGZWVcclxuICAgICAgICAgIHNlbGYud2Vic2V0c2lkKGZ1bmN0aW9uKHVzZXJkYXRhKXtcclxuICAgICAgICAgICAgIGlmICh1c2VyZGF0YS5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgd2VweS5oaWRlTmF2aWdhdGlvbkJhckxvYWRpbmcoKVxyXG4gICAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogJ+WPlua2iOaUr+S7mCcsXHJcbiAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHVzZXJkYXRhLm1zZyxcclxuICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbDpmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIGlmICh1c2VyZGF0YS5hbGxNb25leSA+PSBvcmRlckZlZSl7XHJcbiAgICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn77+lJytvcmRlckZlZSxcclxuICAgICAgICAgICAgICAgICAgY29udGVudDogJ+WPr+S9v+eUqOmHkemineaKteaJo+S7mOasvlxcbuaYr+WQpuS9v+eUqOmHkemineaKteaJoycsXHJcbiAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZ29wYXkoZGQpXHJcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LmhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+WPlua2iOaUr+S7mCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCLnlKjmiLflj5bmtojorqLljZXmlK/ku5hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgIHNlbGYuZ29wYXkoZGQpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSkgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICB3ZXB5LmhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZygpXHJcbiAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn5Y+W5raI5pSv5LuYJyxcclxuICAgICAgICAgICAgY29udGVudDogZGF0YS5kYXQubXNnLFxyXG4gICAgICAgICAgICBzaG93Q2FuY2VsOmZhbHNlLFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgIFxyXG4gIH1cclxuICBvblNob3cgKG9wdGlvbnMpIHtcclxuICAgIGNvbnNvbGUubG9nKG9wdGlvbnMpXHJcbiAgICBpZihvcHRpb25zLnNjZW5lID49MTAxMSAmJiBvcHRpb25zLnNjZW5lIDw9IDEwMTIgJiYgb3B0aW9ucy5xdWVyeSl7XHJcbiAgICAgIGNvbnNvbGUubG9nKG9wdGlvbnMucXVlcnkpXHJcbiAgICAgIGxldCBzY2VuZSA9IG9wdGlvbnMucXVlcnlcclxuICAgICAgbGV0IGsgPSBzY2VuZS5oYXNPd25Qcm9wZXJ0eSgnc2NlbmUnKT9zY2VuZS5zY2VuZTpudWxsXHJcbiAgICAgIGNvbnNvbGUubG9nKFwi5a2Y5YKo6K6i5Y2V5Y+3XCIsaylcclxuICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygnZGluZ2RhbicsZGVjb2RlVVJJQ29tcG9uZW50KGspKVxyXG4gICAgICB3ZXB5LnJlTGF1bmNoKHtcclxuICAgICAgICB1cmw6ICcvcGFnZXMvZGlhbidcclxuICAgICAgfSlcclxuICAgICBjb25zb2xlLmxvZyhcIuWFpeWcuuWAvFwiLG9wdGlvbnMuc2NlbmUpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==