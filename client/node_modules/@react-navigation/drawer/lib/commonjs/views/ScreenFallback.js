"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ScreenFallback;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeScreens = require("react-native-screens");

var _elements = require("@react-navigation/elements");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ScreenFallback({
  visible,
  children,
  ...rest
}) {
  // react-native-screens is buggy on web
  if (_reactNativeScreens.screensEnabled !== null && _reactNativeScreens.screensEnabled !== void 0 && (0, _reactNativeScreens.screensEnabled)() && _reactNative.Platform.OS !== 'web') {
    if (_reactNativeScreens.shouldUseActivityState) {
      return /*#__PURE__*/React.createElement(_reactNativeScreens.Screen, _extends({
        activityState: visible ? 2 : 0
      }, rest), children);
    } else {
      return /*#__PURE__*/React.createElement(_reactNativeScreens.Screen, _extends({
        active: visible ? 1 : 0
      }, rest), children);
    }
  }

  return /*#__PURE__*/React.createElement(_elements.ResourceSavingView, _extends({
    visible: visible
  }, rest), children);
}
//# sourceMappingURL=ScreenFallback.js.map