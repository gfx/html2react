'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _HTMLDOMPropertyConfig = require('react-dom/lib/HTMLDOMPropertyConfig');

var _HTMLDOMPropertyConfig2 = _interopRequireDefault(_HTMLDOMPropertyConfig);

var _SVGDOMPropertyConfig = require('react-dom/lib/SVGDOMPropertyConfig');

var _SVGDOMPropertyConfig2 = _interopRequireDefault(_SVGDOMPropertyConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Object with HTML attributes mapped to React properties (IDL attributes)
 * @type {Object}
 */
var HTMLProperties = Object.keys(_HTMLDOMPropertyConfig2.default.Properties).reduce(function (acc, key) {
  var DOMAttributeName = _HTMLDOMPropertyConfig2.default.DOMAttributeNames[key];
  var mappedKey = DOMAttributeName || (key || '').toLowerCase();
  acc[mappedKey] = key;
  return acc;
}, {});

/**
 * Object with SVG attributes mapped to React properties (IDL attributes)
 * @type {Object}
 */
var SVGProperties = Object.keys(_SVGDOMPropertyConfig2.default.DOMAttributeNames).reduce(function (acc, key) {
  var mappedKey = _SVGDOMPropertyConfig2.default.DOMAttributeNames[key];
  acc[mappedKey] = key;
  return acc;
}, {});

exports.default = _extends({}, HTMLProperties, SVGProperties);