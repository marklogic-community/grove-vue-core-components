<template>
  <span class="search-query-filter-selection">
    <input type="text" v-model="constraint" v-on:change="updateParent()" />
    <select v-model="constraintType" v-on:change="updateParent()">
      <option>collection</option>
      <option>custom</option>
      <option>geospatial</option>
      <option>range</option>
      <option>value</option>
      <option>word</option>
    </select>
    <select v-model="mode" v-on:change="applyParent()">
      <option>or</option>
      <option>and</option>
    </select>
    <ul class="values list-unstyled">
      <li v-for="(value, $index) in values" :key="$index">
        <input
          type="checkbox"
          v-model="value.not"
          v-on:change="updateParent()"
        />
        <span>
          not
        </span>
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
  data() {
    return this.initData();
  },
  methods: {
    initData() {
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

      values = values.map(value => {
        if (value.not === undefined) {
          return { value: value, not: false };
        } else {
          return value;
        }
      });

      return {
        error,
        type,
        constraint,
        constraintType,
        mode,
        values
      };
    },
    moreValues() {
      this.values.push({ value: '', not: false });
      this.updateParent();
    },
    lessValues($index) {
      this.values.splice($index, 1);
      this.updateParent();
    },
    updateParent() {
      var filter = {
        type: this.type,
        constraint: this.constraint,
        constraintType: this.constraintType,
        mode: this.mode,
        value: this.values.map(value => {
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
</script>

<style lang="less" scoped>
// flexing related to parent
.search-query-filter-selection {
  flex: auto;
  width: 100%;
}
// inner flexing scopes
.search-query-filter-selection,
.values li {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
}
.search-query-filter-selection > input,
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
.values {
  display: inline-block;
  vertical-align: top;
}
input,
select,
button,
.values span {
  margin-right: 5px;
}
.panel {
  margin-top: 10px;
}
.panel-body {
  min-height: initial;
}
</style>
