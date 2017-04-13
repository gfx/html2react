'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = getPropsFromAttributes;

var _reactPropertiesMap = require('./react-properties-map');

var _reactPropertiesMap2 = _interopRequireDefault(_reactPropertiesMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getPropsFromAttributes(element) {
  var attributes = Array.from(element.attributes || []);

  return attributes.reduce(function (props, _ref) {
    var name = _ref.name,
        value = _ref.value;

    var propName = getPropName(name, element);
    var propValue = getPropValue(propName, value);
    return _extends({}, props, _defineProperty({}, propName, propValue));
  }, {});
}

function formatStylePropName(propName) {
  // Vendor prefixes other than "ms" should begin with a capital letter.
  // See: https://facebook.github.io/react/tips/inline-styles.html.
  propName = propName.replace(/^(\s+)?-(?=ms)/, '').trim();
  // Turn, for instance, "-webkit-property" into "WebkitProperty"
  // and "font-size" into "fontSize.
  return propName.replace(/(\-\w)/g, function (match) {
    return match[1].toUpperCase();
  });
}

function getStylePropValue(attrValue) {
  var props = attrValue.split(';').filter(function (prop) {
    return !!prop;
  });

  return props.reduce(function (props, prop) {
    var _prop$split = prop.split(/:/),
        _prop$split2 = _slicedToArray(_prop$split, 2),
        propName = _prop$split2[0],
        propValue = _prop$split2[1];

    propName = formatStylePropName(propName);
    return _extends({}, props, _defineProperty({}, propName, propValue && propValue.trim()));
  }, {});
}

function getPropName(attrName, element) {
  var lowerAttrName = attrName.toLowerCase();

  if (lowerAttrName === 'value') {
    var tagName = element.tagName.toLowerCase();
    // https://facebook.github.io/react/docs/forms.html#default-value
    // https://facebook.github.io/react/docs/forms.html#why-select-value
    if (tagName === 'input' || tagName === 'select') {
      return 'defaultValue';
    }
  } else if (lowerAttrName === 'checked') {
    return 'defaultChecked';
  }

  return _reactPropertiesMap2.default[attrName] || attrName;
}

function getPropValue(propName, attrValue) {
  var lowerPropName = propName.toLowerCase();

  if (lowerPropName === 'style') {
    return getStylePropValue(attrValue);
  }

  switch (lowerPropName) {
    case 'checked':
    case 'defaultchecked':
    case 'readonly':
    case 'disabled':
      return true;
  }

  return attrValue;
}