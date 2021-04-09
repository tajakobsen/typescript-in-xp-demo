const portalLib = __non_webpack_require__("/lib/xp/portal");
const {render} = __non_webpack_require__("/lib/thymeleaf");

const view = resolve("article-view.html");

export function get() {
  const currentContent = portalLib.getContent();

  return {
    status: 200,
    body: render(view, {
      title: currentContent.displayName,
      preface: currentContent.data.preface,
      body: currentContent.data.body,
      imageUrl: portalLib.imageUrl({
        id: currentContent.data.articleImage,
        quality: 80,
        scale: 'block(1296, 400)',
        filter: 'rounded(10)',
        format: 'jpeg'
      }),
      imageAltText: currentContent.data.altText
    })
  }
}
