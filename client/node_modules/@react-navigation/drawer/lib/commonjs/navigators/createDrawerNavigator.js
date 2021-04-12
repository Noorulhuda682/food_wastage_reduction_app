"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _native = require("@react-navigation/native");

var _warnOnce = _interopRequireDefault(require("warn-once"));

var _DrawerView = _interopRequireDefault(require("../views/DrawerView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function DrawerNavigator({
  initialRouteName,
  openByDefault,
  backBehavior,
  children,
  screenOptions,
  // @ts-expect-error: lazy is deprecated
  lazy,
  // @ts-expect-error: drawerContentOptions is deprecated
  drawerContentOptions,
  ...rest
}) {
  let defaultScreenOptions = {};

  if (drawerContentOptions) {
    Object.assign(defaultScreenOptions, {
      drawerPosition: drawerContentOptions.drawerPosition,
      drawerType: drawerContentOptions.drawerType,
      swipeEdgeWidth: drawerContentOptions.edgeWidth,
      drawerHideStatusBarOnOpen: drawerContentOptions.hideStatusBar,
      keyboardDismissMode: drawerContentOptions.keyboardDismissMode,
      swipeMinDistance: drawerContentOptions.minSwipeDistance,
      overlayColor: drawerContentOptions.overlayColor,
      drawerStatusBarAnimation: drawerContentOptions.statusBarAnimation,
      gestureHandlerProps: drawerContentOptions.gestureHandlerProps
    });
    (0, _warnOnce.default)(drawerContentOptions, `Drawer Navigator: 'drawerContentOptions' is deprecated. Migrate the options to 'screenOptions' instead.\n\nPlace the following in 'screenOptions' in your code to keep current behavior:\n\n${JSON.stringify(defaultScreenOptions, null, 2)}\n\nSee https://reactnavigation.org/docs/6.x/drawer-navigator#options for more details.`);
  }

  if (typeof lazy === 'boolean') {
    defaultScreenOptions.lazy = lazy;
    (0, _warnOnce.default)(true, `Drawer Navigator: 'lazy' in props is deprecated. Move it to 'screenOptions' instead.`);
  }

  const {
    state,
    descriptors,
    navigation
  } = (0, _native.useNavigationBuilder)(_native.DrawerRouter, {
    initialRouteName,
    openByDefault,
    backBehavior,
    children,
    screenOptions,
    defaultScreenOptions
  });
  return /*#__PURE__*/React.createElement(_DrawerView.default, _extends({}, rest, {
    state: state,
    descriptors: descriptors,
    navigation: navigation
  }));
}

var _default = (0, _native.createNavigatorFactory)(DrawerNavigator);

exports.default = _default;
//# sourceMappingURL=createDrawerNavigator.js.map