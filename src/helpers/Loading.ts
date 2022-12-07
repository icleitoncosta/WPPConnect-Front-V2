import { Loading, QSpinnerBars } from 'quasar';

export function showLoadingFull() {
  Loading.show();
  Loading.show({
    spinner: QSpinnerBars,
    message:
      '<img src="https://avatars.githubusercontent.com/u/77944999?s=200&v=4" width="50" /></br>Welcome to WPPConnect<br/>Loading...',
    html: true,
    boxClass: 'text-teal-1 text-bold',
    backgroundColor: 'primary-10',
    customClass: 'loading-custom',
  });
}

export function hide() {
  Loading.hide();
}
