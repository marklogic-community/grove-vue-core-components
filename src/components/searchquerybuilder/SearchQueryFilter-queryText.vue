<template>
  <div class="search-query-filter-queryText">
    <input type="text" v-model="value" v-on:change="updateParent()" />
    <button class="btn btn-danger btn-sm" v-on:click.prevent="remove()">
      <i class="fa fa-times"></i>
      Remove
    </button>
  </div>
</template>

<script>
export default {
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
  data() {
    return this.initData();
  },
  methods: {
    initData() {
      var error;

      // pass-through
      var type = this.filter.type || 'queryText';
      var constraint = this.filter.constraint;

      // editable
      var value = this.filter.value || '';

      return {
        error,
        type,
        constraint,
        value
      };
    },
    updateParent() {
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
</script>

<style lang="less" scoped>
// flexing related to parent
.search-query-filter-queryText {
  flex: auto;
  width: 100%;
}
// inner flexing scope
.search-query-filter-queryText {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
}
input {
  flex: auto;
  width: 100%;
}
select,
button {
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
</style>
