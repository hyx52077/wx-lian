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

var User = function (_wepy$page) {
  _inherits(User, _wepy$page);

  function User() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, User);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = User.__proto__ || Object.getPrototypeOf(User)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      enablePullDownRefresh: true
    }, _this.data = {
      userInfo: {},
      show: false,
      allMoney: 0
    }, _this.methods = {
      scanCode: function scanCode(e) {
        var that = this;
        _wepy2.default.scanCode({
          success: function success(res) {
            console.log(res.path);
            if (res.path != '' && res.path.indexOf('scene') > 0) {
              var dd = res.path.substring(res.path.indexOf('scene') + 6, res.path.length);
              if (dd === 'null' || dd === 'undefined') {
                dd = null;
              }
              dd = dd ? dd : null;
              that.$parent.showpay(dd);
            }
          }
        });
      },
      godd: function godd(e) {
        _wepy2.default.switchTab({
          url: '/pages/dd'
        });
      },
      gozd: function gozd(e) {
        _wepy2.default.navigateTo({
          url: '/pages/zd?index=' + e.currentTarget.dataset.sid
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(User, [{
    key: 'onLoad',
    value: function onLoad(option) {
      var self = this;
      self.show = _wepy2.default.getStorageSync('ShowSid');
      _wepy2.default.setNavigationBarTitle({
        title: '个人中心'
      });
      console.log("加载用户信息");
      this.$parent.getUserInfo(function (userInfo) {
        console.log(userInfo);
        if (userInfo['error']) {
          _wepy2.default.showModal({
            title: '获取用户失败',
            content: userInfo['msg'],
            showCancel: false
          });
        } else {
          self.userInfo = userInfo;
          self.show = _wepy2.default.getStorageSync('ShowSid');
          self.$apply();
          _wepy2.default.stopPullDownRefresh();
          _wepy2.default.hideNavigationBarLoading();
        }
      });
    }
  }, {
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      var self = this;
      _wepy2.default.showNavigationBarLoading();
      this.$parent.websetsid(function (userInfo) {
        if (userInfo['error']) {
          _wepy2.default.showModal({
            title: '获取用户失败',
            content: userInfo['msg'],
            showCancel: false
          });
        } else {
          self.userInfo = userInfo;
          self.show = _wepy2.default.getStorageSync('ShowSid');
          self.$apply();
          _wepy2.default.stopPullDownRefresh();
          _wepy2.default.hideNavigationBarLoading();
        }
      });
    }
  }]);

  return User;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(User , 'pages/user'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiVXNlciIsImNvbmZpZyIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsImRhdGEiLCJ1c2VySW5mbyIsInNob3ciLCJhbGxNb25leSIsIm1ldGhvZHMiLCJzY2FuQ29kZSIsImUiLCJ0aGF0Iiwic3VjY2VzcyIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJwYXRoIiwiaW5kZXhPZiIsImRkIiwic3Vic3RyaW5nIiwibGVuZ3RoIiwiJHBhcmVudCIsInNob3dwYXkiLCJnb2RkIiwic3dpdGNoVGFiIiwidXJsIiwiZ296ZCIsIm5hdmlnYXRlVG8iLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsInNpZCIsIm9wdGlvbiIsInNlbGYiLCJnZXRTdG9yYWdlU3luYyIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsInRpdGxlIiwiZ2V0VXNlckluZm8iLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsIiRhcHBseSIsInN0b3BQdWxsRG93blJlZnJlc2giLCJoaWRlTmF2aWdhdGlvbkJhckxvYWRpbmciLCJzaG93TmF2aWdhdGlvbkJhckxvYWRpbmciLCJ3ZWJzZXRzaWQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxJOzs7Ozs7Ozs7Ozs7OztrTEFDZkMsTSxHQUFTO0FBQ1BDLDZCQUF1QjtBQURoQixLLFFBR1RDLEksR0FBTztBQUNMQyxnQkFBVSxFQURMO0FBRUxDLFlBQU0sS0FGRDtBQUdMQyxnQkFBVTtBQUhMLEssUUFLUEMsTyxHQUFVO0FBQ1JDLGNBRFEsb0JBQ0VDLENBREYsRUFDSztBQUNYLFlBQUlDLE9BQU8sSUFBWDtBQUNBLHVCQUFLRixRQUFMLENBQWM7QUFDWkcsbUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQkMsb0JBQVFDLEdBQVIsQ0FBWUYsSUFBSUcsSUFBaEI7QUFDQSxnQkFBSUgsSUFBSUcsSUFBSixJQUFZLEVBQVosSUFBa0JILElBQUlHLElBQUosQ0FBU0MsT0FBVCxDQUFpQixPQUFqQixJQUE0QixDQUFsRCxFQUFxRDtBQUNuRCxrQkFBSUMsS0FBS0wsSUFBSUcsSUFBSixDQUFTRyxTQUFULENBQW1CTixJQUFJRyxJQUFKLENBQVNDLE9BQVQsQ0FBaUIsT0FBakIsSUFBMEIsQ0FBN0MsRUFBK0NKLElBQUlHLElBQUosQ0FBU0ksTUFBeEQsQ0FBVDtBQUNBLGtCQUFJRixPQUFPLE1BQVAsSUFBaUJBLE9BQU8sV0FBNUIsRUFBeUM7QUFDdkNBLHFCQUFLLElBQUw7QUFDRDtBQUNEQSxtQkFBS0EsS0FBR0EsRUFBSCxHQUFNLElBQVg7QUFDQVAsbUJBQUtVLE9BQUwsQ0FBYUMsT0FBYixDQUFxQkosRUFBckI7QUFDRDtBQUNGO0FBWFcsU0FBZDtBQWFELE9BaEJPO0FBaUJSSyxVQWpCUSxnQkFpQkZiLENBakJFLEVBaUJDO0FBQ1AsdUJBQUtjLFNBQUwsQ0FBZTtBQUNiQyxlQUFLO0FBRFEsU0FBZjtBQUdELE9BckJPO0FBc0JSQyxVQXRCUSxnQkFzQkZoQixDQXRCRSxFQXNCQztBQUNOLHVCQUFLaUIsVUFBTCxDQUFnQjtBQUNmRixlQUFLLHFCQUFxQmYsRUFBRWtCLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCQztBQURuQyxTQUFoQjtBQUdGO0FBMUJPLEs7Ozs7OzJCQTRCRkMsTSxFQUFRO0FBQ2QsVUFBSUMsT0FBTyxJQUFYO0FBQ0FBLFdBQUsxQixJQUFMLEdBQVksZUFBSzJCLGNBQUwsQ0FBb0IsU0FBcEIsQ0FBWjtBQUNBLHFCQUFLQyxxQkFBTCxDQUEyQjtBQUN6QkMsZUFBTztBQURrQixPQUEzQjtBQUdBckIsY0FBUUMsR0FBUixDQUFZLFFBQVo7QUFDQSxXQUFLTSxPQUFMLENBQWFlLFdBQWIsQ0FBeUIsVUFBVS9CLFFBQVYsRUFBb0I7QUFDM0NTLGdCQUFRQyxHQUFSLENBQVlWLFFBQVo7QUFDQSxZQUFHQSxTQUFTLE9BQVQsQ0FBSCxFQUFxQjtBQUNuQix5QkFBS2dDLFNBQUwsQ0FBZTtBQUNiRixtQkFBTyxRQURNO0FBRWJHLHFCQUFTakMsU0FBUyxLQUFULENBRkk7QUFHYmtDLHdCQUFXO0FBSEUsV0FBZjtBQUtELFNBTkQsTUFNTztBQUNMUCxlQUFLM0IsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQTJCLGVBQUsxQixJQUFMLEdBQVksZUFBSzJCLGNBQUwsQ0FBb0IsU0FBcEIsQ0FBWjtBQUNBRCxlQUFLUSxNQUFMO0FBQ0EseUJBQUtDLG1CQUFMO0FBQ0EseUJBQUtDLHdCQUFMO0FBQ0Q7QUFDRixPQWZEO0FBZ0JEOzs7d0NBQ29CO0FBQ25CLFVBQUlWLE9BQU8sSUFBWDtBQUNBLHFCQUFLVyx3QkFBTDtBQUNBLFdBQUt0QixPQUFMLENBQWF1QixTQUFiLENBQXVCLFVBQVV2QyxRQUFWLEVBQW9CO0FBQ3pDLFlBQUdBLFNBQVMsT0FBVCxDQUFILEVBQXFCO0FBQ25CLHlCQUFLZ0MsU0FBTCxDQUFlO0FBQ2JGLG1CQUFPLFFBRE07QUFFYkcscUJBQVNqQyxTQUFTLEtBQVQsQ0FGSTtBQUdia0Msd0JBQVc7QUFIRSxXQUFmO0FBS0QsU0FORCxNQU1PO0FBQ0xQLGVBQUszQixRQUFMLEdBQWdCQSxRQUFoQjtBQUNBMkIsZUFBSzFCLElBQUwsR0FBWSxlQUFLMkIsY0FBTCxDQUFvQixTQUFwQixDQUFaO0FBQ0FELGVBQUtRLE1BQUw7QUFDQSx5QkFBS0MsbUJBQUw7QUFDQSx5QkFBS0Msd0JBQUw7QUFDRDtBQUNGLE9BZEQ7QUFlRDs7OztFQS9FMkIsZUFBS0csSTs7a0JBQWxCNUMsSSIsImZpbGUiOiJ1c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknIFxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyIGV4dGVuZHMgd2VweS5wYWdlIHsgXHJcbiAgICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IHRydWVcclxuICAgICAgfVxyXG4gICAgICBkYXRhID0ge1xyXG4gICAgICAgIHVzZXJJbmZvOiB7fSxcclxuICAgICAgICBzaG93OiBmYWxzZSxcclxuICAgICAgICBhbGxNb25leTogMFxyXG4gICAgICB9XHJcbiAgICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgc2NhbkNvZGUgKGUpIHtcclxuICAgICAgICAgIGxldCB0aGF0ID0gdGhpc1xyXG4gICAgICAgICAgd2VweS5zY2FuQ29kZSh7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMucGF0aClcclxuICAgICAgICAgICAgICBpZiAocmVzLnBhdGggIT0gJycgJiYgcmVzLnBhdGguaW5kZXhPZignc2NlbmUnKSA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCBkZCA9IHJlcy5wYXRoLnN1YnN0cmluZyhyZXMucGF0aC5pbmRleE9mKCdzY2VuZScpKzYscmVzLnBhdGgubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgaWYgKGRkID09PSAnbnVsbCcgfHwgZGQgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgIGRkID0gbnVsbFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGQgPSBkZD9kZDpudWxsXHJcbiAgICAgICAgICAgICAgICB0aGF0LiRwYXJlbnQuc2hvd3BheShkZClcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb2RkIChlKSB7XHJcbiAgICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XHJcbiAgICAgICAgICAgIHVybDogJy9wYWdlcy9kZCdcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb3pkIChlKSB7IFxyXG4gICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogJy9wYWdlcy96ZD9pbmRleD0nICsgZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuc2lkIFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgb25Mb2FkIChvcHRpb24pIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICBzZWxmLnNob3cgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdTaG93U2lkJylcclxuICAgICAgICB3ZXB5LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XHJcbiAgICAgICAgICB0aXRsZTogJ+S4quS6uuS4reW/gydcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5Yqg6L2955So5oi35L+h5oGvXCIpXHJcbiAgICAgICAgdGhpcy4kcGFyZW50LmdldFVzZXJJbmZvKGZ1bmN0aW9uICh1c2VySW5mbykge1xyXG4gICAgICAgICAgY29uc29sZS5sb2codXNlckluZm8pXHJcbiAgICAgICAgICBpZih1c2VySW5mb1snZXJyb3InXSl7XHJcbiAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ+iOt+WPlueUqOaIt+Wksei0pScsXHJcbiAgICAgICAgICAgICAgY29udGVudDogdXNlckluZm9bJ21zZyddLFxyXG4gICAgICAgICAgICAgIHNob3dDYW5jZWw6ZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlbGYudXNlckluZm8gPSB1c2VySW5mb1xyXG4gICAgICAgICAgICBzZWxmLnNob3cgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdTaG93U2lkJylcclxuICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICB3ZXB5LnN0b3BQdWxsRG93blJlZnJlc2goKVxyXG4gICAgICAgICAgICB3ZXB5LmhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZygpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkgXHJcbiAgICAgIH1cclxuICAgICAgb25QdWxsRG93blJlZnJlc2ggKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHdlcHkuc2hvd05hdmlnYXRpb25CYXJMb2FkaW5nKClcclxuICAgICAgICB0aGlzLiRwYXJlbnQud2Vic2V0c2lkKGZ1bmN0aW9uICh1c2VySW5mbykge1xyXG4gICAgICAgICAgaWYodXNlckluZm9bJ2Vycm9yJ10pe1xyXG4gICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICfojrflj5bnlKjmiLflpLHotKUnLFxyXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IHVzZXJJbmZvWydtc2cnXSxcclxuICAgICAgICAgICAgICBzaG93Q2FuY2VsOmZhbHNlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZWxmLnVzZXJJbmZvID0gdXNlckluZm9cclxuICAgICAgICAgICAgc2VsZi5zaG93ID0gd2VweS5nZXRTdG9yYWdlU3luYygnU2hvd1NpZCcpXHJcbiAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgd2VweS5zdG9wUHVsbERvd25SZWZyZXNoKClcclxuICAgICAgICAgICAgd2VweS5oaWRlTmF2aWdhdGlvbkJhckxvYWRpbmcoKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pIFxyXG4gICAgICB9XHJcbn1cclxuIl19