import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
  name: 'ml-sub-tree',
  components: {},
  data: function data() {
    return {
      collapsed: {},
      console: console
    };
  },
  props: {
    nodes: {
      type: Object,
      required: true
    },
    startIds: {
      type: Array,
      required: true
    },
    onClick: {
      type: Function,
      default: function() {}
    },
    showEmpty: {
      type: Boolean,
      default: false
    },
    showSums: {
      type: Boolean,
      default: false
    },
    sort: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    nonEmptystartIds: function nonEmptystartIds() {
      var this$1 = this;

      var arr = [];
      if (this.showEmpty) {
        arr = this.startIds.filter(function (id) {
          var node = this$1.nodes[id];
          return node !== undefined;
        });
      } else {
        arr = this.startIds.filter(function (id) {
          var node = this$1.nodes[id];
          return node && node.sum > 0;
        });
      }
      arr.sort(function(a, b) {
        return a.label && b.label
          ? a.label.localeCompare(b.label)
          : a.id.localeCompare(b.id);
      });
      return arr;
    }
  },
  methods: {
    toggle: function toggle(id) {
      this.$set(this.collapsed, id, !this.collapsed[id]);
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "ul",
    { staticClass: "ml-sub-tree" },
    _vm._l(_vm.nonEmptystartIds, function(id, $index) {
      return _c("li", { key: $index, attrs: { id: id } }, [
        _c(
          "div",
          { class: _vm.nodes[id].highlight ? "ml-tree-highlight" : "" },
          [
            _vm.nodes[id].children &&
            _vm.nodes[id].children.length &&
            (_vm.showEmpty || _vm.nodes[id].sum > (_vm.nodes[id].value || 0))
              ? _c(
                  "a",
                  {
                    attrs: { href: "" },
                    on: {
                      click: function($event) {
                        $event.preventDefault();
                        return _vm.toggle(id)
                      }
                    }
                  },
                  [
                    _c("i", {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.collapsed[id],
                          expression: "collapsed[id]"
                        }
                      ],
                      staticClass: "fa fa-chevron-right"
                    }),
                    _vm._v(" "),
                    _c("i", {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: !_vm.collapsed[id],
                          expression: "!collapsed[id]"
                        }
                      ],
                      staticClass: "fa fa-chevron-down"
                    })
                  ]
                )
              : _vm._e(),
            _vm._v(" "),
            _c(
              "a",
              {
                attrs: { href: "" },
                on: {
                  click: function($event) {
                    $event.preventDefault();
                    return _vm.onClick(_vm.nodes[id])
                  }
                }
              },
              [_vm._v(_vm._s(_vm.nodes[id].label))]
            ),
            _vm._v(" "),
            _c(
              "a",
              {
                attrs: { href: "" },
                on: {
                  click: function($event) {
                    $event.preventDefault();
                    return _vm.onClick(_vm.nodes[id], true)
                  }
                }
              },
              [_c("i", { staticClass: "fa fa-remove" })]
            ),
            _vm._v(" "),
            _c(
              "span",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.nodes[id].value,
                    expression: "nodes[id].value"
                  }
                ]
              },
              [_vm._v(" (" + _vm._s(_vm.nodes[id].value) + ")")]
            ),
            _vm._v(" "),
            _c(
              "span",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.showSums && _vm.nodes[id].sum,
                    expression: "showSums && nodes[id].sum"
                  }
                ]
              },
              [_vm._v(" [" + _vm._s(_vm.nodes[id].sum) + "]")]
            )
          ]
        ),
        _vm._v(" "),
        !_vm.collapsed[id] &&
        _vm.nodes[id].children &&
        _vm.nodes[id].children.length
          ? _c(
              "div",
              [
                _c("ml-sub-tree", {
                  attrs: {
                    nodes: _vm.nodes,
                    "start-ids": _vm.nodes[id].children,
                    "on-click": _vm.onClick,
                    "show-empty": _vm.showEmpty,
                    "show-sums": _vm.showSums,
                    sort: _vm.sort
                  }
                })
              ],
              1
            )
          : _vm._e()
      ])
    }),
    0
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-92dfee4a_0", { source: "ul.ml-sub-tree[data-v-92dfee4a] {\n  list-style: none;\n}\nul.ml-sub-tree .ml-tree-highlight[data-v-92dfee4a] {\n  background-color: lightyellow;\n}\n", map: {"version":3,"sources":["ml-sub-tree.vue"],"names":[],"mappings":"AAAA;EACE,gBAAgB;AAClB;AACA;EACE,6BAA6B;AAC/B","file":"ml-sub-tree.vue","sourcesContent":["ul.ml-sub-tree {\n  list-style: none;\n}\nul.ml-sub-tree .ml-tree-highlight {\n  background-color: lightyellow;\n}\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-92dfee4a";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script$1 = {
  name: 'ml-tree-facet',
  components: {
    Multiselect: Multiselect,
    mlSubTree: __vue_component__
  },
  props: {
    facet: {
      type: Object,
      required: true
    },
    nodes: {
      type: Object,
      required: true
    },
    startIds: {
      type: Array,
      required: true
    },
    toggle: {
      type: Function,
      default: function() {}
    },
    negate: {
      type: Function,
      default: function() {}
    },
    showSearch: {
      type: Boolean,
      default: true
    },
    showEmpty: {
      type: Boolean,
      default: false
    },
    showSums: {
      type: Boolean,
      default: false
    },
    sort: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      searchNode: '',
      suggestionsList: [],
      showEmpty_: false,
      nodes_: {},
      facetOpen: true
    };
  },
  methods: {
    showHideFacet: function showHideFacet() {
      this.facetOpen = !this.facetOpen;
    },
    onClick: function onClick(node, negate) {
      if (negate) {
        this.negate(this.facet.name, this.facet.type, node.id, node.label);
      } else {
        this.toggle(this.facet.name, this.facet.type, node.id, node.label);
      }
    },
    calculateSums: function calculateSums(nodes, startIds) {
      var totalSum = 0;
      startIds.forEach(function(id) {
        var node = nodes[id];
        var sum = node.children ? this.calculateSums(nodes, node.children) : 0;
        if (sum === 0) {
          sum = sum + (node.value || 0);
        }
        node.sum = sum;
        totalSum += sum;
      }, this);
      return totalSum;
    },
    updateSuggestions: function updateSuggestions(nodes) {
      var this$1 = this;

      this.suggestionsList = [];
      Object.keys(nodes).forEach(function (id) {
        var node = nodes[id];
        if (this$1.showEmpty_ || node.sum > 0) {
          if (node.label) {
            this$1.suggestionsList.push(node.label);
          }
          if (node.altLabels) {
            node.altLabels.forEach(function(label) {
              this.suggestionsList.push(label);
            });
          }
        }
      }, this);
      this.suggestionsList.sort();
    },
    highlightNodes: function highlightNodes(selected) {
      this.searchNode = selected !== undefined ? selected : this.searchNode;

      var noMatch = {
        test: function() {
          return false;
        }
      };

      var _highlightNodes = function(match, startIds) {
        var totalHit = false;
        if (startIds) {
          startIds.forEach(function(id) {
            var node = this.nodes_[id];
            var hit = node.children
              ? _highlightNodes(match, node.children)
              : false;
            if (!hit) {
              hit = node.label && match.test(node.label);
            }
            if (!hit) {
              hit =
                node.altLabels &&
                node.altLabels.filter(function(label) {
                  return match.test(label);
                }).length;
            }
            if (hit) {
              this.$set(node, 'highlight', true);
              totalHit = true;
            } else {
              this.$set(node, 'highlight', false);
            }
          }, this);
        }
        return totalHit;
      };

      if (this.searchNode) {
        var match = new RegExp('' + this.searchNode, 'i');
        _highlightNodes(match, this.startIds);
      } else {
        _highlightNodes(noMatch, this.startIds);
      }
    },
    init: function init() {
      var this$1 = this;

      if (this.facet !== undefined && Object.keys(this.nodes_).length) {
        if (this.facet.facetValues) {
          this.facet.facetValues.forEach(function (facetValue) {
            if (this$1.nodes_[facetValue.value]) {
              this$1.nodes_[facetValue.value].value = facetValue.count;
            }
          }, this);
        }
        this.calculateSums(this.nodes_, this.startIds);
        this.updateSuggestions(this.nodes_);

        // let Vue know something changed
        this.$set(this, 'nodes_', this.nodes_);
      }
    }
  },
  created: function created() {
    this.init();
  },
  watch: {
    showEmpty: function showEmpty(newEmpty) {
      if (newEmpty !== undefined) {
        this.showEmpty_ = newEmpty;
        this.updateSuggestions(this.nodes_);
      }
    },
    facet: function facet() {
      this.init();
    },
    nodes: function nodes(newNodes) {
      var this$1 = this;

      if (newNodes) {
        this.nodes_ = JSON.parse(JSON.stringify(newNodes));
        Object.keys(this.nodes_).forEach(function (key) {
          var node = this$1.nodes_[key];
          if (node.children && !Array.isArray(node.children)) {
            node.children = [node.children];
          }
          if (node.altLabels && !Array.isArray(node.altLabels)) {
            node.altLabels = [node.altLabels];
          }
        }, this);
        this.init();
      }
    }
  }
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.startIds.length
    ? _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: !_vm.facet.hide,
              expression: "!facet.hide"
            }
          ],
          staticClass: "ml-facet ml-tree-facet"
        },
        [
          _c(
            "h3",
            {
              on: {
                click: function($event) {
                  $event.preventDefault();
                  return _vm.showHideFacet()
                }
              }
            },
            [
              _vm._v(
                "\n    " +
                  _vm._s(_vm._f("capitalize")(_vm.facet.name)) +
                  "\n    "
              ),
              _c("div", { staticClass: "pull-right" }, [
                !_vm.facetOpen
                  ? _c("i", { staticClass: "fa fa-caret-right" })
                  : _vm._e(),
                _vm._v(" "),
                !!_vm.facetOpen
                  ? _c("i", { staticClass: "fa fa-caret-down" })
                  : _vm._e()
              ])
            ]
          ),
          _vm._v(" "),
          _vm.facetOpen
            ? _c(
                "div",
                [
                  _vm.showSearch
                    ? _c(
                        "form",
                        {
                          on: {
                            submit: function($event) {
                              $event.preventDefault();
                              return _vm.highlightNodes()
                            }
                          }
                        },
                        [
                          _c(
                            "span",
                            [
                              _vm._v("\n        Search:\n        "),
                              _vm._v(" "),
                              _c("multiselect", {
                                attrs: {
                                  value: _vm.searchNode,
                                  options: _vm.suggestionsList,
                                  multiple: false,
                                  searchable: true,
                                  "clear-on-select": false,
                                  placeholder: "in the tree below",
                                  "open-direction": "bottom"
                                },
                                on: { select: _vm.highlightNodes }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("div", [
                            _vm._v("\n        Show empty nodes\n        "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.showEmpty_,
                                  expression: "showEmpty_"
                                }
                              ],
                              attrs: { type: "checkbox" },
                              domProps: {
                                checked: Array.isArray(_vm.showEmpty_)
                                  ? _vm._i(_vm.showEmpty_, null) > -1
                                  : _vm.showEmpty_
                              },
                              on: {
                                change: function($event) {
                                  var $$a = _vm.showEmpty_,
                                    $$el = $event.target,
                                    $$c = $$el.checked ? true : false;
                                  if (Array.isArray($$a)) {
                                    var $$v = null,
                                      $$i = _vm._i($$a, $$v);
                                    if ($$el.checked) {
                                      $$i < 0 &&
                                        (_vm.showEmpty_ = $$a.concat([$$v]));
                                    } else {
                                      $$i > -1 &&
                                        (_vm.showEmpty_ = $$a
                                          .slice(0, $$i)
                                          .concat($$a.slice($$i + 1)));
                                    }
                                  } else {
                                    _vm.showEmpty_ = $$c;
                                  }
                                }
                              }
                            })
                          ])
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c("ml-sub-tree", {
                    attrs: {
                      nodes: _vm.nodes_,
                      "start-ids": _vm.startIds,
                      "on-click": _vm.onClick,
                      "show-empty": _vm.showEmpty_,
                      "show-sums": _vm.showSums,
                      sort: _vm.sort
                    }
                  })
                ],
                1
              )
            : _vm._e()
        ]
      )
    : _vm._e()
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  var __vue_inject_styles__$1 = function (inject) {
    if (!inject) { return }
    inject("data-v-345d2daa_0", { source: ".ml-facet .facet-add-pos[data-v-345d2daa],\n.ml-facet .facet-add-neg[data-v-345d2daa] {\n  visibility: hidden;\n}\n.ml-facet span:hover > .facet-add-pos[data-v-345d2daa],\n.ml-facet div:hover > .facet-add-neg[data-v-345d2daa] {\n  visibility: visible !important;\n}\n.ml-facet form[data-v-345d2daa] {\n  padding-bottom: 0;\n}\n", map: {"version":3,"sources":["ml-tree-facet.vue"],"names":[],"mappings":"AAAA;;EAEE,kBAAkB;AACpB;AACA;;EAEE,8BAA8B;AAChC;AACA;EACE,iBAAiB;AACnB","file":"ml-tree-facet.vue","sourcesContent":[".ml-facet .facet-add-pos,\n.ml-facet .facet-add-neg {\n  visibility: hidden;\n}\n.ml-facet span:hover > .facet-add-pos,\n.ml-facet div:hover > .facet-add-neg {\n  visibility: visible !important;\n}\n.ml-facet form {\n  padding-bottom: 0;\n}\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$1 = "data-v-345d2daa";
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    createInjector,
    undefined,
    undefined
  );

var mlTreeFacet = {
  mlTreeFacet: __vue_component__$1,
  mlSubTree: __vue_component__
};

//
//
//
//
//
//
//
//
//
//

var script$2 = {
  name: 'SearchQueryFilter-queryText',
  props: {
    filter: {
      type: Object,
      required: true
    },
    apply: {
      type: Function,
      required: true
    },
    remove: {
      type: Function,
      required: true
    }
  },
  data: function data() {
    return this.initData();
  },
  methods: {
    initData: function initData() {
      var error;

      // pass-through
      var type = this.filter.type || 'queryText';
      var constraint = this.filter.constraint;

      // editable
      var value = this.filter.value || '';

      return {
        error: error,
        type: type,
        constraint: constraint,
        value: value
      };
    },
    updateParent: function updateParent() {
      var filter = {
        type: this.type,
        value: this.value
      };
      if (this.constraint) {
        filter.constraint = this.constraint;
      }
      this.apply(filter);
    }
  }
};

/* script */
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "search-query-filter-queryText" }, [
    _c("input", {
      directives: [
        {
          name: "model",
          rawName: "v-model",
          value: _vm.value,
          expression: "value"
        }
      ],
      attrs: { type: "text" },
      domProps: { value: _vm.value },
      on: {
        change: function($event) {
          return _vm.updateParent()
        },
        input: function($event) {
          if ($event.target.composing) {
            return
          }
          _vm.value = $event.target.value;
        }
      }
    }),
    _vm._v(" "),
    _c(
      "button",
      {
        staticClass: "btn btn-danger btn-sm",
        on: {
          click: function($event) {
            $event.preventDefault();
            return _vm.remove()
          }
        }
      },
      [_c("i", { staticClass: "fa fa-times" }), _vm._v("\n    Remove\n  ")]
    )
  ])
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  var __vue_inject_styles__$2 = function (inject) {
    if (!inject) { return }
    inject("data-v-38512ebe_0", { source: ".search-query-filter-queryText[data-v-38512ebe] {\n  flex: auto;\n  width: 100%;\n}\n.search-query-filter-queryText[data-v-38512ebe] {\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: flex-start;\n}\ninput[data-v-38512ebe] {\n  flex: auto;\n  width: 100%;\n}\nselect[data-v-38512ebe],\nbutton[data-v-38512ebe] {\n  flex: none;\n}\ninput[data-v-38512ebe],\nselect[data-v-38512ebe] {\n  margin-right: 5px;\n}\n.btn-sm[data-v-38512ebe] {\n  margin-right: 5px;\n}\n.panel[data-v-38512ebe] {\n  margin-top: 10px;\n}\n.panel-body[data-v-38512ebe] {\n  min-height: initial;\n}\n", map: {"version":3,"sources":["SearchQueryFilter-queryText.vue"],"names":[],"mappings":"AAAA;EACE,UAAU;EACV,WAAW;AACb;AACA;EACE,aAAa;EACb,qBAAqB;EACrB,uBAAuB;AACzB;AACA;EACE,UAAU;EACV,WAAW;AACb;AACA;;EAEE,UAAU;AACZ;AACA;;EAEE,iBAAiB;AACnB;AACA;EACE,iBAAiB;AACnB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,mBAAmB;AACrB","file":"SearchQueryFilter-queryText.vue","sourcesContent":[".search-query-filter-queryText {\n  flex: auto;\n  width: 100%;\n}\n.search-query-filter-queryText {\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: flex-start;\n}\ninput {\n  flex: auto;\n  width: 100%;\n}\nselect,\nbutton {\n  flex: none;\n}\ninput,\nselect {\n  margin-right: 5px;\n}\n.btn-sm {\n  margin-right: 5px;\n}\n.panel {\n  margin-top: 10px;\n}\n.panel-body {\n  min-height: initial;\n}\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$2 = "data-v-38512ebe";
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$2 = normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$3 = {
  name: 'SearchQueryFilter-selection',
  props: {
    filter: {
      type: Object,
      required: true
    },
    apply: {
      type: Function,
      required: true
    },
    remove: {
      type: Function,
      required: true
    }
  },
  data: function data() {
    return this.initData();
  },
  methods: {
    initData: function initData() {
      var error;

      // pass-through
      var type = this.filter.type || 'selection';

      // editable
      var constraint = this.filter.constraint;
      var constraintType = this.filter.constraintType || 'value';
      var mode = this.filter.mode || 'or';
      var values;

      if (this.filter.value !== undefined && this.filter.value !== null) {
        if (Array.isArray(this.filter.value)) {
          values = this.filter.value;
        } else {
          values = [this.filter.value];
        }
      } else {
        values = [];
      }

      if (!values.length) {
        values.push('');
      }

      values = values.map(function (value) {
        if (value.not === undefined) {
          return { value: value, not: false };
        } else {
          return value;
        }
      });

      return {
        error: error,
        type: type,
        constraint: constraint,
        constraintType: constraintType,
        mode: mode,
        values: values
      };
    },
    moreValues: function moreValues() {
      this.values.push({ value: '', not: false });
      this.updateParent();
    },
    lessValues: function lessValues($index) {
      this.values.splice($index, 1);
      this.updateParent();
    },
    updateParent: function updateParent() {
      var filter = {
        type: this.type,
        constraint: this.constraint,
        constraintType: this.constraintType,
        mode: this.mode,
        value: this.values.map(function (value) {
          if (value.not) {
            return { not: value.value };
          } else {
            return value.value;
          }
        })
      };
      this.apply(filter);
    }
  }
};

/* script */
var __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("span", { staticClass: "search-query-filter-selection" }, [
    _c("input", {
      directives: [
        {
          name: "model",
          rawName: "v-model",
          value: _vm.constraint,
          expression: "constraint"
        }
      ],
      attrs: { type: "text" },
      domProps: { value: _vm.constraint },
      on: {
        change: function($event) {
          return _vm.updateParent()
        },
        input: function($event) {
          if ($event.target.composing) {
            return
          }
          _vm.constraint = $event.target.value;
        }
      }
    }),
    _vm._v(" "),
    _c(
      "select",
      {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.constraintType,
            expression: "constraintType"
          }
        ],
        on: {
          change: [
            function($event) {
              var $$selectedVal = Array.prototype.filter
                .call($event.target.options, function(o) {
                  return o.selected
                })
                .map(function(o) {
                  var val = "_value" in o ? o._value : o.value;
                  return val
                });
              _vm.constraintType = $event.target.multiple
                ? $$selectedVal
                : $$selectedVal[0];
            },
            function($event) {
              return _vm.updateParent()
            }
          ]
        }
      },
      [
        _c("option", [_vm._v("collection")]),
        _vm._v(" "),
        _c("option", [_vm._v("custom")]),
        _vm._v(" "),
        _c("option", [_vm._v("geospatial")]),
        _vm._v(" "),
        _c("option", [_vm._v("range")]),
        _vm._v(" "),
        _c("option", [_vm._v("value")]),
        _vm._v(" "),
        _c("option", [_vm._v("word")])
      ]
    ),
    _vm._v(" "),
    _c(
      "select",
      {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.mode,
            expression: "mode"
          }
        ],
        on: {
          change: [
            function($event) {
              var $$selectedVal = Array.prototype.filter
                .call($event.target.options, function(o) {
                  return o.selected
                })
                .map(function(o) {
                  var val = "_value" in o ? o._value : o.value;
                  return val
                });
              _vm.mode = $event.target.multiple
                ? $$selectedVal
                : $$selectedVal[0];
            },
            function($event) {
              return _vm.applyParent()
            }
          ]
        }
      },
      [_c("option", [_vm._v("or")]), _vm._v(" "), _c("option", [_vm._v("and")])]
    ),
    _vm._v(" "),
    _c(
      "ul",
      { staticClass: "values list-unstyled" },
      [
        _vm._l(_vm.values, function(value, $index) {
          return _c("li", { key: $index }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: value.not,
                  expression: "value.not"
                }
              ],
              attrs: { type: "checkbox" },
              domProps: {
                checked: Array.isArray(value.not)
                  ? _vm._i(value.not, null) > -1
                  : value.not
              },
              on: {
                change: [
                  function($event) {
                    var $$a = value.not,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false;
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v);
                      if ($$el.checked) {
                        $$i < 0 && _vm.$set(value, "not", $$a.concat([$$v]));
                      } else {
                        $$i > -1 &&
                          _vm.$set(
                            value,
                            "not",
                            $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                          );
                      }
                    } else {
                      _vm.$set(value, "not", $$c);
                    }
                  },
                  function($event) {
                    return _vm.updateParent()
                  }
                ]
              }
            }),
            _vm._v(" "),
            _c("span", [_vm._v("\n        not\n      ")]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: value.value,
                  expression: "value.value"
                }
              ],
              attrs: { type: "text" },
              domProps: { value: value.value },
              on: {
                change: function($event) {
                  return _vm.updateParent()
                },
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(value, "value", $event.target.value);
                }
              }
            }),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-warning btn-xs",
                on: {
                  click: function($event) {
                    $event.preventDefault();
                    return _vm.lessValues($index)
                  }
                }
              },
              [
                _c("i", { staticClass: "fa fa-minus" }),
                _vm._v("\n        Less\n      ")
              ]
            )
          ])
        }),
        _vm._v(" "),
        _c("li", [
          _c(
            "button",
            {
              staticClass: "btn btn-success btn-xs",
              on: {
                click: function($event) {
                  $event.preventDefault();
                  return _vm.moreValues()
                }
              }
            },
            [
              _c("i", { staticClass: "fa fa-plus" }),
              _vm._v("\n        More\n      ")
            ]
          )
        ])
      ],
      2
    ),
    _vm._v(" "),
    _c(
      "button",
      {
        staticClass: "btn btn-danger btn-sm",
        on: {
          click: function($event) {
            $event.preventDefault();
            return _vm.remove()
          }
        }
      },
      [_c("i", { staticClass: "fa fa-times" }), _vm._v("\n    Remove\n  ")]
    )
  ])
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  var __vue_inject_styles__$3 = function (inject) {
    if (!inject) { return }
    inject("data-v-6bfcbfb5_0", { source: ".search-query-filter-selection[data-v-6bfcbfb5] {\n  flex: auto;\n  width: 100%;\n}\n.search-query-filter-selection[data-v-6bfcbfb5],\n.values li[data-v-6bfcbfb5] {\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: flex-start;\n}\n.search-query-filter-selection > input[data-v-6bfcbfb5],\n.values[data-v-6bfcbfb5] {\n  flex: auto;\n  width: 50%;\n}\n.values input[type='checkbox'][data-v-6bfcbfb5],\n.values span[data-v-6bfcbfb5],\nselect[data-v-6bfcbfb5],\nbutton[data-v-6bfcbfb5] {\n  flex: none;\n}\n.values input[type='text'][data-v-6bfcbfb5] {\n  flex: auto;\n}\n.values[data-v-6bfcbfb5] {\n  display: inline-block;\n  vertical-align: top;\n}\ninput[data-v-6bfcbfb5],\nselect[data-v-6bfcbfb5],\nbutton[data-v-6bfcbfb5],\n.values span[data-v-6bfcbfb5] {\n  margin-right: 5px;\n}\n.panel[data-v-6bfcbfb5] {\n  margin-top: 10px;\n}\n.panel-body[data-v-6bfcbfb5] {\n  min-height: initial;\n}\n", map: {"version":3,"sources":["SearchQueryFilter-selection.vue"],"names":[],"mappings":"AAAA;EACE,UAAU;EACV,WAAW;AACb;AACA;;EAEE,aAAa;EACb,qBAAqB;EACrB,uBAAuB;AACzB;AACA;;EAEE,UAAU;EACV,UAAU;AACZ;AACA;;;;EAIE,UAAU;AACZ;AACA;EACE,UAAU;AACZ;AACA;EACE,qBAAqB;EACrB,mBAAmB;AACrB;AACA;;;;EAIE,iBAAiB;AACnB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,mBAAmB;AACrB","file":"SearchQueryFilter-selection.vue","sourcesContent":[".search-query-filter-selection {\n  flex: auto;\n  width: 100%;\n}\n.search-query-filter-selection,\n.values li {\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: flex-start;\n}\n.search-query-filter-selection > input,\n.values {\n  flex: auto;\n  width: 50%;\n}\n.values input[type='checkbox'],\n.values span,\nselect,\nbutton {\n  flex: none;\n}\n.values input[type='text'] {\n  flex: auto;\n}\n.values {\n  display: inline-block;\n  vertical-align: top;\n}\ninput,\nselect,\nbutton,\n.values span {\n  margin-right: 5px;\n}\n.panel {\n  margin-top: 10px;\n}\n.panel-body {\n  min-height: initial;\n}\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$3 = "data-v-6bfcbfb5";
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$3 = normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$4 = {
  name: 'SearchQueryFilter-range',
  props: {
    filter: {
      type: Object,
      required: true
    },
    apply: {
      type: Function,
      required: true
    },
    remove: {
      type: Function,
      required: true
    }
  },
  data: function data() {
    return this.initData();
  },
  methods: {
    initData: function initData() {
      var this$1 = this;

      var error;
      var validOperators = {
        eq: '=',
        ne: '!=',
        ge: '>=',
        gt: '>',
        le: '<=',
        lt: '<'
      };

      // pass-through
      var type = this.filter.type || 'range';

      // editable
      var constraint = this.filter.constraint;
      var constraintType = this.filter.constraintType || 'range';
      var mode = this.filter.mode || 'and';
      var values = [];

      if (this.filter.value !== undefined && this.filter.value !== null) {
        if (Array.isArray(this.filter.value)) {
          // should not typically occur, but for sake of robustness
          // (one might switch to a different filter type?)
          values = this.filter.value.map(function (value) {
            if (value.operator !== undefined) {
              return { operator: value.operator, value: value.value };
            } else if (value.not !== undefined) {
              return { operator: 'ne', value: value.value };
            } else if (value.value !== undefined) {
              return { operator: 'eq', value: value.value };
            } else {
              return { operator: 'eq', value: value };
            }
          });
        } else if (typeof this.filter.value === 'object') {
          Object.keys(this.filter.value).forEach(function (operator) {
            if (validOperators.indexOf(operator) < 0) {
              error =
                'Invalid filter: unrecognized operator "' + operator + '"';
              operator = 'eq';
            }
            var value = this$1.filter.value[operator];
            if (Array.isArray(value)) {
              value.forEach(function (value) {
                values.push({ operator: operator, value: value });
              });
            } else {
              values.push({ operator: operator, value: value });
            }
          });
        } else {
          values.push({ operator: 'eq', value: this.filter.value });
        }
      } else {
        values.push({ operator: 'eq', value: '' });
      }

      return {
        validOperators: validOperators,
        error: error,
        type: type,
        constraint: constraint,
        constraintType: constraintType,
        mode: mode,
        values: values
      };
    },
    moreValues: function moreValues() {
      this.values.push({ operator: 'eq', value: '' });
      this.updateParent();
    },
    lessValues: function lessValues($index) {
      this.values.splice($index, 1);
      this.updateParent();
    },
    updateParent: function updateParent() {
      var values = {};
      this.values.forEach(function (value) {
        if (values[value.operator] === undefined) {
          values[value.operator] = [];
        }
        values[value.operator].push(value.value);
      });
      var filter = {
        type: this.type,
        constraint: this.constraint,
        constraintType: this.constraintType,
        mode: this.mode,
        value: values
      };
      this.apply(filter);
    }
  }
};

/* script */
var __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("span", { staticClass: "search-query-filter-range" }, [
    _c("input", {
      directives: [
        {
          name: "model",
          rawName: "v-model",
          value: _vm.constraint,
          expression: "constraint"
        }
      ],
      attrs: { type: "text" },
      domProps: { value: _vm.constraint },
      on: {
        change: function($event) {
          return _vm.updateParent()
        },
        input: function($event) {
          if ($event.target.composing) {
            return
          }
          _vm.constraint = $event.target.value;
        }
      }
    }),
    _vm._v(" "),
    _c(
      "select",
      {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.constraintType,
            expression: "constraintType"
          }
        ],
        on: {
          change: [
            function($event) {
              var $$selectedVal = Array.prototype.filter
                .call($event.target.options, function(o) {
                  return o.selected
                })
                .map(function(o) {
                  var val = "_value" in o ? o._value : o.value;
                  return val
                });
              _vm.constraintType = $event.target.multiple
                ? $$selectedVal
                : $$selectedVal[0];
            },
            function($event) {
              return _vm.updateParent()
            }
          ]
        }
      },
      [
        _c("option", [_vm._v("collection")]),
        _vm._v(" "),
        _c("option", [_vm._v("custom")]),
        _vm._v(" "),
        _c("option", [_vm._v("geospatial")]),
        _vm._v(" "),
        _c("option", [_vm._v("range")])
      ]
    ),
    _vm._v(" "),
    _c(
      "select",
      {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.mode,
            expression: "mode"
          }
        ],
        on: {
          change: [
            function($event) {
              var $$selectedVal = Array.prototype.filter
                .call($event.target.options, function(o) {
                  return o.selected
                })
                .map(function(o) {
                  var val = "_value" in o ? o._value : o.value;
                  return val
                });
              _vm.mode = $event.target.multiple
                ? $$selectedVal
                : $$selectedVal[0];
            },
            function($event) {
              return _vm.updateParent()
            }
          ]
        }
      },
      [_c("option", [_vm._v("or")]), _vm._v(" "), _c("option", [_vm._v("and")])]
    ),
    _vm._v(" "),
    _c(
      "ul",
      { staticClass: "values list-unstyled" },
      [
        _vm._l(_vm.values, function(value, $index) {
          return _c("li", { key: $index }, [
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: value.operator,
                    expression: "value.operator"
                  }
                ],
                on: {
                  change: [
                    function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value;
                          return val
                        });
                      _vm.$set(
                        value,
                        "operator",
                        $event.target.multiple
                          ? $$selectedVal
                          : $$selectedVal[0]
                      );
                    },
                    function($event) {
                      return _vm.updateParent()
                    }
                  ]
                }
              },
              _vm._l(_vm.validOperators, function(label, name) {
                return _c("option", { key: name, domProps: { value: name } }, [
                  _vm._v(_vm._s(label))
                ])
              }),
              0
            ),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: value.value,
                  expression: "value.value"
                }
              ],
              attrs: { type: "text" },
              domProps: { value: value.value },
              on: {
                change: function($event) {
                  return _vm.updateParent()
                },
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(value, "value", $event.target.value);
                }
              }
            }),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-warning btn-xs",
                on: {
                  click: function($event) {
                    $event.preventDefault();
                    return _vm.lessValues($index)
                  }
                }
              },
              [
                _c("i", { staticClass: "fa fa-minus" }),
                _vm._v("\n        Less\n      ")
              ]
            )
          ])
        }),
        _vm._v(" "),
        _c("li", [
          _c(
            "button",
            {
              staticClass: "btn btn-success btn-xs",
              on: {
                click: function($event) {
                  $event.preventDefault();
                  return _vm.moreValues()
                }
              }
            },
            [
              _c("i", { staticClass: "fa fa-plus" }),
              _vm._v("\n        More\n      ")
            ]
          )
        ])
      ],
      2
    ),
    _vm._v(" "),
    _c(
      "button",
      {
        staticClass: "btn btn-danger btn-sm",
        on: {
          click: function($event) {
            $event.preventDefault();
            return _vm.remove()
          }
        }
      },
      [_c("i", { staticClass: "fa fa-times" }), _vm._v("\n    Remove\n  ")]
    )
  ])
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  var __vue_inject_styles__$4 = function (inject) {
    if (!inject) { return }
    inject("data-v-405cd96e_0", { source: ".search-query-filter-range[data-v-405cd96e] {\n  flex: auto;\n  width: 100%;\n}\n.search-query-filter-range[data-v-405cd96e],\n.values li[data-v-405cd96e] {\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: flex-start;\n}\n.search-query-filter-range > input[data-v-405cd96e],\n.values[data-v-405cd96e] {\n  flex: auto;\n  width: 50%;\n}\n.values input[type='checkbox'][data-v-405cd96e],\n.values span[data-v-405cd96e],\nselect[data-v-405cd96e],\nbutton[data-v-405cd96e] {\n  flex: none;\n}\n.values input[type='text'][data-v-405cd96e] {\n  flex: auto;\n}\ninput[data-v-405cd96e],\nselect[data-v-405cd96e],\nbutton[data-v-405cd96e] {\n  margin-right: 5px;\n}\n.panel[data-v-405cd96e] {\n  margin-top: 10px;\n}\n.panel-body[data-v-405cd96e] {\n  min-height: initial;\n}\n", map: {"version":3,"sources":["SearchQueryFilter-range.vue"],"names":[],"mappings":"AAAA;EACE,UAAU;EACV,WAAW;AACb;AACA;;EAEE,aAAa;EACb,qBAAqB;EACrB,uBAAuB;AACzB;AACA;;EAEE,UAAU;EACV,UAAU;AACZ;AACA;;;;EAIE,UAAU;AACZ;AACA;EACE,UAAU;AACZ;AACA;;;EAGE,iBAAiB;AACnB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,mBAAmB;AACrB","file":"SearchQueryFilter-range.vue","sourcesContent":[".search-query-filter-range {\n  flex: auto;\n  width: 100%;\n}\n.search-query-filter-range,\n.values li {\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: flex-start;\n}\n.search-query-filter-range > input,\n.values {\n  flex: auto;\n  width: 50%;\n}\n.values input[type='checkbox'],\n.values span,\nselect,\nbutton {\n  flex: none;\n}\n.values input[type='text'] {\n  flex: auto;\n}\ninput,\nselect,\nbutton {\n  margin-right: 5px;\n}\n.panel {\n  margin-top: 10px;\n}\n.panel-body {\n  min-height: initial;\n}\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$4 = "data-v-405cd96e";
  /* module identifier */
  var __vue_module_identifier__$4 = undefined;
  /* functional template */
  var __vue_is_functional_template__$4 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$4 = normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script$5 = {
  name: 'SearchQueryBuilder',
  props: {
    filters: {
      type: Object,
      default: function default$1() {
        return {
          queryText: __vue_component__$2,
          selection: __vue_component__$3,
          range: __vue_component__$4
        };
      }
    },
    query: {
      type: Object,
      default: function default$2() {
        return {
          and: []
        };
      }
    },
    apply: {
      type: Function,
      required: true
    },
    remove: {
      type: Function
    },
    isDirty: {
      type: Function
    }
  },
  data: function data() {
    return this.initData();
  },
  computed: {
    filterTypes: function filterTypes() {
      return Object.keys(this.filters);
    }
  },
  methods: {
    initData: function initData() {
      var this$1 = this;

      var operators = {
        and: 'AND',
        or: 'OR',
        not: 'NOT',
        near: 'NEAR'
      };
      var operator;
      var error;

      var query = JSON.parse(JSON.stringify(this.query)) || {};

      var keys = Object.keys(query);
      if (keys.length) {
        if (keys.length > 1) {
          error = 'Invalid query: more than one operator for group';
        } else if (Object.keys(operators).indexOf(keys[0]) < 0) {
          error = 'Invalid query: invalid operator "' + keys[0] + '"';
        }
        operator = keys[0];
      } else {
        operator = 'and';
      }

      var distance;
      if (query.near) {
        distance = query.near.distance || 10;
      }

      var children;
      if (query.not) {
        if (Array.isArray(query.not)) {
          if (query.not.length > 1) {
            error = 'Invalid query: not group cannot have more than one child';
          } else if (query.not.length === 0) {
            error = 'Invalid query: not group should have one child';
            query.not = [];
          }
          children = query.not[0] ? [query.not[0]] : [];
        } else {
          children = [query.not];
        }
      } else if (query.near) {
        children = query.near.queries || [];
      } else {
        children = query[operator] || [];
      }

      children = children.map(function (child) {
        if (!this$1.isObject(child)) {
          child = {
            type: 'queryText',
            value: child
          };
        }
        return child;
      });

      var color = this.getColor(operator);

      return {
        error: error,
        operators: operators,
        operator: operator,
        distance: distance,
        children: children,
        color: color
      };
    },
    getColor: function getColor(operator) {
      if (operator === 'not') {
        return 'danger';
      } else if (operator === 'and') {
        return 'info';
      } else if (operator === 'near') {
        return 'warning';
      } else {
        return 'default';
      }
    },
    reset: function reset(skipParent) {
      var init = this.initData();
      this.error = init.error;
      this.operator = init.operator;
      this.children = init.children;
      if (!skipParent) {
        this.updateParent();
      }
    },
    changeOperator: function changeOperator() {
      this.color = this.getColor(this.operator);
      this.updateParent();
    },
    checkDistance: function checkDistance() {
      this.distance = this.distance.replace(/^([0-9]*).*$/, '$1');
      this.updateParent();
    },
    addFilter: function addFilter() {
      this.children.push({ type: this.filterTypes[0] });
      this.updateParent();
    },
    addSubGroup: function addSubGroup() {
      this.children.push({ and: [] });
      this.updateParent();
    },
    updateChild: function updateChild($index) {
      var self = this;
      return function(childQuery) {
        self.children[$index] = childQuery;
        self.updateParent();
      };
    },
    removeChild: function removeChild($index) {
      var self = this;
      return function() {
        self.children.splice($index, 1);
        self.updateParent();
      };
    },
    updateParent: function updateParent(force) {
      if (force || this.remove) {
        var query = {};
        if (this.operator === 'not') {
          query.not = this.children[0];
        } else if (this.operator === 'near') {
          query.near = {
            queries: this.children,
            distance: Math.round(+this.distance)
          };
        } else {
          query[this.operator] = this.children;
        }
        this.apply(query);
      } else if (this.isDirty) {
        this.isDirty();
      }
    },
    // copied from AngularJS
    isObject: function isObject(value) {
      // http://jsperf.com/isobject4
      return value !== null && typeof value === 'object';
    }
  },
  watch: {
    filter: function() {
      this.reset(false);
    }
  }
};

/* script */
var __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "search-query-builder panel panel-default" },
    [
      _c(
        "div",
        { staticClass: "panel-body", class: "bg-" + _vm.color },
        [
          _c("div", { staticClass: "clearfix" }, [
            !_vm.remove
              ? _c("div", { staticClass: "pull-right" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-primary btn-sm",
                      on: {
                        click: function($event) {
                          $event.preventDefault();
                          return _vm.updateParent(true)
                        }
                      }
                    },
                    [
                      _c("i", { staticClass: "fa fa-check" }),
                      _vm._v("\n          Apply\n        ")
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-primary btn-sm",
                      on: {
                        click: function($event) {
                          $event.preventDefault();
                          return _vm.reset()
                        }
                      }
                    },
                    [
                      _c("i", { staticClass: "fa fa-undo" }),
                      _vm._v("\n          Reset\n        ")
                    ]
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.operator,
                    expression: "operator"
                  }
                ],
                on: {
                  change: [
                    function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value;
                          return val
                        });
                      _vm.operator = $event.target.multiple
                        ? $$selectedVal
                        : $$selectedVal[0];
                    },
                    function($event) {
                      $event.preventDefault();
                      return _vm.changeOperator()
                    }
                  ]
                }
              },
              _vm._l(_vm.operators, function(value, key) {
                return _c("option", { key: key, domProps: { value: key } }, [
                  _vm._v(_vm._s(value))
                ])
              }),
              0
            ),
            _vm._v(" "),
            _vm.operator === "near"
              ? _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.distance,
                      expression: "distance"
                    }
                  ],
                  attrs: {
                    type: "text",
                    pattern: "^\\d+$",
                    "xxv-on:keyup.prevent": "checkDistance()"
                  },
                  domProps: { value: _vm.distance },
                  on: {
                    change: function($event) {
                      $event.preventDefault();
                      return _vm.checkDistance()
                    },
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.distance = $event.target.value;
                    }
                  }
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.operator === "near"
              ? _c("span", { staticClass: "validity" })
              : _vm._e(),
            _vm._v(" "),
            _vm.error
              ? _c("span", { staticClass: "alert alert-danger" }, [
                  _vm._v(_vm._s(_vm.error))
                ])
              : _vm._e()
          ]),
          _vm._v(" "),
          _vm._l(_vm.children, function(child, $index) {
            return _c(
              "div",
              { key: $index, staticClass: "child" },
              [
                child.type !== undefined
                  ? _c(
                      "div",
                      {
                        staticClass: "search-query-filter panel",
                        class: "panel-" + _vm.color
                      },
                      [
                        _c(
                          "div",
                          {
                            staticClass: "panel-body",
                            class: "bg-" + _vm.color
                          },
                          [
                            _c(
                              "select",
                              {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: child.type,
                                    expression: "child.type"
                                  }
                                ],
                                staticClass: "pull-left",
                                on: {
                                  change: function($event) {
                                    var $$selectedVal = Array.prototype.filter
                                      .call($event.target.options, function(o) {
                                        return o.selected
                                      })
                                      .map(function(o) {
                                        var val =
                                          "_value" in o ? o._value : o.value;
                                        return val
                                      });
                                    _vm.$set(
                                      child,
                                      "type",
                                      $event.target.multiple
                                        ? $$selectedVal
                                        : $$selectedVal[0]
                                    );
                                  }
                                }
                              },
                              _vm._l(_vm.filterTypes, function(type, $index) {
                                return _c("option", { key: $index }, [
                                  _vm._v(_vm._s(type))
                                ])
                              }),
                              0
                            ),
                            _vm._v(" "),
                            child.type
                              ? _c(
                                  _vm.filters[child.type],
                                  _vm._b(
                                    { tag: "component" },
                                    "component",
                                    {
                                      filter: child,
                                      apply: _vm.updateChild($index),
                                      remove: _vm.removeChild($index)
                                    },
                                    false
                                  )
                                )
                              : _vm._e()
                          ],
                          1
                        )
                      ]
                    )
                  : _c("search-query-builder", {
                      attrs: {
                        filters: _vm.filters,
                        query: child,
                        apply: _vm.updateChild($index),
                        remove: _vm.removeChild($index)
                      }
                    })
              ],
              1
            )
          }),
          _vm._v(" "),
          _vm.operator !== "not" || _vm.children.length < 1
            ? _c("div", { staticClass: "panel panel-default" }, [
                _c(
                  "div",
                  { staticClass: "panel-body", class: "bg-" + _vm.color },
                  [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-primary btn-sm",
                        on: {
                          click: function($event) {
                            $event.preventDefault();
                            return _vm.addFilter()
                          }
                        }
                      },
                      [
                        _c("i", { staticClass: "fa fa-plus" }),
                        _vm._v("\n          Add Filter\n        ")
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-primary btn-sm",
                        on: {
                          click: function($event) {
                            $event.preventDefault();
                            return _vm.addSubGroup()
                          }
                        }
                      },
                      [
                        _c("i", { staticClass: "fa fa-list" }),
                        _vm._v("\n          Add Sub-group\n        ")
                      ]
                    )
                  ]
                )
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.remove
            ? _c("div", { staticClass: "clearfix" }, [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-danger btn-sm",
                    on: {
                      click: function($event) {
                        $event.preventDefault();
                        return _vm.remove()
                      }
                    }
                  },
                  [
                    _c("i", { staticClass: "fa fa-times" }),
                    _vm._v("\n        Remove\n      ")
                  ]
                )
              ])
            : _vm._e()
        ],
        2
      )
    ]
  )
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  var __vue_inject_styles__$5 = function (inject) {
    if (!inject) { return }
    inject("data-v-4fae132c_0", { source: ".search-query-filter .panel-body[data-v-4fae132c] {\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: flex-start;\n}\n.search-query-filter select[data-v-4fae132c] {\n  flex: none;\n}\ninput[data-v-4fae132c],\nselect[data-v-4fae132c] {\n  margin-right: 5px;\n}\n.btn-sm[data-v-4fae132c] {\n  margin-right: 5px;\n}\n.panel[data-v-4fae132c] {\n  margin-top: 10px;\n}\n.panel-body[data-v-4fae132c] {\n  min-height: initial;\n}\ninput:invalid + span.validity[data-v-4fae132c]:after {\n  content: '✖ non-negative integers only';\n  color: #d9534f;\n}\n", map: {"version":3,"sources":["SearchQueryBuilder.vue"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,qBAAqB;EACrB,uBAAuB;AACzB;AACA;EACE,UAAU;AACZ;AACA;;EAEE,iBAAiB;AACnB;AACA;EACE,iBAAiB;AACnB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,mBAAmB;AACrB;AACA;EACE,uCAAuC;EACvC,cAAc;AAChB","file":"SearchQueryBuilder.vue","sourcesContent":[".search-query-filter .panel-body {\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: flex-start;\n}\n.search-query-filter select {\n  flex: none;\n}\ninput,\nselect {\n  margin-right: 5px;\n}\n.btn-sm {\n  margin-right: 5px;\n}\n.panel {\n  margin-top: 10px;\n}\n.panel-body {\n  min-height: initial;\n}\ninput:invalid + span.validity:after {\n  content: '✖ non-negative integers only';\n  color: #d9534f;\n}\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$5 = "data-v-4fae132c";
  /* module identifier */
  var __vue_module_identifier__$5 = undefined;
  /* functional template */
  var __vue_is_functional_template__$5 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$5 = normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    createInjector,
    undefined,
    undefined
  );

var searchquerybuilder = {
  SearchQueryBuilder: __vue_component__$5,
  SearchQueryFilterQueryText: __vue_component__$2,
  SearchQueryFilterRange: __vue_component__$4,
  SearchQueryFilterSelection: __vue_component__$3
};

// Import vue component

// Declare install function executed by Vue.use()
function install(Vue) {
  if (install.installed) { return; }
  install.installed = true;
  Vue.component(mlTreeFacet.mlTreeFacet.name, mlTreeFacet.mlTreeFacet);
  Vue.component(mlTreeFacet.mlSubTree.name, mlTreeFacet.mlSubTree);
  Vue.component(
    searchquerybuilder.SearchQueryBuilder.name,
    searchquerybuilder.SearchQueryBuilder
  );
  Vue.component(
    searchquerybuilder.SearchQueryFilterQueryText.name,
    searchquerybuilder.SearchQueryFilterQueryText
  );
  Vue.component(
    searchquerybuilder.SearchQueryFilterRange.name,
    searchquerybuilder.SearchQueryFilterRange
  );
  Vue.component(
    searchquerybuilder.SearchQueryFilterSelection.name,
    searchquerybuilder.SearchQueryFilterSelection
  );
}

// Create module definition for Vue.use()
var plugin = {
  install: install
};

// Auto-install when vue is found (eg. in browser via <script> tag)
var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  /* eslint no-undef: 0 */
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export { install, mlTreeFacet, searchquerybuilder };
