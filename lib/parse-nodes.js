'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = parseNodes;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getElementOverride = require('./get-element-override');

var _getElementOverride2 = _interopRequireDefault(_getElementOverride);

var _getPropsFromAttributes = require('./get-props-from-attributes');

var _getPropsFromAttributes2 = _interopRequireDefault(_getPropsFromAttributes);

var _isElementChildrenSupported = require('./is-element-children-supported');

var _isElementChildrenSupported2 = _interopRequireDefault(_isElementChildrenSupported);

var _isNodeSupported = require('./is-node-supported');

var _isNodeSupported2 = _interopRequireDefault(_isNodeSupported);

var _nodeType = require('./node-type');

var _nodeType2 = _interopRequireDefault(_nodeType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseNodes() {
  var nodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var elementOverrides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return Array.from(nodes).filter(_isNodeSupported2.default).map(function (node, index) {
    if (node.nodeType === _nodeType2.default.ELEMENT) {
      return parseElementNode(node, index, elementOverrides);
    }
    return node.nodeValue;
  });
}

function getElementChildren(element, overrides) {
  if ((0, _isElementChildrenSupported2.default)(element)) {
    return parseNodes(element.childNodes, overrides);
  }
}

function getElementProps(element, key) {
  return _extends({}, (0, _getPropsFromAttributes2.default)(element), {
    key: key
  });
}

function parseElementNode(element, key, overrides) {
  var children = getElementChildren(element, overrides);
  var override = (0, _getElementOverride2.default)(element, overrides);
  var tagName = element.tagName.toLowerCase();
  var props = getElementProps(element, key);
  var args = [override || tagName, props];

  if (children) {
    // https://facebook.github.io/react/docs/forms.html#why-textarea-value
    if (tagName === 'textarea') {
      props.defaultValue = children;
    } else {
      args.push(children);
    }
  }

  return _react2.default.createElement.apply(_react2.default, args);
}