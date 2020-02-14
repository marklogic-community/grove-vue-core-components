<template>
  <ul class="ml-sub-tree">
    <li v-for="(id, $index) in nonEmptystartIds" :key="$index" :id="id">
      <div :class="nodes[id].highlight ? 'ml-tree-highlight' : ''">
        <a
          href
          v-if="
            nodes[id].children &&
              nodes[id].children.length &&
              (showEmpty || nodes[id].sum > (nodes[id].value || 0))
          "
          v-on:click.prevent="toggle(id)"
        >
          <i class="fa fa-chevron-right" v-show="collapsed[id]"></i>
          <i class="fa fa-chevron-down" v-show="!collapsed[id]"></i>
        </a>
        <a href v-on:click.prevent="onClick(nodes[id])">{{
          nodes[id].label
        }}</a>
        <a href v-on:click.prevent="onClick(nodes[id], true)"
          ><i class="fa fa-remove"></i
        ></a>
        <span v-show="nodes[id].value"> ({{ nodes[id].value }})</span>
        <span v-show="showSums && nodes[id].sum"> [{{ nodes[id].sum }}]</span>
      </div>
      <div
        v-if="!collapsed[id] && nodes[id].children && nodes[id].children.length"
      >
        <ml-sub-tree
          :nodes="nodes"
          :start-ids="nodes[id].children"
          :on-click="onClick"
          :show-empty="showEmpty"
          :show-sums="showSums"
          :sort="sort"
        ></ml-sub-tree>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ml-sub-tree',
  components: {},
  data() {
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
    nonEmptystartIds() {
      let arr = [];
      if (this.showEmpty) {
        arr = this.startIds.filter(id => {
          const node = this.nodes[id];
          return node !== undefined;
        });
      } else {
        arr = this.startIds.filter(id => {
          const node = this.nodes[id];
          return node && node.sum > 0;
        });
      }
      if (this.sort) {
        arr.sort();
      }
      return arr;
    }
  },
  methods: {
    toggle(id) {
      this.$set(this.collapsed, id, !this.collapsed[id]);
    }
  }
};
</script>

<style lang="less" scoped>
ul.ml-sub-tree {
  list-style: none;

  .ml-tree-highlight {
    background-color: lightyellow;
  }
}
</style>
