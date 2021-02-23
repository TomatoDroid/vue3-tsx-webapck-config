import { unref } from 'vue';
import router from '@/routes/router';

export const useRedo = (): Promise<boolean> => {
  const { push, currentRoute } = router;
  const { path, query, params } = unref(currentRoute);
  return new Promise((resolve) => {
    push({
      path: `/redirect${path}`,
      query,
      params,
    }).then(() => resolve(true));
  });
};
