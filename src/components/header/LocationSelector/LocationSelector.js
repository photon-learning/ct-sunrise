import sunriseConfig from "../../../../sunrise.config";
import { descriptiontext } from '../../common/shared';
export default {
  props: ['values', 'title'],
  computed: {
    listValues() {
      return Object.entries(this.values).map(([id, name]) => ({ id, name }));
    },
    descriptionLocale(){
      return descriptiontext(this.$route.params.locale);
    },
    descriptionCountry(){
      return descriptiontext(this.$route.params.country);
    }
  },
  methods: {
    setValue(value) {
      if (this.title === 'location') {
        this.$store.dispatch('setCountry', value);
        if(sunriseConfig?.channels?.[value]){
          this.$store.dispatch("setChannel", {
            id: sunriseConfig.channels[value],
          });
        }
        this.$router.replace({
          ...this.$route,
          params: {
            ...this.$route.params,
            country: value,
          },
        });
      } else if (this.title === 'language') {
        this.$store.dispatch('setLocale', value);
        this.$router.replace({
          ...this.$route,
          params: {
            ...this.$route.params,
            locale: value,
          },
        });
      }
    },
  },
};
