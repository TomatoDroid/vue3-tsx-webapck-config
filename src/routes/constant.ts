import ParentView from '@/layout/page/ParentView';

export const getParentLayout = (name: string): any => {
  return () => new Promise((resolve) => resolve({ ...ParentView, name }));
};
