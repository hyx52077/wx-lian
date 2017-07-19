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

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      'tapxy': { 'latitude': 23.099994, 'longitude': 113.324520 },
      'mapCtx': null,
      'windowHeight': 300,
      'markerslist': [],
      'markers': [{
        id: 0,
        latitude: 23.109994,
        longitude: 113.323520,
        iconPath: '/images/dian.png',
        width: 35,
        height: 35
      }],
      'controls': [{
        id: 1,
        iconPath: '/images/dingwei.png',
        position: {
          left: 10,
          top: 300 - 50
        },
        clickable: true
      }, {
        id: 2,
        iconPath: '/images/biaoji.png',
        position: {
          left: 50,
          top: 300 - 50,
          width: 0,
          height: 0
        },
        clickable: true
      }]
    }, _this.methods = {
      markertap: function markertap(e) {
        var index = e.markerId;
        var obj = {
          latitude: this.markerslist[index].latitude,
          longitude: this.markerslist[index].longitude,
          scale: 16,
          name: this.markerslist[index].shopName,
          address: this.markerslist[index].shopAddress
        };
        console.log(obj);
        _wepy2.default.openLocation(obj);
      },
      moveToLocation: function moveToLocation() {
        this.mapCtx.moveToLocation();
      },
      dcontroltap: function dcontroltap(e) {
        if (e.controlId === 1) {
          this.mapCtx.moveToLocation();
        }
      },
      regionchange: function regionchange(e) {
        //地图移动
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onReady',
    value: function onReady(e) {
      this.mapCtx = _wepy2.default.createMapContext('dianmap');
    }
  }, {
    key: 'getshopList',
    value: function getshopList() {
      var that = this;
      that.markers = [];

      _wepy2.default.request({
        url: that.$parent.globalData.url + 'shopList',
        data: { 'appid': that.$parent.globalData.APPID },
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function success(data) {
          if (!parseInt(data.data.code)) {
            return;
          }
          var t = that;
          var fun = function fun(k, d) {
            if (!d.shopCoordinate) {
              return;
            }
            var xy = d.shopCoordinate.split(',');

            d.latitude = Number(xy[0]);
            d.longitude = Number(xy[1]);
            var mp = {
              id: t.markers.length,
              latitude: Number(xy[0]),
              longitude: Number(xy[1]),
              iconPath: '/images/dian.png',
              width: 35,
              height: 35
            };
            t.markers[t.markers.length] = mp;
            t.markerslist[t.markerslist.length] = d;
          };
          for (var i = 0; i < data.data.data.length; i++) {
            fun(i, data.data.data[i]);
          }
          that.$apply();
        }
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(option) {
      var selt = this;
      _wepy2.default.setNavigationBarTitle({
        title: '附近商户'
      });
      _wepy2.default.getSystemInfo({
        success: function success(res) {
          selt.windowHeight = res.windowHeight;
          for (var i = selt.controls.length - 1; i >= 0; i--) {
            selt.controls[i].position.top = res.windowHeight - 100;
          }
          selt.controls[1].position.left = res.windowWidth / 2 - 5;
          selt.controls[1].position.top = res.windowHeight / 2 - 5;
          selt.controls[1].position.width = 10;
          selt.controls[1].position.height = 22;
          selt.$apply();
        }
      });
      _wepy2.default.getLocation({
        type: 'wgs84',
        success: function success(res) {
          selt.tapxy = res;
          selt.$apply();
        },
        fail: function fail(e) {
          console.log(e);
          wx.showModal({
            title: '定位失败',
            content: "获取不到当前定位",
            success: function success(res) {
              wx.openSetting();
            }
          });
        }
      });
      selt.getshopList();
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiZGF0YSIsImlkIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJpY29uUGF0aCIsIndpZHRoIiwiaGVpZ2h0IiwicG9zaXRpb24iLCJsZWZ0IiwidG9wIiwiY2xpY2thYmxlIiwibWV0aG9kcyIsIm1hcmtlcnRhcCIsImUiLCJpbmRleCIsIm1hcmtlcklkIiwib2JqIiwibWFya2Vyc2xpc3QiLCJzY2FsZSIsIm5hbWUiLCJzaG9wTmFtZSIsImFkZHJlc3MiLCJzaG9wQWRkcmVzcyIsImNvbnNvbGUiLCJsb2ciLCJvcGVuTG9jYXRpb24iLCJtb3ZlVG9Mb2NhdGlvbiIsIm1hcEN0eCIsImRjb250cm9sdGFwIiwiY29udHJvbElkIiwicmVnaW9uY2hhbmdlIiwiY3JlYXRlTWFwQ29udGV4dCIsInRoYXQiLCJtYXJrZXJzIiwicmVxdWVzdCIsInVybCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiQVBQSUQiLCJtZXRob2QiLCJoZWFkZXIiLCJzdWNjZXNzIiwicGFyc2VJbnQiLCJjb2RlIiwidCIsImZ1biIsImsiLCJkIiwic2hvcENvb3JkaW5hdGUiLCJ4eSIsInNwbGl0IiwiTnVtYmVyIiwibXAiLCJsZW5ndGgiLCJpIiwiJGFwcGx5Iiwib3B0aW9uIiwic2VsdCIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsInRpdGxlIiwiZ2V0U3lzdGVtSW5mbyIsInJlcyIsIndpbmRvd0hlaWdodCIsImNvbnRyb2xzIiwid2luZG93V2lkdGgiLCJnZXRMb2NhdGlvbiIsInR5cGUiLCJ0YXB4eSIsImZhaWwiLCJ3eCIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJvcGVuU2V0dGluZyIsImdldHNob3BMaXN0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxJLEdBQU87QUFDTCxlQUFTLEVBQUMsWUFBWSxTQUFiLEVBQXdCLGFBQWEsVUFB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QWMsQ0FBZCxFQUFpQnhELFFBQWpCLENBQTBCQyxJQUExQixHQUFpQ3FELElBQUlHLFdBQUosR0FBa0IsQ0FBbEIsR0FBc0IsQ0FBdkQ7QUFDQVAsZUFBS00sUUFBTCxDQUFjLENBQWQsRUFBaUJ4RCxRQUFqQixDQUEwQkUsR0FBMUIsR0FBZ0NvRCxJQUFJQyxZQUFKLEdBQW1CLENBQW5CLEdBQXVCLENBQXZEO0FBQ0FMLGVBQUtNLFFBQUwsQ0FBYyxDQUFkLEVBQWlCeEQsUUFBakIsQ0FBMEJGLEtBQTFCLEdBQWtDLEVBQWxDO0FBQ0FvRCxlQUFLTSxRQUFMLENBQWMsQ0FBZCxFQUFpQnhELFFBQWpCLENBQTBCRCxNQUExQixHQUFtQyxFQUFuQztBQUNBbUQsZUFBS0YsTUFBTDtBQUNEO0FBWGdCLE9BQW5CO0FBYUEscUJBQUtVLFdBQUwsQ0FBaUI7QUFDZkMsY0FBTSxPQURTO0FBRWZ6QixpQkFBUyxpQkFBU29CLEdBQVQsRUFBYztBQUNyQkosZUFBS1UsS0FBTCxHQUFhTixHQUFiO0FBQ0FKLGVBQUtGLE1BQUw7QUFDRCxTQUxjO0FBTWZhLGNBQUssY0FBU3ZELENBQVQsRUFBVztBQUNkVSxrQkFBUUMsR0FBUixDQUFZWCxDQUFaO0FBQ0F3RCxhQUFHQyxTQUFILENBQWE7QUFDWFgsbUJBQU8sTUFESTtBQUVYWSxxQkFBUyxVQUZFO0FBR1g5QixxQkFBUyxpQkFBU29CLEdBQVQsRUFBYztBQUN0QlEsaUJBQUdHLFdBQUg7QUFDQTtBQUxVLFdBQWI7QUFPRDtBQWZjLE9BQWpCO0FBaUJBZixXQUFLZ0IsV0FBTDtBQUNEOzs7O0VBM0lnQyxlQUFLQyxJOztrQkFBbkIzRSxLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBkYXRhID0ge1xyXG4gICAgJ3RhcHh5JzogeydsYXRpdHVkZSc6IDIzLjA5OTk5NCwgJ2xvbmdpdHVkZSc6IDExMy4zMjQ1MjB9LFxyXG4gICAgJ21hcEN0eCc6IG51bGwsXHJcbiAgICAnd2luZG93SGVpZ2h0JzogMzAwLFxyXG4gICAgJ21hcmtlcnNsaXN0JzogW10sXHJcbiAgICAnbWFya2Vycyc6IFt7XHJcbiAgICAgIGlkOiAwLFxyXG4gICAgICBsYXRpdHVkZTogMjMuMTA5OTk0LFxyXG4gICAgICBsb25naXR1ZGU6IDExMy4zMjM1MjAsXHJcbiAgICAgIGljb25QYXRoOiAnL2ltYWdlcy9kaWFuLnBuZycsXHJcbiAgICAgIHdpZHRoOiAzNSxcclxuICAgICAgaGVpZ2h0OiAzNVxyXG4gICAgfV0sXHJcbiAgICAnY29udHJvbHMnOiBbe1xyXG4gICAgICBpZDogMSxcclxuICAgICAgaWNvblBhdGg6ICcvaW1hZ2VzL2Rpbmd3ZWkucG5nJyxcclxuICAgICAgcG9zaXRpb246IHtcclxuICAgICAgICBsZWZ0OiAxMCxcclxuICAgICAgICB0b3A6IDMwMCAtIDUwLFxyXG4gICAgICB9LFxyXG4gICAgICBjbGlja2FibGU6IHRydWVcclxuICAgIH0sIHtcclxuICAgICAgaWQ6IDIsXHJcbiAgICAgIGljb25QYXRoOiAnL2ltYWdlcy9iaWFvamkucG5nJyxcclxuICAgICAgcG9zaXRpb246IHtcclxuICAgICAgICBsZWZ0OiA1MCxcclxuICAgICAgICB0b3A6IDMwMCAtIDUwLFxyXG4gICAgICAgIHdpZHRoOiAwLFxyXG4gICAgICAgIGhlaWdodDogMFxyXG4gICAgICB9LFxyXG4gICAgICBjbGlja2FibGU6IHRydWVcclxuICAgIH1dXHJcbiAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBtYXJrZXJ0YXAgKGUpIHtcclxuICAgICAgbGV0IGluZGV4ID0gZS5tYXJrZXJJZFxyXG4gICAgICBsZXQgb2JqID0ge1xyXG4gICAgICAgIGxhdGl0dWRlOiB0aGlzLm1hcmtlcnNsaXN0W2luZGV4XS5sYXRpdHVkZSxcclxuICAgICAgICBsb25naXR1ZGU6IHRoaXMubWFya2Vyc2xpc3RbaW5kZXhdLmxvbmdpdHVkZSxcclxuICAgICAgICBzY2FsZTogMTYsXHJcbiAgICAgICAgbmFtZTogdGhpcy5tYXJrZXJzbGlzdFtpbmRleF0uc2hvcE5hbWUsXHJcbiAgICAgICAgYWRkcmVzczogdGhpcy5tYXJrZXJzbGlzdFtpbmRleF0uc2hvcEFkZHJlc3NcclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLmxvZyhvYmopXHJcbiAgICAgIHdlcHkub3BlbkxvY2F0aW9uKG9iailcclxuICAgIH0sXHJcbiAgICBtb3ZlVG9Mb2NhdGlvbiAoKSB7XHJcbiAgICAgIHRoaXMubWFwQ3R4Lm1vdmVUb0xvY2F0aW9uKClcclxuICAgIH0sXHJcbiAgICBkY29udHJvbHRhcCAoZSkge1xyXG4gICAgICBpZiAoZS5jb250cm9sSWQgPT09IDEpIHtcclxuICAgICAgICB0aGlzLm1hcEN0eC5tb3ZlVG9Mb2NhdGlvbigpXHJcbiAgICAgIH0gXHJcbiAgICB9LFxyXG4gICAgcmVnaW9uY2hhbmdlIChlKSB7XHJcbiAgICAgIC8v5Zyw5Zu+56e75YqoXHJcbiAgICB9XHJcbiAgfVxyXG4gIG9uUmVhZHkgKGUpIHtcclxuICAgIHRoaXMubWFwQ3R4ID0gd2VweS5jcmVhdGVNYXBDb250ZXh0KCdkaWFubWFwJylcclxuICAgXHJcbiAgfVxyXG4gIGdldHNob3BMaXN0ICgpIHtcclxuICAgIGxldCB0aGF0ID0gdGhpc1xyXG4gICAgdGhhdC5tYXJrZXJzID0gW11cclxuXHJcbiAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6IHRoYXQuJHBhcmVudC5nbG9iYWxEYXRhLnVybCArICdzaG9wTGlzdCcsXHJcbiAgICAgIGRhdGE6IHsnYXBwaWQnOiB0aGF0LiRwYXJlbnQuZ2xvYmFsRGF0YS5BUFBJRH0sXHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBoZWFkZXI6IHsnY29udGVudC10eXBlJzonYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30sXHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICBpZighcGFyc2VJbnQoZGF0YS5kYXRhLmNvZGUpKXtcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdCA9IHRoYXRcclxuICAgICAgICBsZXQgZnVuID0gZnVuY3Rpb24oayxkKXtcclxuICAgICAgICAgIGlmICghZC5zaG9wQ29vcmRpbmF0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGxldCB4eSA9IGQuc2hvcENvb3JkaW5hdGUuc3BsaXQoJywnKVxyXG5cclxuICAgICAgICAgIGQubGF0aXR1ZGUgPSBOdW1iZXIoeHlbMF0pXHJcbiAgICAgICAgICBkLmxvbmdpdHVkZSA9IE51bWJlcih4eVsxXSlcclxuICAgICAgICAgIGxldCBtcCA9IHtcclxuICAgICAgICAgICAgICBpZDogdC5tYXJrZXJzLmxlbmd0aCxcclxuICAgICAgICAgICAgICBsYXRpdHVkZTogTnVtYmVyKHh5WzBdKSxcclxuICAgICAgICAgICAgICBsb25naXR1ZGU6IE51bWJlcih4eVsxXSksXHJcbiAgICAgICAgICAgICAgaWNvblBhdGg6ICcvaW1hZ2VzL2RpYW4ucG5nJyxcclxuICAgICAgICAgICAgICB3aWR0aDogMzUsXHJcbiAgICAgICAgICAgICAgaGVpZ2h0OiAzNVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHQubWFya2Vyc1t0Lm1hcmtlcnMubGVuZ3RoXSA9IG1wXHJcbiAgICAgICAgICAgIHQubWFya2Vyc2xpc3RbdC5tYXJrZXJzbGlzdC5sZW5ndGhdID0gZFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmRhdGEuZGF0YS5sZW5ndGggOyBpKyspIHtcclxuICAgICAgICAgICAgZnVuKGksZGF0YS5kYXRhLmRhdGFbaV0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgdGhhdC4kYXBwbHkoKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuICBvbkxvYWQgKG9wdGlvbikge1xyXG4gICAgbGV0IHNlbHQgPSB0aGlzXHJcbiAgICB3ZXB5LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XHJcbiAgICAgIHRpdGxlOiAn6ZmE6L+R5ZWG5oi3J1xyXG4gICAgfSlcclxuICAgIHdlcHkuZ2V0U3lzdGVtSW5mbyh7XHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgIHNlbHQud2luZG93SGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodFxyXG4gICAgICAgIGZvciAodmFyIGkgPSBzZWx0LmNvbnRyb2xzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICBzZWx0LmNvbnRyb2xzW2ldLnBvc2l0aW9uLnRvcCA9IHJlcy53aW5kb3dIZWlnaHQgLSAxMDBcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsdC5jb250cm9sc1sxXS5wb3NpdGlvbi5sZWZ0ID0gcmVzLndpbmRvd1dpZHRoIC8gMiAtIDVcclxuICAgICAgICBzZWx0LmNvbnRyb2xzWzFdLnBvc2l0aW9uLnRvcCA9IHJlcy53aW5kb3dIZWlnaHQgLyAyIC0gNVxyXG4gICAgICAgIHNlbHQuY29udHJvbHNbMV0ucG9zaXRpb24ud2lkdGggPSAxMFxyXG4gICAgICAgIHNlbHQuY29udHJvbHNbMV0ucG9zaXRpb24uaGVpZ2h0ID0gMjJcclxuICAgICAgICBzZWx0LiRhcHBseSgpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICB3ZXB5LmdldExvY2F0aW9uKHtcclxuICAgICAgdHlwZTogJ3dnczg0JyxcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgc2VsdC50YXB4eSA9IHJlc1xyXG4gICAgICAgIHNlbHQuJGFwcGx5KClcclxuICAgICAgfSxcclxuICAgICAgZmFpbDpmdW5jdGlvbihlKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhlKVxyXG4gICAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+WumuS9jeWksei0pScsXHJcbiAgICAgICAgICBjb250ZW50OiBcIuiOt+WPluS4jeWIsOW9k+WJjeWumuS9jVwiLFxyXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgd3gub3BlblNldHRpbmcoKVxyXG4gICAgICAgICAgfSBcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgc2VsdC5nZXRzaG9wTGlzdCgpXHJcbiAgfVxyXG59XHJcblxyXG4iXX0=