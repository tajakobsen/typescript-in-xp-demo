import {DefaultPageConfig} from "./default-page-config";
import {Response} from "enonic-types/controller";
import {Region} from "enonic-types/portal";

const {getContent} = __non_webpack_require__('/lib/xp/portal');
const {render} = __non_webpack_require__('/lib/thymeleaf');

const view = resolve('default.html');

const NAVBAR_CLASS_MAP = {
  light: 'navbar-light bg-light',
  dark: 'navbar-dark bg-dark',
  blue: 'navbar-dark bg-primary'
};

export function all(): Response {
  const content = getContent<any, DefaultPageConfig>();

  return {
    status: 200,
    body: render<ThymeleafParams>(view,
      {
        mainRegion: content.page.regions.main,
        pageTitle: content.displayName,
        navbarTitle: content.page.config.navbarTitle,
        navbarClass: NAVBAR_CLASS_MAP[content.page.config.navbarColorScheme]
      }
    )
  };
}

interface ThymeleafParams {
  mainRegion: Region;
  pageTitle: string;
  navbarTitle?: string;
  navbarClass: string;
}
