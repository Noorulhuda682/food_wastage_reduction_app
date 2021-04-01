function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { Platform } from 'react-native';
import { Screen, screensEnabled // @ts-ignore
, shouldUseActivityState } from 'react-native-screens';
import { ResourceSavingView } from '@react-navigation/elements';
export default function ScreenFallback({
  visible,
  children,
  ...rest
}) {
  // react-native-screens is buggy on web
  if (screensEnabled !== null && screensEnabled !== void 0 && screensEnabled() && Platform.OS !== 'web') {
    if (shouldUseActivityState) {
      return /*#__PURE__*/React.createElement(Screen, _extends({
        activityState: visible ? 2 : 0
      }, rest), children);
    } else {
      return /*#__PURE__*/React.createElement(Screen, _extends({
        active: visible ? 1 : 0
      }, rest), children);
    }
  }

  return /*#__PURE__*/React.createElement(ResourceSavingView, _extends({
    visible: visible
  }, rest), children);
}
//# sourceMappingURL=ScreenFallback.js.map