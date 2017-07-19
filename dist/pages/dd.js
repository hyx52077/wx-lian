'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dd = function (_wepy$page) {
  _inherits(Dd, _wepy$page);

  function Dd() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Dd);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Dd.__proto__ || Object.getPrototypeOf(Dd)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      enablePullDownRefresh: true,
      backgroundTextStyle: 'dark'
    }, _this.data = {
      userInfo: {},
      dianInfo: {},
      tabindex: 0,
      myOrder: [], orderList: [], rewardList: [], msg: '正在加载中', dianid: 0, show: false, isReachBottom: false
    }, _this.methods = {
      getinfo: function getinfo(e) {
        var id = e.currentTarget.id;
        this.dianInfo = this.orderList[id].shopId;
        this.tabindex = 1;
        wx.setNavigationBarTitle({
          title: '我的订单 - ' + this.dianInfo.shopName
        });
        id = this.orderList[id].shopId.id;
        this.dianid = id;
        this.msg = '加载数据中';
        this.rewardList = [];
        this.getddlist(1, { shopId: id });
        this.$apply();
      },
      ret: function ret(e) {
        this.myOrder = null;
        if (this.tabindex === 0) {
          _wepy2.default.switchTab({
            url: '/pages/user'
          });
        }

        if (this.tabindex === 1) {
          wx.setNavigationBarTitle({
            title: '我的订单'
          });
          this.tabindex = 0;
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Dd, [{
    key: 'getddlist',
    value: function getddlist(index, d) {
      var that = this;
      var u = ['myOrderList', 'shopOrderList'];
      if (!d) {
        d = {};
      }
      d.openid = wx.getStorageSync('Openid');
      d.appid = that.$parent.globalData.APPID;
      _wepy2.default.showLoading({ title: '加载中' });
      _wepy2.default.request({
        url: that.$parent.globalData.url + u[index],
        data: d,
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function success(ds) {
          _wepy2.default.hideLoading();
          _wepy2.default.stopPullDownRefresh();
          if (index === 0) {
            var data = ds.data.data.list;
          }
          if (index === 1) {
            var data = ds.data.data.shopOrderList;
            var order = ds.data.data.myOrder;
            that.myOrder = order;
          }

          if (!data || data.length === 0) {
            console.log(data);
            that.msg = '已加载完毕';
            that.$apply();
            return;
          }

          for (var i = 0; i <= data.length - 1; i++) {

            if (index === 0) {
              that.orderList[that.orderList.length] = data[i];
            }
            if (index === 1) {
              that.rewardList[that.rewardList.length] = data[i];
            }
            that.msg = '已加载完毕';

            that.$apply();
          }
        }
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      var Sid = _wepy2.default.getStorageSync('ShowSid');
      if (!Sid) {
        _wepy2.default.switchTab({
          url: '/pages/user'
        });
      } else {
        this.show = true;
      }
    }
  }, {
    key: 'onLoad',
    value: function onLoad(option) {
      var self = this;
      self.msg = '加载数据中';
      self.myOrder = null;
      this.$parent.getUserInfo(function (userInfo) {
        if (userInfo) {
          self.userInfo = userInfo;
          self.$apply();
        }
      });
      wx.setNavigationBarTitle({
        title: '我的订单'
      });
      self.getddlist(0, {});
    }
  }, {
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      this.myOrder = null;
      this.msg = '加载数据中';
      if (this.tabindex === 0) {
        this.orderList = [];
        this.getddlist(this.tabindex, { pageSize: 10 });
      }
      if (this.tabindex === 1) {
        this.rewardList = [];
        var id = this.dianid;
        this.getddlist(this.tabindex, { shopId: id });
      }
    }
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      this.msg = '加载数据中';
      if (this.tabindex === 0 && isReachBottom === true) {
        this.getddlist(this.tabindex, { pageSize: this.orderList.length + 10 });
      }
    }
  }]);

  return Dd;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Dd , 'pages/dd'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRkLmpzIl0sIm5hbWVzIjpbIkRkIiwiY29uZmlnIiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiYmFja2dyb3VuZFRleHRTdHlsZSIsImRhdGEiLCJ1c2VySW5mbyIsImRpYW5JbmZvIiwidGFiaW5kZXgiLCJteU9yZGVyIiwib3JkZXJMaXN0IiwicmV3YXJkTGlzdCIsIm1zZyIsImRpYW5pZCIsInNob3ciLCJpc1JlYWNoQm90dG9tIiwibWV0aG9kcyIsImdldGluZm8iLCJlIiwiaWQiLCJjdXJyZW50VGFyZ2V0Iiwic2hvcElkIiwid3giLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJ0aXRsZSIsInNob3BOYW1lIiwiZ2V0ZGRsaXN0IiwiJGFwcGx5IiwicmV0Iiwic3dpdGNoVGFiIiwidXJsIiwiaW5kZXgiLCJkIiwidGhhdCIsInUiLCJvcGVuaWQiLCJnZXRTdG9yYWdlU3luYyIsImFwcGlkIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJBUFBJRCIsInNob3dMb2FkaW5nIiwicmVxdWVzdCIsIm1ldGhvZCIsImhlYWRlciIsInN1Y2Nlc3MiLCJkcyIsImhpZGVMb2FkaW5nIiwic3RvcFB1bGxEb3duUmVmcmVzaCIsImxpc3QiLCJzaG9wT3JkZXJMaXN0Iiwib3JkZXIiLCJsZW5ndGgiLCJjb25zb2xlIiwibG9nIiwiaSIsIlNpZCIsIm9wdGlvbiIsInNlbGYiLCJnZXRVc2VySW5mbyIsInBhZ2VTaXplIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsRTs7Ozs7Ozs7Ozs7Ozs7OEtBQ25CQyxNLEdBQVM7QUFDUEMsNkJBQXVCLElBRGhCO0FBRVBDLDJCQUFxQjtBQUZkLEssUUFJVEMsSSxHQUFPO0FBQ0xDLGdCQUFVLEVBREw7QUFFTEMsZ0JBQVUsRUFGTDtBQUdMQyxnQkFBVSxDQUhMO0FBSUxDLGVBQVMsRUFKSixFQUlPQyxXQUFXLEVBSmxCLEVBSXNCQyxZQUFZLEVBSmxDLEVBSXFDQyxLQUFLLE9B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QUFLSixRQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQ3JCLGFBQUtFLFNBQUwsR0FBaUIsRUFBakI7QUFDQSxhQUFLZ0IsU0FBTCxDQUFlLEtBQUtsQixRQUFwQixFQUE2QixFQUFDb0QsVUFBUyxFQUFWLEVBQTdCO0FBQ0Q7QUFDRCxVQUFJLEtBQUtwRCxRQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQ3JCLGFBQUtHLFVBQUwsR0FBa0IsRUFBbEI7QUFDQSxZQUFJUSxLQUFLLEtBQUtOLE1BQWQ7QUFDQSxhQUFLYSxTQUFMLENBQWUsS0FBS2xCLFFBQXBCLEVBQTZCLEVBQUNhLFFBQU9GLEVBQVIsRUFBN0I7QUFDRDtBQUNGOzs7b0NBRWM7QUFDYixXQUFLUCxHQUFMLEdBQVcsT0FBWDtBQUNBLFVBQUksS0FBS0osUUFBTCxLQUFnQixDQUFoQixJQUFxQk8sa0JBQWtCLElBQTNDLEVBQWlEO0FBQy9DLGFBQUtXLFNBQUwsQ0FBZSxLQUFLbEIsUUFBcEIsRUFBNkIsRUFBQ29ELFVBQVMsS0FBS2xELFNBQUwsQ0FBZTBDLE1BQWYsR0FBd0IsRUFBbEMsRUFBN0I7QUFDRDtBQUNGOzs7O0VBdEk2QixlQUFLUyxJOztrQkFBaEI1RCxFIiwiZmlsZSI6ImRkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERkIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IHRydWUsXHJcbiAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaydcclxuICB9XHJcbiAgZGF0YSA9IHtcclxuICAgIHVzZXJJbmZvOiB7fSxcclxuICAgIGRpYW5JbmZvOiB7fSxcclxuICAgIHRhYmluZGV4OiAwLFxyXG4gICAgbXlPcmRlcjogW10sb3JkZXJMaXN0OiBbXSwgcmV3YXJkTGlzdDogW10sbXNnOiAn5q2j5Zyo5Yqg6L295LitJywgZGlhbmlkOiAwLHNob3c6IGZhbHNlLGlzUmVhY2hCb3R0b206IGZhbHNlXHJcbiAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBnZXRpbmZvIChlKSB7XHJcbiAgICAgIGxldCBpZCA9IGUuY3VycmVudFRhcmdldC5pZFxyXG4gICAgICB0aGlzLmRpYW5JbmZvID0gdGhpcy5vcmRlckxpc3RbaWRdLnNob3BJZFxyXG4gICAgICB0aGlzLnRhYmluZGV4ID0gMVxyXG4gICAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xyXG4gICAgICAgIHRpdGxlOiAn5oiR55qE6K6i5Y2VIC0gJyArIHRoaXMuZGlhbkluZm8uc2hvcE5hbWVcclxuICAgICAgfSlcclxuICAgICAgaWQgPSB0aGlzLm9yZGVyTGlzdFtpZF0uc2hvcElkLmlkXHJcbiAgICAgIHRoaXMuZGlhbmlkID0gaWRcclxuICAgICAgdGhpcy5tc2cgPSAn5Yqg6L295pWw5o2u5LitJ1xyXG4gICAgICB0aGlzLnJld2FyZExpc3QgPSBbXVxyXG4gICAgICB0aGlzLmdldGRkbGlzdCgxLHtzaG9wSWQ6aWR9KVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9LFxyXG4gICAgcmV0IChlKSB7XHJcbiAgICAgIHRoaXMubXlPcmRlciA9IG51bGxcclxuICAgICAgaWYgKHRoaXMudGFiaW5kZXg9PT0wKSB7XHJcbiAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xyXG4gICAgICAgICAgdXJsOiAnL3BhZ2VzL3VzZXInXHJcbiAgICAgICAgfSkgXHJcbiAgICAgIH0gXHJcblxyXG4gICAgICBpZiAodGhpcy50YWJpbmRleD09PTEpIHtcclxuICAgICAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xyXG4gICAgICAgICAgdGl0bGU6ICfmiJHnmoTorqLljZUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnRhYmluZGV4ID0gMFxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRkZGxpc3QgKGluZGV4LGQpIHtcclxuICAgIGxldCB0aGF0ID0gdGhpc1xyXG4gICAgbGV0IHUgPSBbJ215T3JkZXJMaXN0Jywnc2hvcE9yZGVyTGlzdCddXHJcbiAgICBpZiAoIWQpIHsgZCA9IHt9IH1cclxuICAgIGQub3BlbmlkID0gd3guZ2V0U3RvcmFnZVN5bmMoJ09wZW5pZCcpXHJcbiAgICBkLmFwcGlkID0gdGhhdC4kcGFyZW50Lmdsb2JhbERhdGEuQVBQSURcclxuICAgIHdlcHkuc2hvd0xvYWRpbmcoe3RpdGxlOifliqDovb3kuK0nfSlcclxuICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6IHRoYXQuJHBhcmVudC5nbG9iYWxEYXRhLnVybCArIHVbaW5kZXhdLFxyXG4gICAgICBkYXRhOiBkLFxyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6J2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LFxyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihkcykgeyBcclxuICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcclxuICAgICAgICB3ZXB5LnN0b3BQdWxsRG93blJlZnJlc2goKVxyXG4gICAgICAgIGlmIChpbmRleD09PTApIHtcclxuICAgICAgICAgIHZhciBkYXRhID0gZHMuZGF0YS5kYXRhLmxpc3RcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluZGV4PT09MSkge1xyXG4gICAgICAgICAgdmFyIGRhdGEgPSBkcy5kYXRhLmRhdGEuc2hvcE9yZGVyTGlzdFxyXG4gICAgICAgICAgdmFyIG9yZGVyID0gZHMuZGF0YS5kYXRhLm15T3JkZXJcclxuICAgICAgICAgIHRoYXQubXlPcmRlciA9IG9yZGVyXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWRhdGEgfHwgZGF0YS5sZW5ndGg9PT0wKSB7IFxyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICAgICAgICB0aGF0Lm1zZyA9ICflt7LliqDovb3lrozmr5UnXHJcbiAgICAgICAgICB0aGF0LiRhcHBseSgpXHJcbiAgICAgICAgICByZXR1cm4gXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGRhdGEubGVuZ3RoIC0gMTsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgaWYgKGluZGV4PT09MCkge1xyXG4gICAgICAgICAgICB0aGF0Lm9yZGVyTGlzdFt0aGF0Lm9yZGVyTGlzdC5sZW5ndGhdID0gZGF0YVtpXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGluZGV4PT09MSkge1xyXG4gICAgICAgICAgICB0aGF0LnJld2FyZExpc3RbdGhhdC5yZXdhcmRMaXN0Lmxlbmd0aF0gPSBkYXRhW2ldXHJcblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhhdC5tc2cgPSAn5bey5Yqg6L295a6M5q+VJ1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICB0aGF0LiRhcHBseSgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIH0pXHJcbiAgfVxyXG4gIG9uU2hvdygpe1xyXG4gICAgbGV0IFNpZCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ1Nob3dTaWQnKVxyXG4gICAgaWYoIVNpZCl7XHJcbiAgICAgIHdlcHkuc3dpdGNoVGFiKHtcclxuICAgICAgICB1cmw6ICcvcGFnZXMvdXNlcidcclxuICAgICAgfSlcclxuICAgIH1lbHNle1xyXG4gICAgICB0aGlzLnNob3cgPSB0cnVlXHJcbiAgICB9XHJcbiAgfVxyXG4gIG9uTG9hZCAob3B0aW9uKSB7XHJcbiAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgIHNlbGYubXNnID0gJ+WKoOi9veaVsOaNruS4rSdcclxuICAgIHNlbGYubXlPcmRlciA9IG51bGxcclxuICAgIHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbyhmdW5jdGlvbiAodXNlckluZm8pIHtcclxuICAgICAgaWYgKHVzZXJJbmZvKSB7XHJcbiAgICAgICAgc2VsZi51c2VySW5mbyA9IHVzZXJJbmZvXHJcbiAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcclxuICAgICAgdGl0bGU6ICfmiJHnmoTorqLljZUnXHJcbiAgICB9KVxyXG4gICAgc2VsZi5nZXRkZGxpc3QoMCx7fSlcclxuICB9XHJcbiAgb25QdWxsRG93blJlZnJlc2goKSB7XHJcbiAgICB0aGlzLm15T3JkZXIgPSBudWxsXHJcbiAgICB0aGlzLm1zZyA9ICfliqDovb3mlbDmja7kuK0nXHJcbiAgICBpZiAodGhpcy50YWJpbmRleD09PTApIHtcclxuICAgICAgdGhpcy5vcmRlckxpc3QgPSBbXVxyXG4gICAgICB0aGlzLmdldGRkbGlzdCh0aGlzLnRhYmluZGV4LHtwYWdlU2l6ZToxMH0pXHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy50YWJpbmRleD09PTEpIHtcclxuICAgICAgdGhpcy5yZXdhcmRMaXN0ID0gW11cclxuICAgICAgbGV0IGlkID0gdGhpcy5kaWFuaWRcclxuICAgICAgdGhpcy5nZXRkZGxpc3QodGhpcy50YWJpbmRleCx7c2hvcElkOmlkfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uUmVhY2hCb3R0b20oKXtcclxuICAgIHRoaXMubXNnID0gJ+WKoOi9veaVsOaNruS4rSdcclxuICAgIGlmICh0aGlzLnRhYmluZGV4PT09MCAmJiBpc1JlYWNoQm90dG9tID09PSB0cnVlKSB7IFxyXG4gICAgICB0aGlzLmdldGRkbGlzdCh0aGlzLnRhYmluZGV4LHtwYWdlU2l6ZTp0aGlzLm9yZGVyTGlzdC5sZW5ndGggKyAxMCB9KVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=