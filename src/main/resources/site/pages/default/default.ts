import {DefaultPageConfig} from "./default-page-config";
import {Response} from "enonic-types/controller";
import {Region} from "enonic-types/portal";
import {getContent} from "/lib/xp/portal";
import {render} from "/lib/thymeleaf";

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
  navbarClass?: string;
}
