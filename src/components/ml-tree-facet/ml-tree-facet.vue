<template>
  <div
    class="ml-facet ml-tree-facet"
    v-if="startIds.length"
    v-show="!facet.hide"
  >
    <h3 v-on:click.prevent="showHideFacet()">
      {{ facet.name | capitalize }}
      <div class="pull-right">
        <i class="fa fa-caret-right" v-if="!facetOpen"></i>
        <i class="fa fa-caret-down" v-if="!!facetOpen"></i>
      </div>
    </h3>
    <div v-if="facetOpen">
      <form v-if="showSearch" v-on:submit.prevent="highlightNodes()">
        <span>
          Search:
          <!--input v-model="searchNode" autocomplete="off" uib-typeahead="suggestion for suggestion in suggestionsList | filter:$viewValue | limitTo:20" placeholder="in the tree below"-->
          <multiselect
            :value="searchNode"
            :options="suggestionsList"
            :multiple="false"
            :searchable="true"
            :clear-on-select="false"
            placeholder="in the tree below"
            open-direction="bottom"
            v-on:select="highlightNodes"
          >
          </multiselect>
        </span>
        <div>
          Show empty nodes
          <input type="checkbox" v-model="showEmpty_" />
        </div>
      </form>

      <ml-sub-tree
        :nodes="nodes_"
        :start-ids="startIds"
        :on-click="onClick"
        :show-empty="showEmpty_"
        :show-sums="showSums"
        :sort="sort"
      ></ml-sub-tree>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import mlSubTree from './ml-sub-tree.vue';

import 'vue-multiselect/dist/vue-multiselect.min.css';

export default {
  name: 'ml-tree-facet',
  components: {
    Multiselect,
    mlSubTree
  },
  props: {
    facet: {
      type: Object,
      required: true
    },
    values: {
      type: Object,
      required: false
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
  data() {
    return {
      searchNode: '',
      suggestionsList: [],
      showEmpty_: false,
      nodes_: {},
      facetOpen: true
    };
  },
  methods: {
    showHideFacet() {
      this.facetOpen = !this.facetOpen;
    },
    onClick(node, negate) {
      if (negate) {
        this.negate(this.facet.name, this.facet.type, node.id, node.label);
      } else {
        this.toggle(this.facet.name, this.facet.type, node.id, node.label);
      }
    },
    calculateSums(nodes, startIds) {
      var totalSum = 0;
      startIds.forEach(function(id) {
        var node = nodes[id];
        var sum = node.children ? this.calculateSums(nodes, node.children) : 0;
        if (sum === 0) {
          sum += node.value;
        }
        node.sum = sum;
        totalSum += sum;
      }, this);
      return totalSum;
    },
    updateSuggestions(nodes) {
      this.suggestionsList = [];
      Object.keys(nodes).forEach(id => {
        const node = nodes[id];
        if (this.showEmpty_ || node.sum > 0) {
          if (node.label) {
            this.suggestionsList.push(node.label);
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
    highlightNodes(selected) {
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
    init() {
      if (Object.keys(this.nodes_).length) {
        if (this.facet !== undefined && this.facet.facetValues) {
          this.facet.facetValues.forEach(facetValue => {
            if (this.nodes_[facetValue.value]) {
              this.nodes_[facetValue.value].facetValue = facetValue.count;
            }
          }, this);
        }

        if (this.values !== undefined) {
          Object.keys(this.nodes).forEach(id => {
            let node = this.nodes_[id];
            if (this.values[id] !== undefined) {
              node.value = this.values[id];
            } else {
              node.value = 0;
            }
          }, this);
        } else {
          Object.keys(this.nodes).forEach(id => {
            let node = this.nodes_[id];
            if (node.facetValue !== undefined) {
              node.value = node.facetValue;
            } else {
              node.value = 0;
            }
          }, this);
        }

        this.calculateSums(this.nodes_, this.startIds);
        this.updateSuggestions(this.nodes_);

        // let Vue know something changed
        this.nodes_ = Object.assign({}, this.nodes_);
      }
    }
  },
  created() {
    this.init();
  },
  watch: {
    showEmpty(newEmpty) {
      if (newEmpty !== undefined) {
        this.showEmpty_ = newEmpty;
        this.updateSuggestions(this.nodes_);
      }
    },
    facet() {
      this.init();
    },
    values() {
      this.init();
    },
    nodes(newNodes) {
      if (newNodes) {
        this.nodes_ = JSON.parse(JSON.stringify(newNodes));
        Object.keys(this.nodes_).forEach(key => {
          let node = this.nodes_[key];
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
</script>

<style lang="less" scoped>
.ml-facet {
  .facet-add-pos,
  .facet-add-neg {
    visibility: hidden;
  }
  span:hover > .facet-add-pos,
  div:hover > .facet-add-neg {
    visibility: visible !important;
  }
  form {
    padding-bottom: 0;
  }
}
</style>
