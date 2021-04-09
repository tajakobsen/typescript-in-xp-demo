import {formatDate} from "../../../lib/utils";

const portalLib = __non_webpack_require__("/lib/xp/portal");
const contentLib = __non_webpack_require__("/lib/xp/content");
const {render} = __non_webpack_require__("/lib/thymeleaf");

const view = resolve("comment-list.html");

export function get() {
  const part = portalLib.getComponent();
  const currentContent = portalLib.getContent();

  const res = contentLib.query({
    query: `_parentPath LIKE '/content${currentContent._path}'`,
    contentTypes: [`${app.name}:comment`]
  });

  const comments = res.hits.map(createSimpleComment);

  return {
    status: 200,
    body: render(view, {
      comments,
      displayDate: part.config.displayDate
    })
  };
}

function createSimpleComment(commentContent) {
  return {
    author: commentContent.data.name,
    text: commentContent.data.text,
    imageUrl: portalLib.imageUrl({
      id: commentContent.data.imageId,
      quality: 80,
      scale: 'block(75,75)',
      filter: 'rounded(75)',
      format: 'jpeg'
    }),
    altText: `Profile image of ${commentContent.data.name}`,
    date: formatDate(commentContent.createdTime)
  };
}
