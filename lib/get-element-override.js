"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getElementOverride;
function getElementOverride(element, overrides) {
  var parentNode = getTopMostElementParent(element);

  for (var override in overrides) {
    if (overrides.hasOwnProperty(override)) {
      try {
        var matches = parentNode.querySelectorAll(override);
        if (Array.from(matches).indexOf(element) > -1) {
          return overrides[override];
        }
      } catch (e) {
        // At least we tried.
      }
    }
  }
}

function getTopMostElementParent(element) {
  var parentNode = element.parentNode;
  // Traverse up the DOM tree until the last parent is found.
  while (parentNode.parentNode) {
    parentNode = parentNode.parentNode;
  }
  return parentNode;
}