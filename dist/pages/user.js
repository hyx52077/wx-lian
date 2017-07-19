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
      this.$parent.getUserInfo(function (userInfo) {
        console.log(userInfo);
        if (userInfo) {
          self.userInfo = userInfo;
          self.show = _wepy2.default.getStorageSync('ShowSid');
          self.$apply();
        }
      });
    }
  }, {
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      var self = this;
      _wepy2.default.showNavigationBarLoading();
      this.$parent.websetsid(function (userInfo) {
        console.log(userInfo);
        if (userInfo) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiVXNlciIsImNvbmZpZyIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsImRhdGEiLCJ1c2VySW5mbyIsInNob3ciLCJhbGxNb25leSIsIm1ldGhvZHMiLCJzY2FuQ29kZSIsImUiLCJ0aGF0Iiwic3VjY2VzcyIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJwYXRoIiwiaW5kZXhPZiIsImRkIiwic3Vic3RyaW5nIiwibGVuZ3RoIiwiJHBhcmVudCIsInNob3dwYXkiLCJnb2RkIiwic3dpdGNoVGFiIiwidXJsIiwiZ296ZCIsIm5hdmlnYXRlVG8iLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsInNpZCIsIm9wdGlvbiIsInNlbGYiLCJnZXRTdG9yYWdlU3luYyIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsInRpdGxlIiwiZ2V0VXNlckluZm8iLCIkYXBwbHkiLCJzaG93TmF2aWdhdGlvbkJhckxvYWRpbmciLCJ3ZWJzZXRzaWQiLCJzdG9wUHVsbERvd25SZWZyZXNoIiwiaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSTs7Ozs7Ozs7Ozs7Ozs7a0xBQ2ZDLE0sR0FBUztBQUNQQyw2QkFBdUI7QUFEaEIsSyxRQUdUQyxJLEdBQU87QUFDTEMsZ0JBQVUsRUFETDtBQUVMQyxZQUFNLEtBRkQ7QUFHTEMsZ0JBQVU7QUFITCxLLFFBS1BDLE8sR0FBVTtBQUNSQyxjQURRLG9CQUNFQyxDQURGLEVBQ0s7QUFDWCxZQUFJQyxPQUFPLElBQVg7QUFDQSx1QkFBS0YsUUFBTCxDQUFjO0FBQ1pHLG1CQUFTLGlCQUFDQyxHQUFELEVBQVM7QUFDaEJDLG9CQUFRQyxHQUFSLENBQVlGLElBQUlHLElBQWhCO0FBQ0EsZ0JBQUlILElBQUlHLElBQUosSUFBWSxFQUFaLElBQWtCSCxJQUFJRyxJQUFKLENBQVNDLE9BQVQsQ0FBaUIsT0FBakIsSUFBNEIsQ0FBbEQsRUFBcUQ7QUFDbkQsa0JBQUlDLEtBQUtMLElBQUlHLElBQUosQ0FBU0csU0FBVCxDQUFtQk4sSUFBSUcsSUFBSixDQUFTQyxPQUFULENBQWlCLE9BQWpCLElBQTBCLENBQTdDLEVBQStDSixJQUFJRyxJQUFKLENBQVNJLE1BQXhELENBQVQ7QUFDQSxrQkFBSUYsT0FBTyxNQUFQLElBQWlCQSxPQUFPLFdBQTVCLEVBQXlDO0FBQ3ZDQSxxQkFBSyxJQUFMO0FBQ0Q7QUFDREEsbUJBQUtBLEtBQUdBLEVBQUgsR0FBTSxJQUFYO0FBQ0FQLG1CQUFLVSxPQUFMLENBQWFDLE9BQWIsQ0FBcUJKLEVBQXJCO0FBQ0Q7QUFDRjtBQVhXLFNBQWQ7QUFhRCxPQWhCTztBQWlCUkssVUFqQlEsZ0JBaUJGYixDQWpCRSxFQWlCQztBQUNQLHVCQUFLYyxTQUFMLENBQWU7QUFDYkMsZUFBSztBQURRLFNBQWY7QUFHRCxPQXJCTztBQXNCUkMsVUF0QlEsZ0JBc0JGaEIsQ0F0QkUsRUFzQkM7QUFDTix1QkFBS2lCLFVBQUwsQ0FBZ0I7QUFDZkYsZUFBSyxxQkFBcUJmLEVBQUVrQixhQUFGLENBQWdCQyxPQUFoQixDQUF3QkM7QUFEbkMsU0FBaEI7QUFHRjtBQTFCTyxLOzs7OzsyQkE0QkZDLE0sRUFBUTtBQUNkLFVBQUlDLE9BQU8sSUFBWDtBQUNBQSxXQUFLMUIsSUFBTCxHQUFZLGVBQUsyQixjQUFMLENBQW9CLFNBQXBCLENBQVo7QUFDQSxxQkFBS0MscUJBQUwsQ0FBMkI7QUFDekJDLGVBQU87QUFEa0IsT0FBM0I7QUFHQSxXQUFLZCxPQUFMLENBQWFlLFdBQWIsQ0FBeUIsVUFBVS9CLFFBQVYsRUFBb0I7QUFDM0NTLGdCQUFRQyxHQUFSLENBQVlWLFFBQVo7QUFDQSxZQUFJQSxRQUFKLEVBQWM7QUFDWjJCLGVBQUszQixRQUFMLEdBQWdCQSxRQUFoQjtBQUNBMkIsZUFBSzFCLElBQUwsR0FBWSxlQUFLMkIsY0FBTCxDQUFvQixTQUFwQixDQUFaO0FBQ0FELGVBQUtLLE1BQUw7QUFDRDtBQUNGLE9BUEQ7QUFRRDs7O3dDQUNvQjtBQUNuQixVQUFJTCxPQUFPLElBQVg7QUFDQSxxQkFBS00sd0JBQUw7QUFDQSxXQUFLakIsT0FBTCxDQUFha0IsU0FBYixDQUF1QixVQUFVbEMsUUFBVixFQUFvQjtBQUN6Q1MsZ0JBQVFDLEdBQVIsQ0FBWVYsUUFBWjtBQUNBLFlBQUlBLFFBQUosRUFBYztBQUNaMkIsZUFBSzNCLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EyQixlQUFLMUIsSUFBTCxHQUFZLGVBQUsyQixjQUFMLENBQW9CLFNBQXBCLENBQVo7QUFDQUQsZUFBS0ssTUFBTDtBQUNBLHlCQUFLRyxtQkFBTDtBQUNBLHlCQUFLQyx3QkFBTDtBQUNEO0FBQ0YsT0FURDtBQVVEOzs7O0VBakUyQixlQUFLQyxJOztrQkFBbEJ6QyxJIiwiZmlsZSI6InVzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweScgXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXIgZXh0ZW5kcyB3ZXB5LnBhZ2UgeyBcclxuICAgICAgY29uZmlnID0ge1xyXG4gICAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZVxyXG4gICAgICB9XHJcbiAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgdXNlckluZm86IHt9LFxyXG4gICAgICAgIHNob3c6IGZhbHNlLFxyXG4gICAgICAgIGFsbE1vbmV5OiAwXHJcbiAgICAgIH1cclxuICAgICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBzY2FuQ29kZSAoZSkge1xyXG4gICAgICAgICAgbGV0IHRoYXQgPSB0aGlzXHJcbiAgICAgICAgICB3ZXB5LnNjYW5Db2RlKHtcclxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5wYXRoKVxyXG4gICAgICAgICAgICAgIGlmIChyZXMucGF0aCAhPSAnJyAmJiByZXMucGF0aC5pbmRleE9mKCdzY2VuZScpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRkID0gcmVzLnBhdGguc3Vic3RyaW5nKHJlcy5wYXRoLmluZGV4T2YoJ3NjZW5lJykrNixyZXMucGF0aC5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICBpZiAoZGQgPT09ICdudWxsJyB8fCBkZCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICAgZGQgPSBudWxsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZCA9IGRkP2RkOm51bGxcclxuICAgICAgICAgICAgICAgIHRoYXQuJHBhcmVudC5zaG93cGF5KGRkKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdvZGQgKGUpIHtcclxuICAgICAgICAgIHdlcHkuc3dpdGNoVGFiKHtcclxuICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL2RkJ1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdvemQgKGUpIHsgXHJcbiAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL3pkP2luZGV4PScgKyBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5zaWQgXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBvbkxvYWQgKG9wdGlvbikge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHNlbGYuc2hvdyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ1Nob3dTaWQnKVxyXG4gICAgICAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcclxuICAgICAgICAgIHRpdGxlOiAn5Liq5Lq65Lit5b+DJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy4kcGFyZW50LmdldFVzZXJJbmZvKGZ1bmN0aW9uICh1c2VySW5mbykge1xyXG4gICAgICAgICAgY29uc29sZS5sb2codXNlckluZm8pXHJcbiAgICAgICAgICBpZiAodXNlckluZm8pIHtcclxuICAgICAgICAgICAgc2VsZi51c2VySW5mbyA9IHVzZXJJbmZvXHJcbiAgICAgICAgICAgIHNlbGYuc2hvdyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ1Nob3dTaWQnKVxyXG4gICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkgXHJcbiAgICAgIH1cclxuICAgICAgb25QdWxsRG93blJlZnJlc2ggKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHdlcHkuc2hvd05hdmlnYXRpb25CYXJMb2FkaW5nKClcclxuICAgICAgICB0aGlzLiRwYXJlbnQud2Vic2V0c2lkKGZ1bmN0aW9uICh1c2VySW5mbykge1xyXG4gICAgICAgICAgY29uc29sZS5sb2codXNlckluZm8pXHJcbiAgICAgICAgICBpZiAodXNlckluZm8pIHtcclxuICAgICAgICAgICAgc2VsZi51c2VySW5mbyA9IHVzZXJJbmZvXHJcbiAgICAgICAgICAgIHNlbGYuc2hvdyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ1Nob3dTaWQnKVxyXG4gICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgIHdlcHkuc3RvcFB1bGxEb3duUmVmcmVzaCgpXHJcbiAgICAgICAgICAgIHdlcHkuaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nKClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KSBcclxuICAgICAgfVxyXG59XHJcbiJdfQ==