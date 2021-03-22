/* eslint-disable no-param-reassign */

import HoverDropdown from "../../common/HoverDropdown/HoverDropdown.vue";

export default {
  props: ["show", "sort", "offset", "count", "total"],
  components: {
    HoverDropdown,
  },
  data() {
    return {
      sortItems: [
        { id: null, name: this.$t("recommended") },
        { id: "newest", name: this.$t("newest") },
        { id: "highToLow", name: this.$t("highToLow") },
        { id: "lowToHigh", name: this.$t("lowToHigh") },
        { id: "rating", name: "Rating" }
      ],
    };
  },
  computed: {},
  methods: {
    toggleFilter(e) {
      this.$emit("toggle-filter", e);
    },
    changeSort(sort) {
      this.$emit("change-sort", sort);
    },
  },
  watch: {},
};
