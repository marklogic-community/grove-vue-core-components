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
      var self = this;
      var totalSum = 0;
      startIds.forEach(function(id) {
        var node = nodes[id];
        var sum = node.children ? self.calculateSums(nodes, node.children) : 0;
        if (sum === 0) {
          sum = sum + (node.value || 0);
        }
        node.sum = sum;
        totalSum += sum;
      });
      return totalSum;
    },
    updateSuggestions(nodes) {
      var self = this;
      self.suggestionsList = [];
      Object.keys(nodes).forEach(id => {
        const node = nodes[id];
        if (node.sum > 0) {
          if (node.label) {
            self.suggestionsList.push(node.label);
          }
          if (node.altLabels) {
            node.altLabels.forEach(function(label) {
              self.suggestionsList.push(label);
            });
          }
        }
      });
      self.suggestionsList.sort();
    },
    highlightNodes(selected) {
      var self = this;

      this.searchNode = selected !== undefined ? selected : this.searchNode;

      var noMatch = {
        test: function() {
          return false;
        }
      };

      var _highlightNodes = function(match, startIds) {
        var totalHit = false;
        startIds.forEach(function(id) {
          var node = self.nodes_[id];
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
            self.$set(node, 'highlight', true);
            totalHit = true;
          } else {
            self.$set(node, 'highlight', false);
          }
        });
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
      if (this.facet !== undefined && Object.keys(this.nodes).length) {
        var nodes = JSON.parse(JSON.stringify(this.nodes));
        this.facet.facetValues.forEach(facetValue => {
          nodes[facetValue.value].value = facetValue.count;
        });
        this.calculateSums(nodes, this.startIds);
        this.updateSuggestions(nodes);
        this.nodes_ = nodes;
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
      }
    },
    facet() {
      this.init();
    },
    nodes() {
      this.init();
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
