import { shouldShowBanner, renderBanner } from './cookieBanner';

const main = () => {
  if (shouldShowBanner()) {
    renderBanner();
  }
};

main();
