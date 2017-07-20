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

var Dian = function (_wepy$page) {
  _inherits(Dian, _wepy$page);

  function Dian() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Dian);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Dian.__proto__ || Object.getPrototypeOf(Dian)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      home: {}, show: false
    }, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Dian, [{
    key: 'gethome',
    value: function gethome() {
      var that = this;
      _wepy2.default.request({
        url: that.$parent.globalData.url + 'mainPage',
        data: { 'appid': that.$parent.globalData.APPID },
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function success(data) {
          if (!parseInt(data.data.code)) {
            return;
          }
          that.home = data.data.data;
          that.home.shopimages = that.home.shopimages.split(',');
          that.show = true;
          that.$apply();
        }
      });
    }
  }, {
    key: 'onShow',
    value: function onShow(option) {}
  }, {
    key: 'onLoad',
    value: function onLoad(option) {
      var self = this;
      self.gethome();

      _wepy2.default.setNavigationBarTitle({
        title: '首页'
      });
    }
  }]);

  return Dian;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Dian , 'pages/dian'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpYW4uanMiXSwibmFtZXMiOlsiRGlhbiIsImRhdGEiLCJob21lIiwic2hvdyIsIm1ldGhvZHMiLCJ0aGF0IiwicmVxdWVzdCIsInVybCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiQVBQSUQiLCJtZXRob2QiLCJoZWFkZXIiLCJzdWNjZXNzIiwicGFyc2VJbnQiLCJjb2RlIiwic2hvcGltYWdlcyIsInNwbGl0IiwiJGFwcGx5Iiwib3B0aW9uIiwic2VsZiIsImdldGhvbWUiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJ0aXRsZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEk7Ozs7Ozs7Ozs7Ozs7O2tMQUNuQkMsSSxHQUFPO0FBQ0xDLFlBQU0sRUFERCxFQUNLQyxNQUFNO0FBRFgsSyxRQUdQQyxPLEdBQVUsRTs7Ozs7OEJBSUM7QUFDVCxVQUFJQyxPQUFPLElBQVg7QUFDQSxxQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLGFBQUtGLEtBQUtHLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkYsR0FBeEIsR0FBOEIsVUFEeEI7QUFFWE4sY0FBTSxFQUFDLFNBQVNJLEtBQUtHLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkMsS0FBbEMsRUFGSztBQUdYQyxnQkFBUSxNQUhHO0FBSVhDLGdCQUFRLEVBQUMsZ0JBQWUsbUNBQWhCLEVBSkc7QUFLWEMsaUJBQVMsaUJBQVNaLElBQVQsRUFBZTtBQUN0QixjQUFHLENBQUNhLFNBQVNiLEtBQUtBLElBQUwsQ0FBVWMsSUFBbkIsQ0FBSixFQUE2QjtBQUMzQjtBQUNEO0FBQ0RWLGVBQUtILElBQUwsR0FBWUQsS0FBS0EsSUFBTCxDQUFVQSxJQUF0QjtBQUNBSSxlQUFLSCxJQUFMLENBQVVjLFVBQVYsR0FBdUJYLEtBQUtILElBQUwsQ0FBVWMsVUFBVixDQUFxQkMsS0FBckIsQ0FBMkIsR0FBM0IsQ0FBdkI7QUFDQVosZUFBS0YsSUFBTCxHQUFZLElBQVo7QUFDQUUsZUFBS2EsTUFBTDtBQUNEO0FBYlUsT0FBYjtBQWVEOzs7MkJBRU9DLE0sRUFBUSxDQUdmOzs7MkJBQ09BLE0sRUFBUTtBQUNkLFVBQUlDLE9BQU8sSUFBWDtBQUNBQSxXQUFLQyxPQUFMOztBQUVBLHFCQUFLQyxxQkFBTCxDQUEyQjtBQUN6QkMsZUFBTztBQURrQixPQUEzQjtBQUlEOzs7O0VBdkMrQixlQUFLQyxJOztrQkFBbEJ4QixJIiwiZmlsZSI6ImRpYW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlhbiBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgZGF0YSA9IHtcclxuICAgIGhvbWU6IHt9LCBzaG93OiBmYWxzZVxyXG4gIH1cclxuICBtZXRob2RzID0ge1xyXG5cclxuICB9XHJcblxyXG4gIGdldGhvbWUgKCkge1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzXHJcbiAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6IHRoYXQuJHBhcmVudC5nbG9iYWxEYXRhLnVybCArICdtYWluUGFnZScsXHJcbiAgICAgIGRhdGE6IHsnYXBwaWQnOiB0aGF0LiRwYXJlbnQuZ2xvYmFsRGF0YS5BUFBJRH0sXHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzonYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30sXHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICBpZighcGFyc2VJbnQoZGF0YS5kYXRhLmNvZGUpKXtcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGF0LmhvbWUgPSBkYXRhLmRhdGEuZGF0YVxyXG4gICAgICAgIHRoYXQuaG9tZS5zaG9waW1hZ2VzID0gdGhhdC5ob21lLnNob3BpbWFnZXMuc3BsaXQoJywnKVxyXG4gICAgICAgIHRoYXQuc2hvdyA9IHRydWVcclxuICAgICAgICB0aGF0LiRhcHBseSgpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG4gIFxyXG4gIG9uU2hvdyAob3B0aW9uKSB7XHJcbiAgIFxyXG4gICBcclxuICB9XHJcbiAgb25Mb2FkIChvcHRpb24pIHtcclxuICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgc2VsZi5nZXRob21lKClcclxuXHJcbiAgICB3ZXB5LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XHJcbiAgICAgIHRpdGxlOiAn6aaW6aG1J1xyXG4gICAgfSlcclxuICAgXHJcbiAgfVxyXG59XHJcbiJdfQ==