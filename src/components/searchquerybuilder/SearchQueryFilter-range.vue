<template>
  <span class="search-query-filter-range">
    <input type="text" v-model="constraint" v-on:change="updateParent()" />
    <select v-model="constraintType" v-on:change="updateParent()">
      <option>collection</option>
      <option>custom</option>
      <option>geospatial</option>
      <option>range</option>
    </select>
    <select v-model="mode" v-on:change="updateParent()">
      <option>or</option>
      <option>and</option>
    </select>
    <ul class="values list-unstyled">
      <li v-for="(value, $index) in values" :key="$index">
        <select v-model="value.operator" v-on:change="updateParent()">
          <option
            v-for="(label, name) in validOperators"
            :key="name"
            :value="name"
            >{{ label }}</option
          >
        </select>
        <input type="text" v-model="value.value" v-on:change="updateParent()" />
        <button
          class="btn btn-warning btn-xs"
          v-on:click.prevent="lessValues($index)"
        >
          <i class="fa fa-minus"></i>
          Less
        </button>
      </li>
      <li>
        <button
          class="btn btn-success btn-xs"
          v-on:click.prevent="moreValues()"
        >
          <i class="fa fa-plus"></i>
          More
        </button>
      </li>
    </ul>
    <button class="btn btn-danger btn-sm" v-on:click.prevent="remove()">
      <i class="fa fa-times"></i>
      Remove
    </button>
  </span>
</template>

<script>
export default {
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
  data() {
    return this.initData();
  },
  methods: {
    initData() {
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
          values = this.filter.value.map(value => {
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
          Object.keys(this.filter.value).forEach(operator => {
            if (validOperators.indexOf(operator) < 0) {
              error =
                'Invalid filter: unrecognized operator "' + operator + '"';
              operator = 'eq';
            }
            var value = this.filter.value[operator];
            if (Array.isArray(value)) {
              value.forEach(value => {
                values.push({ operator, value });
              });
            } else {
              values.push({ operator, value });
            }
          });
        } else {
          values.push({ operator: 'eq', value: this.filter.value });
        }
      } else {
        values.push({ operator: 'eq', value: '' });
      }

      return {
        validOperators,
        error,
        type,
        constraint,
        constraintType,
        mode,
        values
      };
    },
    moreValues() {
      this.values.push({ operator: 'eq', value: '' });
      this.updateParent();
    },
    lessValues($index) {
      this.values.splice($index, 1);
      this.updateParent();
    },
    updateParent() {
      var values = {};
      this.values.forEach(value => {
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
</script>

<style lang="less" scoped>
// flexing related to parent
.search-query-filter-range {
  flex: auto;
  width: 100%;
}
// inner flexing scopes
.search-query-filter-range,
.values li {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
}
.search-query-filter-range > input,
.values {
  flex: auto;
  width: 50%;
}
.values input[type='checkbox'],
.values span,
select,
button {
  flex: none;
}
.values input[type='text'] {
  flex: auto;
}
// some minimal styling
input,
select,
button {
  margin-right: 5px;
}
.panel {
  margin-top: 10px;
}
.panel-body {
  min-height: initial;
}
</style>
