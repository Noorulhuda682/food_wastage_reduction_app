"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DrawerToggleButton;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _elements = require("@react-navigation/elements");

var _native = require("@react-navigation/native");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function DrawerToggleButton({
  tintColor,
  ...rest
}) {
  const navigation = (0, _native.useNavigation)();
  return /*#__PURE__*/React.createElement(_elements.PlatformPressable, _extends({}, rest, {
    accessible: true,
    accessibilityRole: "button",
    android_ripple: {
      borderless: true
    },
    onPress: () => navigation.dispatch(_native.DrawerActions.toggleDrawer()),
    style: styles.touchable,
    hitSlop: _reactNative.Platform.select({
      ios: undefined,
      default: {
        top: 16,
        right: 16,
        bottom: 16,
        left: 16
      }
    })
  }), /*#__PURE__*/React.createElement(_reactNative.Image, {
    style: [styles.icon, tintColor ? {
      tintColor
    } : null],
    source: require('./assets/toggle-drawer-icon.png'),
    fadeDuration: 0
  }));
}

const styles = _reactNative.StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
    margin: 3,
    resizeMode: 'contain'
  },
  touchable: {
    marginHorizontal: 11
  }
});
//# sourceMappingURL=DrawerToggleButton.js.map