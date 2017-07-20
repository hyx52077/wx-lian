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
                  that.weblogin(data, cb);
                }
              });
            }
          });
        }
      });
    }
  }, {
    key: 'weblogin',
    value: function weblogin(adata, f) {
      var that = this;
      adata.appid = that.globalData.APPID;
      _wepy2.default.request({
        'url': that.globalData.url + 'wechatAppUpdateUserInfo',
        'data': adata,
        'method': 'POST',
        'header': { 'content-type': 'application/x-www-form-urlencoded' },
        'success': function success(d) {

          if (d.data.code === "1" && f) {
            that.websetsid(f);
          } else {
            try {
              _wepy2.default.clearStorageSync();
            } catch (e) {
              // Do something when catch error
            }
            _wepy2.default.showModal({
              title: '请求出错',
              content: '请退出小程序重新进入',
              showCancel: false
            });
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
            that.globalData.userInfo['error'] = false;
            cb && cb(that.globalData.userInfo);
          } else {
            console.log("获取用户信息失败");
            console.log(data);
            if (data.statusCode === 500) {
              that.globalData.userInfo['msg'] = "网络请求失败:500";
            } else {
              that.globalData.userInfo['msg'] = data.data.msg;
            }
            that.globalData.userInfo['error'] = true;

            cb && cb(that.globalData.userInfo);
          }
        },
        fail: function fail() {
          that.globalData.userInfo['error'] = true;
          that.globalData.userInfo['msg'] = "网络请求失败";
          cb && cb(that.globalData.userInfo);
        }
      });
    }
  }, {
    key: 'getUserInfo',
    value: function getUserInfo(cb) {
      var that = this;
      if (that.globalData.userInfo && JSON.stringify(that.globalData.userInfo) !== "{}") {
        cb && cb(this.globalData.userInfo);
        return;
      }
      _wepy2.default.checkSession({
        success: function success(res) {
          console.log(res);
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
                that.weblogin(setdata, cb);
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
        if (k) {
          this.showpay(decodeURIComponent(k));
        }
        console.log("入场值", options.scene);
      }
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJsaXN0IiwicGFnZVBhdGgiLCJ0ZXh0IiwiaWNvblBhdGgiLCJzZWxlY3RlZEljb25QYXRoIiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwidXJsIiwiQVBQSUQiLCJjYiIsInRoYXQiLCJsb2dpbiIsInN1Y2Nlc3MiLCJscmVzIiwiZ2V0VXNlckluZm8iLCJyZXMiLCJkYXRhIiwiYXBwaWQiLCJyZXF1ZXN0IiwiY29kZSIsIm1ldGhvZCIsImhlYWRlciIsImQiLCJzdGF0dXNDb2RlIiwib3BlbmlkIiwid3giLCJzZXRTdG9yYWdlU3luYyIsIndlYmxvZ2luIiwiYWRhdGEiLCJmIiwid2Vic2V0c2lkIiwiY2xlYXJTdG9yYWdlU3luYyIsImUiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzaG93Q2FuY2VsIiwiZ2V0U3RvcmFnZVN5bmMiLCJwYXJzZUludCIsInNpZCIsImNvbnNvbGUiLCJsb2ciLCJtc2ciLCJmYWlsIiwiSlNPTiIsInN0cmluZ2lmeSIsImNoZWNrU2Vzc2lvbiIsIndpdGhDcmVkZW50aWFscyIsIlVzZXJJbmZvIiwic2V0ZGF0YSIsImlkIiwiYXBwbG9naW4iLCJ3ZWJkYXRhIiwicmVxdWVzdFBheW1lbnQiLCJ0aW1lU3RhbXAiLCJub25jZVN0ciIsInBhY2thZ2VWYWx1ZSIsInBheVNpZ24iLCJzd2l0Y2hUYWIiLCJlbmRwYXkiLCJlcnJNc2ciLCJvcmRlcmlkIiwiaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nIiwiZGF0IiwiZnBheSIsIm9iaiIsInZhbHVlIiwiT3BlbmlkIiwib3BlblNldHRpbmciLCJzaG93TmF2aWdhdGlvbkJhckxvYWRpbmciLCJvcHRpb25zIiwiZGQiLCJyZW1vdmVTdG9yYWdlU3luYyIsInNlbGYiLCJpc3VzZXJwYXkiLCJvcmRlckZlZSIsInVzZXJkYXRhIiwiZXJyb3IiLCJhbGxNb25leSIsImNvbmZpcm0iLCJnb3BheSIsInNjZW5lIiwicXVlcnkiLCJrIiwiaGFzT3duUHJvcGVydHkiLCJzaG93cGF5IiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MExBRUVBLE0sR0FBUztBQUNQQyxhQUFPLENBQ0wsWUFESyxFQUVMLGFBRkssRUFHTCxZQUhLLEVBSUwsVUFKSyxFQUtMLFVBTEssQ0FEQTtBQVFQQyxjQUFRO0FBQ05DLDZCQUFxQixPQURmO0FBRU5DLHNDQUE4QixNQUZ4QjtBQUdOQyxnQ0FBd0IsUUFIbEI7QUFJTkMsZ0NBQXdCO0FBSmxCLE9BUkQ7QUFjUEMsY0FBUTtBQUNOQyxjQUFNLENBQUM7QUFDTEMsb0JBQVUsWUFETDtBQUVMQyxnQkFBTSxJQUZEO0FBR0xDLG9CQUFVLGlCQUhMO0FBSUxDLDRCQUFrQjtBQUpiLFNBQUQsRUFLSjtBQUNBSCxvQkFBVSxhQURWO0FBRUFDLGdCQUFNLE1BRk47QUFHQUMsb0JBQVUsa0JBSFY7QUFJQUMsNEJBQWtCO0FBSmxCLFNBTEksRUFVSDtBQUNESCxvQkFBVSxZQURUO0FBRURDLGdCQUFNLE1BRkw7QUFHREMsb0JBQVUsaUJBSFQ7QUFJREMsNEJBQWtCO0FBSmpCLFNBVkcsRUFlSDtBQUNESCxvQkFBVSxVQURUO0FBRURDLGdCQUFNLE1BRkw7QUFHREMsb0JBQVUsZUFIVDtBQUlEQyw0QkFBa0I7QUFKakIsU0FmRztBQURBO0FBZEQsSyxRQXNDVEMsVSxHQUFhO0FBQ1hDLGdCQUFVLEVBREM7QUFFWEMsV0FBSyxvREFGTTtBQUdYQyxhQUFPO0FBSEksSzs7Ozs7NkJBS0hDLEUsRUFBSTtBQUNaLFVBQU1DLE9BQU8sSUFBYjtBQUNBLHFCQUFLQyxLQUFMLENBQVc7QUFDVEMs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RE07QUFFYkMsdUJBQVNuQixLQUFLK0MsR0FBTCxDQUFTckIsR0FGTDtBQUdiTiwwQkFBVztBQUhFLGFBQWY7QUFLRDtBQUNGO0FBNUNZLE9BQWY7QUErQ0Q7OzsyQkFDT2tDLE8sRUFBUztBQUNmOUIsY0FBUUMsR0FBUixDQUFZNkIsT0FBWjtBQUNBLFVBQUdBLFFBQVFXLEtBQVIsSUFBZ0IsSUFBaEIsSUFBd0JYLFFBQVFXLEtBQVIsSUFBaUIsSUFBekMsSUFBaURYLFFBQVFZLEtBQTVELEVBQWtFO0FBQ2hFMUMsZ0JBQVFDLEdBQVIsQ0FBWTZCLFFBQVFZLEtBQXBCO0FBQ0EsWUFBSUQsUUFBUVgsUUFBUVksS0FBcEI7QUFDQSxZQUFJQyxJQUFJRixNQUFNRyxjQUFOLENBQXFCLE9BQXJCLElBQThCSCxNQUFNQSxLQUFwQyxHQUEwQyxJQUFsRDtBQUNBekMsZ0JBQVFDLEdBQVIsQ0FBWSxPQUFaLEVBQW9CMEMsQ0FBcEI7QUFDQSxZQUFHQSxDQUFILEVBQUs7QUFDSCxlQUFLRSxPQUFMLENBQWFDLG1CQUFtQkgsQ0FBbkIsQ0FBYjtBQUNEO0FBQ0YzQyxnQkFBUUMsR0FBUixDQUFZLEtBQVosRUFBa0I2QixRQUFRVyxLQUExQjtBQUNBO0FBQ0Y7Ozs7RUExWDBCLGVBQUtNLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIHBhZ2VzOiBbXHJcbiAgICAgICdwYWdlcy9kaWFuJyxcclxuICAgICAgJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgJ3BhZ2VzL3VzZXInLFxyXG4gICAgICAncGFnZXMvZGQnLFxyXG4gICAgICAncGFnZXMvemQnXHJcbiAgICBdLFxyXG4gICAgd2luZG93OiB7XHJcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1dlQ2hhdCcsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaydcclxuICAgIH0sXHJcbiAgICB0YWJCYXI6IHtcclxuICAgICAgbGlzdDogW3tcclxuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2RpYW4nLFxyXG4gICAgICAgIHRleHQ6ICfpppbpobUnLFxyXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2VzL2hvbWUucG5nJyxcclxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnaW1hZ2VzL2hvbWVfaG92ZXIucG5nJ1xyXG4gICAgICB9LHtcclxuICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2luZGV4JyxcclxuICAgICAgICB0ZXh0OiAn6ZmE6L+R5ZWG5oi3JyxcclxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlcy9mdWppbi5wbmcnLFxyXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdpbWFnZXMvZnVqaW5faG92ZXIucG5nJ1xyXG4gICAgICB9LCB7XHJcbiAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy91c2VyJyxcclxuICAgICAgICB0ZXh0OiAn5Liq5Lq65Lit5b+DJyxcclxuICAgICAgICBpY29uUGF0aDogJ2ltYWdlcy91c2VyLnBuZycsXHJcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlcy91c2VyX2hvdmVyLnBuZydcclxuICAgICAgfSwge1xyXG4gICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvZGQnLFxyXG4gICAgICAgIHRleHQ6ICfmiJHnmoTorqLljZUnLFxyXG4gICAgICAgIGljb25QYXRoOiAnaW1hZ2VzL2RkLnBuZycsXHJcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2ltYWdlcy9kZF9ob3Zlci5wbmcnXHJcbiAgICAgIH1dXHJcbiAgICB9XHJcbiAgfVxyXG4gIGdsb2JhbERhdGEgPSB7XHJcbiAgICB1c2VySW5mbzoge30sXHJcbiAgICB1cmw6ICdodHRwczovL3dlY2hhdGFwcC5haXVwbHVzLmNvbS9zaGFyZWxpbmUvd2VjaGF0YXBpLycsXHJcbiAgICBBUFBJRDogJ3d4N2U2YTBmNmZkZDlmYzI1ZSdcclxuICB9XHJcbiAgYXBwbG9naW4gKGNiKSB7XHJcbiAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgd2VweS5sb2dpbih7XHJcbiAgICAgIHN1Y2Nlc3MobHJlcykge1xyXG4gICAgICAgIHdlcHkuZ2V0VXNlckluZm8oe1xyXG4gICAgICAgICAgc3VjY2VzcyAocmVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXMudXNlckluZm87XHJcbiAgICAgICAgICAgIGxldCBhcHBpZCA9IHRoYXQuZ2xvYmFsRGF0YS5BUFBJRFxyXG4gICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgIHVybDogdGhhdC5nbG9iYWxEYXRhLnVybCArICd3ZWNoYXRBcHBMb2dpbicsXHJcbiAgICAgICAgICAgICAgZGF0YToge2NvZGU6IGxyZXMuY29kZSwgYXBwaWQ6IGFwcGlkfSxcclxuICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzonYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30sXHJcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZCkgeyAgXHJcbiAgICAgICAgICAgICAgICBpZiAoZC5zdGF0dXNDb2RlPT09NTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNiICYmIGNiKHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mbylcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZC5kYXRhLmNvZGU9PT1cIjBcIikge1xyXG4gICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGF0YS5vcGVuaWQgPSBkLmRhdGEuZGF0YS5vcGVuaWRcclxuICAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdPcGVuaWQnLGRhdGEub3BlbmlkKSBcclxuICAgICAgICAgICAgICAgIHRoYXQud2VibG9naW4oZGF0YSxjYilcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pIFxyXG4gICAgICB9fSlcclxuICB9XHJcbiAgd2VibG9naW4gKGFkYXRhLGYpIHtcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzXHJcbiAgICBhZGF0YS5hcHBpZCA9IHRoYXQuZ2xvYmFsRGF0YS5BUFBJRFxyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgJ3VybCc6IHRoYXQuZ2xvYmFsRGF0YS51cmwgKyAnd2VjaGF0QXBwVXBkYXRlVXNlckluZm8nLFxyXG4gICAgICAnZGF0YSc6IGFkYXRhLFxyXG4gICAgICAnbWV0aG9kJzogJ1BPU1QnLFxyXG4gICAgICAnaGVhZGVyJzogeydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30sXHJcbiAgICAgICdzdWNjZXNzJzogZnVuY3Rpb24oZCkge1xyXG5cclxuICAgICAgICBpZiAoZC5kYXRhLmNvZGU9PT1cIjFcIiAmJiBmKSB7XHJcbiAgICAgICAgICAgdGhhdC53ZWJzZXRzaWQoZilcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHdlcHkuY2xlYXJTdG9yYWdlU3luYygpXHJcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIC8vIERvIHNvbWV0aGluZyB3aGVuIGNhdGNoIGVycm9yXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn6K+35rGC5Ye66ZSZJyxcclxuICAgICAgICAgICAgY29udGVudDogJ+ivt+mAgOWHuuWwj+eoi+W6j+mHjeaWsOi/m+WFpScsXHJcbiAgICAgICAgICAgIHNob3dDYW5jZWw6ZmFsc2VcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuICB3ZWJzZXRzaWQoY2Ipe1xyXG4gICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgIHVybDogdGhhdC5nbG9iYWxEYXRhLnVybCArICd3ZWNoYXRBcHBVc2VySW5mbycsXHJcbiAgICAgIGRhdGE6IHsnb3BlbmlkJzp3ZXB5LmdldFN0b3JhZ2VTeW5jKCdPcGVuaWQnKSwnYXBwaWQnOiB0aGF0Lmdsb2JhbERhdGEuQVBQSUR9LFxyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6J2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LFxyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgaWYgKGRhdGEuZGF0YS5jb2RlPT09XCIxXCIpIHtcclxuICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ1Nob3dTaWQnLHBhcnNlSW50KGRhdGEuZGF0YS5zaWQpKVxyXG4gICAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZGF0YS5kYXRhLmRhdGFcclxuICAgICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mb1snZXJyb3InXSA9IGZhbHNlXHJcbiAgICAgICAgICBjYiAmJiBjYih0aGF0Lmdsb2JhbERhdGEudXNlckluZm8pXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIuiOt+WPlueUqOaIt+S/oeaBr+Wksei0pVwiKVxyXG4gICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgICAgICAgIGlmIChkYXRhLnN0YXR1c0NvZGU9PT01MDApIHtcclxuICAgICAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJJbmZvWydtc2cnXSA9IFwi572R57uc6K+35rGC5aSx6LSlOjUwMFwiXHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJJbmZvWydtc2cnXSA9IGRhdGEuZGF0YS5tc2dcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mb1snZXJyb3InXSA9IHRydWVcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgY2IgJiYgY2IodGhhdC5nbG9iYWxEYXRhLnVzZXJJbmZvKVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZmFpbDogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGF0Lmdsb2JhbERhdGEudXNlckluZm9bJ2Vycm9yJ10gPSB0cnVlXHJcbiAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJJbmZvWydtc2cnXSA9IFwi572R57uc6K+35rGC5aSx6LSlXCJcclxuICAgICAgICBjYiAmJiBjYih0aGF0Lmdsb2JhbERhdGEudXNlckluZm8pXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG4gIGdldFVzZXJJbmZvKGNiKSB7XHJcbiAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgaWYgKHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mbyAmJiBKU09OLnN0cmluZ2lmeSh0aGF0Lmdsb2JhbERhdGEudXNlckluZm8pICE9PSBcInt9XCIpIHsgXHJcbiAgICAgIGNiICYmIGNiKHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbylcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICB3ZXB5LmNoZWNrU2Vzc2lvbih7XHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcyl7IFxyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgd2VweS5nZXRVc2VySW5mbyh7XHJcbiAgICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOnRydWUsXHJcbiAgICAgICAgICAgICAgc3VjY2VzcyAoVXNlckluZm8pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNldGRhdGEgPSBVc2VySW5mby51c2VySW5mb1xyXG4gICAgICAgICAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gVXNlckluZm8udXNlckluZm9cclxuICAgICAgICAgICAgICAgIHZhciBpZCA9ICB3eC5nZXRTdG9yYWdlU3luYygnT3BlbmlkJylcclxuICAgICAgICAgICAgICAgIGlmICghaWQpIHtcclxuICAgICAgICAgICAgICAgICAgdGhhdC5hcHBsb2dpbihjYilcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGlkKVxyXG4gICAgICAgICAgICAgICAgICAgIHNldGRhdGEub3BlbmlkID0gaWRcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LndlYmxvZ2luKHNldGRhdGEsY2IpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICB9KTtcclxuICAgICAgfSxcclxuICAgICAgZmFpbDogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGF0LmFwcGxvZ2luKGNiKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuICBlbmRwYXkgKHdlYmRhdGEpIHtcclxuICAgIGxldCB0aGF0ID0gdGhpc1xyXG4gICAgY29uc29sZS5sb2coXCLor7fmsYLpgIDmrL5cIilcclxuICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgIHVybDogdGhhdC5nbG9iYWxEYXRhLnVybCArICd0b1dlY2hhdEFwcFBheScsXHJcbiAgICAgIGRhdGE6IHdlYmRhdGEsXHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzonYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30sXHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgLy/pgIDmrL7miJDlip8sIOabtOaWsOeUqOaIt+mHkeminT9cclxuICAgICAgICBcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbiAgZnBheSAoZGF0YSx3ZWJkYXRhKSB7XHJcbiAgICBsZXQgdGhhdCA9IHRoaXNcclxuICAgIHdlcHkucmVxdWVzdFBheW1lbnQoe1xyXG4gICAgICd0aW1lU3RhbXAnOiBkYXRhLnRpbWVTdGFtcCxcclxuICAgICAnbm9uY2VTdHInOiBkYXRhLm5vbmNlU3RyLFxyXG4gICAgICdwYWNrYWdlJzogZGF0YS5wYWNrYWdlVmFsdWUsXHJcbiAgICAgJ3NpZ25UeXBlJzogJ01ENScsXHJcbiAgICAgJ3BheVNpZ24nOiBkYXRhLnBheVNpZ24sXHJcbiAgICAgJ3N1Y2Nlc3MnOmZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn5pSv5LuY5oiQ5YqfJyxcclxuICAgICAgICAgICAgY29udGVudDogXCJcIixcclxuICAgICAgICAgICAgc2hvd0NhbmNlbDpmYWxzZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xyXG4gICAgICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvZGQnXHJcbiAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgfSxcclxuICAgICAnZmFpbCc6ZnVuY3Rpb24ocmVzKXtcclxuICAgICAgICB0aGF0LmVuZHBheSh3ZWJkYXRhKVxyXG4gICAgICAgIGlmIChyZXMuZXJyTXNnPT09XCJyZXF1ZXN0UGF5bWVudDpmYWlsIGNhbmNlbFwiKSB7XHJcbiAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICfmlK/ku5jlpLHotKUnLFxyXG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICfljp/lm6A655So5oi35Y+W5raI5pSv5LuYJyxcclxuICAgICAgICAgICAgICBzaG93Q2FuY2VsOmZhbHNlLFxyXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgd2VweS5zaG93TW9kYWwgKHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ+aUr+S7mOWksei0pScsXHJcbiAgICAgICAgICAgICAgY29udGVudDogJ+WOn+WboDrlhbPpl63mlK/ku5gnLFxyXG4gICAgICAgICAgICAgIHNob3dDYW5jZWw6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSBcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuICBnb3BheShvcmRlcmlkKXtcclxuICAgIGxldCBkID0ge31cclxuICAgIGxldCB0aGF0ID0gdGhpc1xyXG4gICAgZC5vcmRlcmlkID0gb3JkZXJpZFxyXG4gICAgZC5vcGVuaWQgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdPcGVuaWQnKVxyXG4gICAgZC5hcHBpZCA9IHRoYXQuZ2xvYmFsRGF0YS5BUFBJRFxyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiB0aGF0Lmdsb2JhbERhdGEudXJsICsgJ3RvV2VjaGF0QXBwUGF5JyxcclxuICAgICAgZGF0YTogZCxcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOidhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfSxcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgIHdlcHkuaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nKClcclxuICAgICAgICBsZXQgZGF0ID0gZGF0YS5kYXRhXHJcbiAgICAgICAgaWYgKHBhcnNlSW50KGRhdC5jb2RlKT09PTEpIHtcclxuICAgICAgICAgIHRoYXQuZnBheShkYXQuZGF0YSxkKVxyXG4gICAgICAgIH1lbHNlIGlmIChwYXJzZUludChkYXQuY29kZSk9PT0yKSB7XHJcbiAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ+aUr+S7mOaIkOWKnycsXHJcbiAgICAgICAgICAgICAgY29udGVudDogZGF0Lm1zZyxcclxuICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9wYWdlcy9kZCdcclxuICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ+aUr+S7mOWHuumUmScpXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhkKVxyXG4gICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+aUr+S7mOWHuumUmeS6hicsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGRhdC5tc2csXHJcbiAgICAgICAgICAgIHNob3dDYW5jZWw6ZmFsc2UsXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG4gIGlzdXNlcnBheSAob2JqKXtcclxuICAgIGxldCB0aGF0ID0gdGhpc1xyXG4gICAgdmFyIHZhbHVlID0gdHJ1ZVxyXG4gICAgdHJ5IHtcclxuICAgICAgbGV0IE9wZW5pZCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ09wZW5pZCcpXHJcbiAgICAgIGlmIChPcGVuaWQgPT09ICdudWxsJyB8fCBPcGVuaWQgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgdmFsdWUgPSBmYWxzZVxyXG4gICAgICB9XHJcbiAgICB9Y2F0Y2ggKGUpIHtcclxuICAgICAgICB2YWx1ZSA9IGZhbHNlXHJcbiAgICB9XHJcbiAgICBpZiAodmFsdWUgPT09IGZhbHNlKSB7XHJcbiAgICAgIHdlcHkuc2hvd01vZGFsKHtcclxuICAgICAgICB0aXRsZTogJ+iOt+WPlueUqOaIt+Wksei0pScsXHJcbiAgICAgICAgY29udGVudDogXCLojrflj5blvZPliY3nlKjmiLfllK/kuIDor4bliKvlpLHotKVcIixcclxuICAgICAgICBzaG93Q2FuY2VsOmZhbHNlXHJcbiAgICAgIH0pXHJcbiAgICAgIHd4Lm9wZW5TZXR0aW5nKClcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKFwi6K+35rGC6K6i5Y2V54q25oCBXCIpXHJcbiAgICB3ZXB5LnNob3dOYXZpZ2F0aW9uQmFyTG9hZGluZygpXHJcbiAgICBvYmouZGF0YS5vcGVuaWQgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdPcGVuaWQnKVxyXG4gICAgb2JqLmRhdGEuYXBwaWQgPSB0aGF0Lmdsb2JhbERhdGEuQVBQSURcclxuICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgIHVybDogdGhhdC5nbG9iYWxEYXRhLnVybCArICdnZXRPcmRlckJ5SWQnLFxyXG4gICAgICBkYXRhOiBvYmouZGF0YSxcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIGhlYWRlcjogeydjb250ZW50LXR5cGUnOidhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfSxcclxuICAgICAgc3VjY2Vzczogb2JqLnN1Y2Nlc3MsXHJcbiAgICAgIGZhaWw6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+ivt+axguWksei0pScsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwi572R57uc6K+35rGC5aSx6LSlLOivt+eojeWQjumHjeivlVwiLFxyXG4gICAgICAgICAgICBzaG93Q2FuY2VsOmZhbHNlXHJcbiAgICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuICBvbkxhdW5jaCAob3B0aW9ucykge1xyXG4gICAgd2VweS5zZXRTdG9yYWdlU3luYygnU2hvd1NpZCcsMClcclxuICB9XHJcbiAgc2hvd3BheShkZCl7XHJcbiAgICB0cnkge1xyXG4gICAgIHdlcHkucmVtb3ZlU3RvcmFnZVN5bmMoJ2RpbmdkYW4nKVxyXG4gICAgfWNhdGNoIChlKSB7XHJcbiAgICAgIC8vIERvIHNvbWV0aGluZyB3aGVuIGNhdGNoIGVycm9yXHJcbiAgICB9XHJcbiAgICBpZiAoIWRkKSB7XHJcbiAgICAgIHdlcHkuc2hvd01vZGFsKHtcclxuICAgICAgICB0aXRsZTogJ+WPlua2iOaUr+S7mCcsXHJcbiAgICAgICAgY29udGVudDogXCLml6DmlYjorqLljZVcIitkZCxcclxuICAgICAgICBzaG93Q2FuY2VsOmZhbHNlLFxyXG4gICAgICB9KVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgc2VsZi5pc3VzZXJwYXkoe1xyXG4gICAgICBkYXRhOntvcmRlcmlkOmRkfSxcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgIGlmIChwYXJzZUludChkYXRhLmRhdGEuY29kZSk9PT0xKSB7XHJcbiAgICAgICAgICBsZXQgb3JkZXJGZWUgPSBkYXRhLmRhdGEuZGF0YS5vcmRlckZlZVxyXG4gICAgICAgICAgc2VsZi53ZWJzZXRzaWQoZnVuY3Rpb24odXNlcmRhdGEpe1xyXG4gICAgICAgICAgICAgaWYgKHVzZXJkYXRhLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5LmhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZygpXHJcbiAgICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5Y+W5raI5pSv5LuYJyxcclxuICAgICAgICAgICAgICAgICAgY29udGVudDogdXNlcmRhdGEubXNnLFxyXG4gICAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgaWYgKHVzZXJkYXRhLmFsbE1vbmV5ID49IG9yZGVyRmVlKXtcclxuICAgICAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6ICfvv6UnK29yZGVyRmVlLFxyXG4gICAgICAgICAgICAgICAgICBjb250ZW50OiAn5Y+v5L2/55So6YeR6aKd5oq15omj5LuY5qy+XFxu5piv5ZCm5L2/55So6YeR6aKd5oq15omjJyxcclxuICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5nb3BheShkZClcclxuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5Y+W5raI5pSv5LuYJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcIueUqOaIt+WPlua2iOiuouWNleaUr+S7mFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgc2VsZi5nb3BheShkZClcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KSBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIHdlcHkuaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nKClcclxuICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgdGl0bGU6ICflj5bmtojmlK/ku5gnLFxyXG4gICAgICAgICAgICBjb250ZW50OiBkYXRhLmRhdC5tc2csXHJcbiAgICAgICAgICAgIHNob3dDYW5jZWw6ZmFsc2UsXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgXHJcbiAgfVxyXG4gIG9uU2hvdyAob3B0aW9ucykge1xyXG4gICAgY29uc29sZS5sb2cob3B0aW9ucylcclxuICAgIGlmKG9wdGlvbnMuc2NlbmUgPj0xMDExICYmIG9wdGlvbnMuc2NlbmUgPD0gMTAxMiAmJiBvcHRpb25zLnF1ZXJ5KXtcclxuICAgICAgY29uc29sZS5sb2cob3B0aW9ucy5xdWVyeSlcclxuICAgICAgbGV0IHNjZW5lID0gb3B0aW9ucy5xdWVyeVxyXG4gICAgICBsZXQgayA9IHNjZW5lLmhhc093blByb3BlcnR5KCdzY2VuZScpP3NjZW5lLnNjZW5lOm51bGxcclxuICAgICAgY29uc29sZS5sb2coXCLlrZjlgqjorqLljZXlj7dcIixrKVxyXG4gICAgICBpZihrKXtcclxuICAgICAgICB0aGlzLnNob3dwYXkoZGVjb2RlVVJJQ29tcG9uZW50KGspKVxyXG4gICAgICB9XHJcbiAgICAgY29uc29sZS5sb2coXCLlhaXlnLrlgLxcIixvcHRpb25zLnNjZW5lKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=