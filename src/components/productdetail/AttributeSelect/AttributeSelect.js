import HooverDropdown from '../../common/HoverDropdown/HoverDropdown.vue';


export default {
  components: {
    HooverDropdown,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    values: {
      type: Array,
      required: true,
    },
    variantCombinations: {
      type: Array,
      required: true,
    },
    selected: {
      type: Object,
      required: true,
    },
  },
  computed: {
    selectedValue: {
      get() {
        const data = this.selected[this.id];
        //return Array.isArray(data) ? this.selected.testsize[0].label : data;
        return data;
      },
      set(value) {
        const sku = this.variantCombinations.find(
          (combi) => combi[this.id] === value,
        )?.sku;
        if (this.name == "Size") {
          if (localStorage.skustart != '') {
            let arr = sku.split('-');
            localStorage.skuselect = localStorage.skustart+'-'+arr[1];
          } else {
            localStorage.skuselect = sku;
          }
          
          if (sku) console.log('tes2', 'sku' + localStorage.skuselect);
        } else {
          let arr = sku.split('-');
          localStorage.skuselect = sku;
          localStorage.skustart = arr[0];
          console.log('tes3', 'sku' + sku);
          if (sku) this.$router.push({ path: sku });
        }

      },
    },
  },
};
