! function(name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition();
  else if (typeof define == 'function') define(definition);
  else this[name] = definition();
}('tabs', function() {

  return function tabs(container) {
    let tabs = container.querySelectorAll('.tab');
    let panes = container.querySelectorAll('.tab-pane');

    each(tabs, function(i, tab) {
      tab.addEventListener('click', function(e) {
        activate(tabs, i);
        activate(panes, i);
      });
    })

    function activate(tabs, index) {
      each(tabs, function(i, tab) {
        if (i !== index) {
          removeClass(tab, 'active')
        } else {
          addClass(tab, 'active')
        }
      });
    }
  }

  function each(elements, fn) {
    for (let i = elements.length - 1; i >= 0; i--) {
      fn(i, elements[i]);
    }
  }

  function hasClass(el, cls) {
    return el.className.match(new RegExp('\\b'+cls+'\\b'));
  }

  function addClass(el, cls) {
    if (!hasClass(el, cls)) {
      el.className += " " + cls;
    }
  }

  function removeClass(el, cls) {
    if (!hasClass(el, cls)) return;

    //use word boundary rather than spaces to allow for addl classes
    el.className = el.className.replace(new RegExp('\\b'+cls+'\\b'), '');
    el.className = el.className.replace(new RegExp('\\s{2,}'), ' ');//reduce multiple spaces
  }
});