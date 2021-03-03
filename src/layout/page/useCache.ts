import { PAGE_LAYOUT_KEY, tabStore } from '@/store/modules/tab';
import { computed, getCurrentInstance, ref, unref } from 'vue';

export function useCache(
  isPage: boolean
): {
  getCaches: any;
} {
  const getCaches = computed(() => {
    const cachedMap = tabStore.getCachedMapState;
    if (isPage) {
      return cachedMap.get(PAGE_LAYOUT_KEY) || [];
    }

    const instance = getCurrentInstance();
    const name = ref('');
    if (instance && instance.type.name) {
      name.value = instance.type.name;
    }

    const cacheSet = new Set<string>();
    cacheSet.add(unref(name));

    const list = cachedMap.get(unref(name));
    if (!list) {
      return Array.from(cacheSet);
    }
    list.forEach((item) => {
      cacheSet.add(item);
    });
    return Array.from(cacheSet);
  });
  return {
    getCaches,
  };
}
