const {getContent} = __non_webpack_require__('/lib/xp/portal');
const {render} = __non_webpack_require__('/lib/thymeleaf');

const view = resolve('default.html');

const NAVBAR_CLASS_MAP = {
  light: 'navbar-light bg-light',
  dark: 'navbar-dark bg-dark',
  blue: 'navbar-dark bg-primary'
};

export function all() {
  const content = getContent();

  return {
    status: 200,
    body: render(view,
      {
        mainRegion: content.page.regions.main,
        pageTitle: content.displayName,
        navbarTitle: content.page.config.navbarTitle,
        navbarClass: NAVBAR_CLASS_MAP[content.page.config.navbarColorScheme]
      }
    )
  };
}
