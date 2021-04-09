import dayjs from "dayjs";
import 'dayjs/locale/nb';
import {formatDate} from "../../../lib/utils";
dayjs.locale('nb');

const portalLib = __non_webpack_require__("/lib/xp/portal");
const contentLib = __non_webpack_require__("/lib/xp/content");
const {render} = __non_webpack_require__("/lib/thymeleaf");

const view = resolve("comment-list.html");

export function get() {
  const currentContent = portalLib.getContent();

  const res = contentLib.query({
    query: `_parentPath LIKE '/content${currentContent._path}'`,
    count: 25,
    contentTypes: [`${app.name}:comment`]
  });

  const comments = res.hits.map((commentContent) => {
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
    }
  });

  return {
    status: 200,
    body: render(view, {
      comments
    })
  }
}
