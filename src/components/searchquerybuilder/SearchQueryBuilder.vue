<!-- Example SearchQuery:
{
  "and": [
    {
      "type": "queryText",
      "value": "foo AND bar"
    },
    {
      "type": "selection",
      "constraint": "firstName",
      "value": [
        "Geert",
        {
          "not": "Patrick"
        }
      ],
      "mode": "and"
    },
    {
      "type": "selection",
      "constraint": "active",
      "value": true
    },
    {
      "type": "range",
      "constraint": "age",
      "value": {
        "ge": 20,
        "ne": 99
      }
    },
    {
      "type": "selection",
      "constraint": "eyeColor",
      "value": [
        "blue",
        "brown"
      ],
      "mode": "or"
    },
    {
      "or": [
        {
          "type": "selection",
          "constraint": "occupationCategory",
          "value": "software"
        },
        {
          "and": [
            {
              "type": "selection",
              "constraint": "occupationCategory",
              "value": "IT"
            },
            {
              "not": {
                "or": [
                  "marketing",
                  "support"
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "near": {
        "queries": [{
          "type": "queryText",
          "value": "Patrick"
        }, {
          "type": "queryText",
          "value": "McElwee"
        }],
        "distance": 10
      }
    }
  ]
}
-->
<template>
  <div class="search-query-builder panel panel-default">
    <div class="panel-body" :class="'bg-' + color">
      <div class="clearfix">
        <!-- top-level QueryBuilder should not get 'remove' passed in, show buttons in that case -->
        <div class="pull-right" v-if="!remove">
          <button
            class="btn btn-primary btn-sm"
            v-on:click.prevent="updateParent(true)"
          >
            <i class="fa fa-check"></i>
            Apply
          </button>
          <button class="btn btn-primary btn-sm" v-on:click.prevent="reset()">
            <i class="fa fa-undo"></i>
            Reset
          </button>
        </div>
        <!-- Group operator -->
        <select v-model="operator" v-on:change.prevent="changeOperator()">
          <option v-for="(value, key) in operators" :key="key" :value="key">{{
            value
          }}</option>
        </select>
        <input
          v-if="operator === 'near'"
          type="text"
          pattern="^\d+$"
          v-model="distance"
          xxv-on:keyup.prevent="checkDistance()"
          v-on:change.prevent="checkDistance()"
        />
        <span v-if="operator === 'near'" class="validity"></span>
        <!-- show errors when a bad query is passed in -->
        <span v-if="error" class="alert alert-danger">{{ error }}</span>
      </div>

      <!-- iterate over children -->
      <div class="child" v-for="(child, $index) in children" :key="$index">
        <!-- invoke filter component for filter children -->
        <div
          v-if="child.type !== undefined"
          class="search-query-filter panel"
          :class="'panel-' + color"
        >
          <div class="panel-body" :class="'bg-' + color">
            <select v-model="child.type" class="pull-left">
              <option v-for="(type, $index) in filterTypes" :key="$index">{{
                type
              }}</option>
            </select>
            <component
              v-if="child.type"
              :is="filters[child.type]"
              v-bind="{
                filter: child,
                apply: updateChild($index),
                remove: removeChild($index)
              }"
            ></component>
          </div>
        </div>
        <!-- recursive call for sub-groups -->
        <search-query-builder
          v-else
          :filters="filters"
          :query="child"
          :apply="updateChild($index)"
          :remove="removeChild($index)"
        ></search-query-builder>
      </div>

      <!-- allow adding filter or sub-group -->
      <div
        class="panel panel-default"
        v-if="operator !== 'not' || children.length < 1"
      >
        <div class="panel-body" :class="'bg-' + color">
          <button
            class="btn btn-primary btn-sm"
            v-on:click.prevent="addFilter()"
          >
            <i class="fa fa-plus"></i>
            Add Filter
          </button>
          <button
            class="btn btn-primary btn-sm"
            v-on:click.prevent="addSubGroup()"
          >
            <i class="fa fa-list"></i>
            Add Sub-group
          </button>
        </div>
      </div>

      <!-- removal of this group (invokes parent) -->
      <div class="clearfix" v-if="remove">
        <button class="btn btn-danger btn-sm" v-on:click.prevent="remove()">
          <i class="fa fa-times"></i>
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SearchQueryFilterQueryText from './SearchQueryFilter-queryText.vue';
import SearchQueryFilterSelection from './SearchQueryFilter-selection.vue';
import SearchQueryFilterRange from './SearchQueryFilter-range.vue';

export default {
  name: 'SearchQueryBuilder',
  props: {
    filters: {
      type: Object,
      default() {
        return {
          queryText: SearchQueryFilterQueryText,
          selection: SearchQueryFilterSelection,
          range: SearchQueryFilterRange
        };
      }
    },
    query: {
      type: Object,
      default() {
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
  data() {
    return this.initData();
  },
  computed: {
    filterTypes() {
      return Object.keys(this.filters);
    }
  },
  methods: {
    initData() {
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

      children = children.map(child => {
        if (!this.isObject(child)) {
          child = {
            type: 'queryText',
            value: child
          };
        }
        return child;
      });

      var color = this.getColor(operator);

      return {
        error,
        operators,
        operator,
        distance,
        children,
        color
      };
    },
    getColor(operator) {
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
    reset(skipParent) {
      var init = this.initData();
      this.error = init.error;
      this.operator = init.operator;
      this.children = init.children;
      if (!skipParent) {
        this.updateParent();
      }
    },
    changeOperator() {
      this.color = this.getColor(this.operator);
      this.updateParent();
    },
    checkDistance() {
      this.distance = this.distance.replace(/^([0-9]*).*$/, '$1');
      this.updateParent();
    },
    addFilter() {
      this.children.push({ type: this.filterTypes[0] });
      this.updateParent();
    },
    addSubGroup() {
      this.children.push({ and: [] });
      this.updateParent();
    },
    updateChild($index) {
      var self = this;
      return function(childQuery) {
        self.children[$index] = childQuery;
        self.updateParent();
      };
    },
    removeChild($index) {
      var self = this;
      return function() {
        self.children.splice($index, 1);
        self.updateParent();
      };
    },
    updateParent(force) {
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
    isObject(value) {
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
</script>

<style lang="less" scoped>
// use flexing to make optimal use of width
.search-query-filter .panel-body {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
}
.search-query-filter select {
  flex: none;
}
// some minimal styling
input,
select {
  margin-right: 5px;
}
.btn-sm {
  margin-right: 5px;
}
.panel {
  margin-top: 10px;
}
.panel-body {
  min-height: initial;
}
input:invalid + span.validity:after {
  content: '✖ non-negative integers only';
  color: #d9534f;
}
// input:valid+span:after {
//   content: '✓';
//   padding-left: 5px;
// }
</style>
