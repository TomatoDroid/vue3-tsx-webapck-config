import type {
  RouteLocationNormalized,
  Router,
  RouteRecordNormalized,
} from 'vue-router';
import { tabStore } from '@/store/modules/tab';

export function getRoute(
  route: RouteLocationNormalized
): RouteLocationNormalized {
  const { matched, ...opt } = route;
  return {
    ...opt,
    matched: (matched
      ? matched.map((item: RouteRecordNormalized) => ({
          meta: item.meta,
          path: item.path,
          name: item.name,
        }))
      : undefined) as RouteRecordNormalized[],
  };
}

export function createPageGuard(router: Router): void {
  router.beforeEach((to) => {
    tabStore.addTabAction(getRoute(to));

    return true;
  });
}
