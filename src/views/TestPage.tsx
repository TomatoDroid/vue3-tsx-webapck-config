import { defHttp } from '@/utils/http';
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'TestPage',
  setup() {
    const route = useRoute();

    // defHttp
    //   .post({
    //     url: 'https://record-self.situdata.com/tts/getTemplate',
    //     data: {
    //       templateId: 1,
    //     },
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   });
    return () => <h1>{route.path}</h1>;
  },
});
