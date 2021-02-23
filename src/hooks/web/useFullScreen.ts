import { ref } from 'vue';

type RFSMethodProp =
  | 'webkitRequestFullScreen'
  | 'msRequestFullscreen'
  | 'mozRequestFullScreen'
  | 'requestFullscreen';
type EFSMethodProp =
  | 'webkitExitFullscreen'
  | 'msExitFullscreen'
  | 'mozCancelFullScreen'
  | 'exitFullscreen';
type FSENameProp =
  | 'webkitFullscreenElement'
  | 'msFullscreenElement'
  | 'mozFullScreenElement'
  | 'fullscreenElement';

export function useFullScreen(
  target = document.documentElement,
  options?: FullscreenOptions
): any {
  const isFullScreenRef = ref(false);
  const el = document.documentElement;
  let RFS_METHOD_NAME: RFSMethodProp = 'requestFullScreen';
  let EFS_METHOD_NAME: EFSMethodProp = 'exitFullScreen';
  let FSE_NAME: FSENameProp = 'fullScreenElement';

  if ('webkitRequestFullScreen' in el) {
    RFS_METHOD_NAME = 'webkitRequestFullScreen';
    EFS_METHOD_NAME = 'webkitExitFullscreen';
    FSE_NAME = 'webkitFullscreenElement';
  } else if ('msRequestFullscreen' in el) {
    RFS_METHOD_NAME = 'msRequestFullscreen';
    EFS_METHOD_NAME = 'msExitFullscreen';
    FSE_NAME = 'msFullscreenElement';
  } else if ('mozRequestFullScreen' in el) {
    RFS_METHOD_NAME = 'mozRequestFullScreen';
    EFS_METHOD_NAME = 'mozCancelFullScreen';
    FSE_NAME = 'mozFullScreenElement';
  } else if (!('requestFullscreen' in el)) {
    throw new Error('当前浏览器不支持Fullscreen API !');
  }

  function enterFullScreen() {
    isFullScreenRef.value = true;
    (target as any)[RFS_METHOD_NAME](options);
  }

  function exitFullScreen() {
    isFullScreenRef.value = false;
    (document as any)[EFS_METHOD_NAME]();
  }

  function toggleFullScreen() {
    if (isFullScreenRef.value) {
      exitFullScreen();
    } else {
      enterFullScreen();
    }
  }

  function isFullScreen() {
    return target === (document as any)[FSE_NAME];
  }

  return {
    enterFullScreen,
    exitFullScreen,
    toggleFullScreen,
    isFullScreenRef,
    isFullScreen,
  };
}
