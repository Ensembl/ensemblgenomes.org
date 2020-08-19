const STORAGE_KEY = 'hasConsentedToCookies';

export const shouldShowBanner = () => {
  const hasConsentedToCookies = localStorage.getItem(STORAGE_KEY);
  return !Boolean(hasConsentedToCookies);
};

export const renderBanner = () => {
  const banner = document.createElement('div');
  banner.innerHTML = `
    <div class="cookie-banner__message">
      <span>
        This website requires cookies in order to function.
        By using the site you are agreeing to this as outlined in our
          <a target="_blank" href="https://www.ebi.ac.uk/data-protection/ensembl/privacy-notice">Privacy Policy</a>
          and
          <a target="_blank" href="https://www.ebi.ac.uk/about/terms-of-use">Terms of Use</a>.
      </span>
    </div>
    <div class="cookie-banner__button-container">
      <button class="cookie-banner__button">
        I agree
      </button>
    </div>
  `;
  banner.classList.add('cookie-banner');
  banner.querySelector('.cookie-banner__button')
    ?.addEventListener('click', () => handleConsent(banner));
  
  const container = document.body;
  container.appendChild(banner);
};

const handleConsent = (banner: HTMLElement) => {
  localStorage.setItem(STORAGE_KEY, 'true');
  removeBanner(banner);
};

const removeBanner = (banner: HTMLElement) => {
  banner.parentElement?.removeChild(banner);
};
