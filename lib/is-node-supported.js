'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNodeSupported;

var _nodeType = require('./node-type');

var _nodeType2 = _interopRequireDefault(_nodeType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isNodeSupported() {
  var node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return !(isTagNameIgnored(node.tagName) || isNodeTypeIgnored(node.nodeType) || isNodeValueIgnored(node.nodeValue));
}

/**
 * Tag names that are not supported.
 * @type {Array}
 */
var IGNORED_TAG_NAMES = ['script'];
/**
 * Checks if provided tag name is ignored (not supported).
 * @param {String} tagName
 * @return {Boolean}
 */
var isTagNameIgnored = function isTagNameIgnored() {
  var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return IGNORED_TAG_NAMES.indexOf(tagName.toLowerCase()) > -1;
};

/**
 * Node types that are not supported.
 * @type {Array}
 */
var IGNORED_NODE_TYPES = [_nodeType2.default.COMMENT];
/**
 * Checks if provided node type is ignored (not supported).
 * @param {Number} nodeType
 * @return {Boolean}
 */
var isNodeTypeIgnored = function isNodeTypeIgnored(nodeType) {
  return IGNORED_NODE_TYPES.indexOf(nodeType) > -1;
};

/**
 * Checks if provided node value is ignored (not supported).
 * @param {String} nodeValue
 * @return {Boolean}
 */
var isNodeValueIgnored = function isNodeValueIgnored(nodeValue) {
  return nodeValue !== null && nodeValue === '';
};