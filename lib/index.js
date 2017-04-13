'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  if (arguments.length === 2) {
    return HTML2React(arguments.length <= 1 ? undefined : arguments[1])(arguments.length <= 0 ? undefined : arguments[0]);
  } else if (typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'string') {
    return HTML2React()(arguments.length <= 0 ? undefined : arguments[0]);
  }
  return HTML2React(arguments.length <= 0 ? undefined : arguments[0]);
};

var _parseNodes = require('./parse-nodes');

var _parseNodes2 = _interopRequireDefault(_parseNodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HTML2React = function HTML2React() {
  var elementOverrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (content) {
    // Put in a temporary container so we can traverse the tree.
    var tempEl = document.createElement('div');
    tempEl.innerHTML = content;

    return (0, _parseNodes2.default)(tempEl.childNodes, elementOverrides);
  };
};