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

var Zd = function (_wepy$page) {
  _inherits(Zd, _wepy$page);

  function Zd() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Zd);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Zd.__proto__ || Object.getPrototypeOf(Zd)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      enablePullDownRefresh: true,
      backgroundTextStyle: 'dark'
    }, _this.data = {
      userInfo: null,
      tabindex: 0,
      zdList: null, msg: '加载数据中'
    }, _this.methods = {
      getinfo: function getinfo(e) {
        var id = e.currentTarget.dataset.did;
        var that = this;
        var row = that.zdList[id];
        if (that.tabindex == 0) {
          wx.showModal({
            title: '申请返利',
            content: '确定进行申请返利',
            success: function success(res) {
              if (res.confirm) {
                console.log('用户点击确定');
                that.tixian({ rewardId: row.id });
              } else if (res.cancel) {
                console.log('用户点击取消');
              }
            }
          });
        }
      },
      ret: function ret(e) {
        _wepy2.default.switchTab({
          url: '/pages/user'
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Zd, [{
    key: 'tixian',
    value: function tixian(d) {
      var that = this;
      if (!d) {
        d = {};
      }
      d.openid = wx.getStorageSync('Openid');
      _wepy2.default.request({
        url: that.$parent.globalData.url + 'applyReward',
        data: d,
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function success(ds) {
          console.log(ds.data);
          var data = ds.data.code;
          if (!data) {
            return;
          }
          wx.showToast({
            title: '等待后台审核',
            icon: 'success',
            duration: 2000
          });
          that.onPullDownRefresh();
          that.$apply();
        }
      });
    }
  }, {
    key: 'getddlist',
    value: function getddlist(index, d) {
      if (!d) {
        d = {};
      }
      var that = this;
      d.openid = wx.getStorageSync('Openid');
      d.withdrawalsFlag = index;
      d.appid = that.$parent.globalData.APPID;
      _wepy2.default.request({
        url: that.$parent.globalData.url + 'rewardList',
        data: d,
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function success(ds) {
          _wepy2.default.stopPullDownRefresh();
          var data = ds.data.data;
          if (!data) {
            that.msg = '已加载全部';
            that.$apply();
            return;
          }

          for (var i = 0; i < data.length; i++) {
            var lengt = that.zdList.length;
            that.zdList[lengt] = data[i];
          }
          that.msg = '已加载完毕';
          that.$apply();
        }
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(option) {
      this.tabindex = option.index;
      var self = this;
      self.msg = '加载数据中';
      var id = self.tabindex;
      self.zdList = [];
      var title = ['申请返利', '申请中', '已到帐'];
      wx.setNavigationBarTitle({
        title: title[id]
      });
      this.$parent.getUserInfo(function (userInfo) {
        if (userInfo) {
          self.userInfo = userInfo;
          self.$apply();
        }
      });
      self.getddlist(this.tabindex, {});
    }
  }, {
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      var id = this.tabindex;
      this.zdList = [];
      this.msg = '加载数据中';
      this.getddlist(this.tabindex, {});
    }
  }]);

  return Zd;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Zd , 'pages/zd'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInpkLmpzIl0sIm5hbWVzIjpbIlpkIiwiY29uZmlnIiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiYmFja2dyb3VuZFRleHRTdHlsZSIsImRhdGEiLCJ1c2VySW5mbyIsInRhYmluZGV4IiwiemRMaXN0IiwibXNnIiwibWV0aG9kcyIsImdldGluZm8iLCJlIiwiaWQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImRpZCIsInRoYXQiLCJyb3ciLCJ3eCIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwiY29uc29sZSIsImxvZyIsInRpeGlhbiIsInJld2FyZElkIiwiY2FuY2VsIiwicmV0Iiwic3dpdGNoVGFiIiwidXJsIiwiZCIsIm9wZW5pZCIsImdldFN0b3JhZ2VTeW5jIiwicmVxdWVzdCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwibWV0aG9kIiwiaGVhZGVyIiwiZHMiLCJjb2RlIiwic2hvd1RvYXN0IiwiaWNvbiIsImR1cmF0aW9uIiwib25QdWxsRG93blJlZnJlc2giLCIkYXBwbHkiLCJpbmRleCIsIndpdGhkcmF3YWxzRmxhZyIsImFwcGlkIiwiQVBQSUQiLCJzdG9wUHVsbERvd25SZWZyZXNoIiwiaSIsImxlbmd0aCIsImxlbmd0Iiwib3B0aW9uIiwic2VsZiIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsImdldFVzZXJJbmZvIiwiZ2V0ZGRsaXN0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsRTs7Ozs7Ozs7Ozs7Ozs7OEtBQ25CQyxNLEdBQVM7QUFDUEMsNkJBQXVCLElBRGhCO0FBRVBDLDJCQUFxQjtBQUZkLEssUUFJVEMsSSxHQUFPO0FBQ0xDLGdCQUFVLElBREw7QUFFTEMsZ0JBQVUsQ0FGTDtBQUdMQyxjQUFRLElBSEgsRUFHUUMsS0FBSztBQUhiLEssUUFLUEMsTyxHQUFVO0FBQ1JDLGFBRFEsbUJBQ0NDLENBREQsRUFDSTtBQUNW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LE1BQUwsQ0FBWStDLE1BQXhCO0FBQ0F0QyxpQkFBS1QsTUFBTCxDQUFZZ0QsS0FBWixJQUFxQm5ELEtBQUtpRCxDQUFMLENBQXJCO0FBQ0Q7QUFDRHJDLGVBQUtSLEdBQUwsR0FBVyxPQUFYO0FBQ0FRLGVBQUsrQixNQUFMO0FBQ0Q7QUFwQlUsT0FBYjtBQXNCRDs7OzJCQUNPUyxNLEVBQVE7QUFDZCxXQUFLbEQsUUFBTCxHQUFnQmtELE9BQU9SLEtBQXZCO0FBQ0EsVUFBSVMsT0FBTyxJQUFYO0FBQ0FBLFdBQUtqRCxHQUFMLEdBQVcsT0FBWDtBQUNBLFVBQUlJLEtBQUs2QyxLQUFLbkQsUUFBZDtBQUNBbUQsV0FBS2xELE1BQUwsR0FBYyxFQUFkO0FBQ0EsVUFBSWEsUUFBUSxDQUFDLE1BQUQsRUFBUSxLQUFSLEVBQWMsS0FBZCxDQUFaO0FBQ0FGLFNBQUd3QyxxQkFBSCxDQUF5QjtBQUN2QnRDLGVBQU9BLE1BQU1SLEVBQU47QUFEZ0IsT0FBekI7QUFHQSxXQUFLeUIsT0FBTCxDQUFhc0IsV0FBYixDQUF5QixVQUFVdEQsUUFBVixFQUFvQjtBQUMzQyxZQUFJQSxRQUFKLEVBQWM7QUFDWm9ELGVBQUtwRCxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBb0QsZUFBS1YsTUFBTDtBQUNEO0FBQ0YsT0FMRDtBQU1BVSxXQUFLRyxTQUFMLENBQWUsS0FBS3RELFFBQXBCLEVBQTZCLEVBQTdCO0FBQ0Q7Ozt3Q0FDbUI7QUFDbEIsVUFBSU0sS0FBSyxLQUFLTixRQUFkO0FBQ0EsV0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxXQUFLQyxHQUFMLEdBQVcsT0FBWDtBQUNBLFdBQUtvRCxTQUFMLENBQWUsS0FBS3RELFFBQXBCLEVBQTZCLEVBQTdCO0FBQ0Q7Ozs7RUEvRzZCLGVBQUt1RCxJOztrQkFBaEI3RCxFIiwiZmlsZSI6InpkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFpkIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IHRydWUsXHJcbiAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycgXHJcbiAgfVxyXG4gIGRhdGEgPSB7XHJcbiAgICB1c2VySW5mbzogbnVsbCxcclxuICAgIHRhYmluZGV4OiAwLFxyXG4gICAgemRMaXN0OiBudWxsLG1zZzogJ+WKoOi9veaVsOaNruS4rSdcclxuICB9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGdldGluZm8gKGUpIHtcclxuICAgICAgbGV0IGlkID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuZGlkIFxyXG4gICAgICBsZXQgdGhhdCA9IHRoaXNcclxuICAgICAgbGV0IHJvdyA9ICB0aGF0LnpkTGlzdFtpZF1cclxuICAgICAgaWYgKHRoYXQudGFiaW5kZXg9PTApIHtcclxuICAgICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICfnlLPor7fov5TliKknLFxyXG4gICAgICAgICAgY29udGVudDogJ+ehruWumui/m+ihjOeUs+ivt+i/lOWIqScsXHJcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+ehruWumicpXHJcbiAgICAgICAgICAgICAgdGhhdC50aXhpYW4oe3Jld2FyZElkOiByb3cuaWR9KVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZXQgKGUpIHtcclxuICAgICAgd2VweS5zd2l0Y2hUYWIoe1xyXG4gICAgICAgICAgdXJsOiAnL3BhZ2VzL3VzZXInXHJcbiAgICAgIH0pIFxyXG4gICAgfVxyXG4gIH1cclxuICB0aXhpYW4gKGQpIHtcclxuICAgIGxldCB0aGF0ID0gdGhpc1xyXG4gICAgaWYgKCFkKSB7IGQgPSB7fSB9XHJcbiAgICBkLm9wZW5pZCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdPcGVuaWQnKVxyXG4gICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiB0aGF0LiRwYXJlbnQuZ2xvYmFsRGF0YS51cmwgKyAnYXBwbHlSZXdhcmQnLFxyXG4gICAgICBkYXRhOiBkLFxyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6J2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LFxyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihkcykgeyBcclxuICAgICAgIGNvbnNvbGUubG9nKGRzLmRhdGEpXHJcbiAgICAgICAgdmFyIGRhdGEgPSBkcy5kYXRhLmNvZGVcclxuICAgICAgICBpZiAoIWRhdGEpIHsgIHJldHVybiB9XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn562J5b6F5ZCO5Y+w5a6h5qC4JyxcclxuICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcclxuICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGF0Lm9uUHVsbERvd25SZWZyZXNoKClcclxuICAgICAgICB0aGF0LiRhcHBseSgpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG4gIGdldGRkbGlzdCAoaW5kZXgsZCkge1xyXG4gICAgaWYgKCFkKSB7IGQgPSB7fSB9XHJcbiAgICBsZXQgdGhhdCA9IHRoaXNcclxuICAgIGQub3BlbmlkID0gd3guZ2V0U3RvcmFnZVN5bmMoJ09wZW5pZCcpXHJcbiAgICBkLndpdGhkcmF3YWxzRmxhZyA9IGluZGV4XHJcbiAgICBkLmFwcGlkID0gdGhhdC4kcGFyZW50Lmdsb2JhbERhdGEuQVBQSURcclxuICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgIHVybDogdGhhdC4kcGFyZW50Lmdsb2JhbERhdGEudXJsICsgJ3Jld2FyZExpc3QnLFxyXG4gICAgICBkYXRhOiBkLFxyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6J2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LFxyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihkcykgeyBcclxuICAgICAgICB3ZXB5LnN0b3BQdWxsRG93blJlZnJlc2goKVxyXG4gICAgICAgIHZhciBkYXRhID0gZHMuZGF0YS5kYXRhXHJcbiAgICAgICAgaWYgKCFkYXRhKSB7ICBcclxuICAgICAgICAgIHRoYXQubXNnID0gJ+W3suWKoOi9veWFqOmDqCcgXHJcbiAgICAgICAgICB0aGF0LiRhcHBseSgpXHJcbiAgICAgICAgICByZXR1cm4gXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGxldCBsZW5ndCA9IHRoYXQuemRMaXN0Lmxlbmd0aFxyXG4gICAgICAgICAgdGhhdC56ZExpc3RbbGVuZ3RdID0gZGF0YVtpXVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGF0Lm1zZyA9ICflt7LliqDovb3lrozmr5UnXHJcbiAgICAgICAgdGhhdC4kYXBwbHkoKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuICBvbkxvYWQgKG9wdGlvbikge1xyXG4gICAgdGhpcy50YWJpbmRleCA9IG9wdGlvbi5pbmRleFxyXG4gICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICBzZWxmLm1zZyA9ICfliqDovb3mlbDmja7kuK0nXHJcbiAgICBsZXQgaWQgPSBzZWxmLnRhYmluZGV4XHJcbiAgICBzZWxmLnpkTGlzdCA9IFtdXHJcbiAgICBsZXQgdGl0bGUgPSBbJ+eUs+ivt+i/lOWIqScsJ+eUs+ivt+S4rScsJ+W3suWIsOW4kCddXHJcbiAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xyXG4gICAgICB0aXRsZTogdGl0bGVbaWRdXHJcbiAgICB9KVxyXG4gICAgdGhpcy4kcGFyZW50LmdldFVzZXJJbmZvKGZ1bmN0aW9uICh1c2VySW5mbykge1xyXG4gICAgICBpZiAodXNlckluZm8pIHtcclxuICAgICAgICBzZWxmLnVzZXJJbmZvID0gdXNlckluZm9cclxuICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICBzZWxmLmdldGRkbGlzdCh0aGlzLnRhYmluZGV4LHt9KVxyXG4gIH1cclxuICBvblB1bGxEb3duUmVmcmVzaCgpIHtcclxuICAgIGxldCBpZCA9IHRoaXMudGFiaW5kZXhcclxuICAgIHRoaXMuemRMaXN0ID0gW11cclxuICAgIHRoaXMubXNnID0gJ+WKoOi9veaVsOaNruS4rSdcclxuICAgIHRoaXMuZ2V0ZGRsaXN0KHRoaXMudGFiaW5kZXgse30pXHJcbiAgfVxyXG59XHJcbiJdfQ==