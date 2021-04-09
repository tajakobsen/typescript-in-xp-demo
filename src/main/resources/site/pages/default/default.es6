const {getContent} = __non_webpack_require__('/lib/xp/portal');
const {render} = __non_webpack_require__('/lib/thymeleaf');

const view = resolve('default.html');

export function all() {
  const content = getContent();

  return {
    status: 200,
    body: render(view,
      {
        mainRegion: content.page.regions.main,
        pageTitle: content.displayName,
      }
    )
  };
}
