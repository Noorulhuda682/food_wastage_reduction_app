"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useDrawerStatus;

var React = _interopRequireWildcard(require("react"));

var _DrawerStatusContext = _interopRequireDefault(require("./DrawerStatusContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Hook to detect if the drawer's status in a parent navigator.
 * Returns 'open' if the drawer is open, 'closed' if the drawer is closed.
 */
function useDrawerStatus() {
  const drawerStatus = React.useContext(_DrawerStatusContext.default);

  if (drawerStatus === undefined) {
    throw new Error("Couldn't find a drawer. Is your component inside a drawer navigator?");
  }

  return drawerStatus;
}
//# sourceMappingURL=useDrawerStatus.js.map