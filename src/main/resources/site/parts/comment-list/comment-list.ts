import {formatDate} from "../../../lib/utils";
import {CommentListPartConfig} from "./comment-list-part-config";
import {Content} from "enonic-types/content";
import {Response} from "enonic-types/controller";
import {Comment} from "../../content-types/comment/comment";

const portalLib = __non_webpack_require__("/lib/xp/portal");
const contentLib = __non_webpack_require__("/lib/xp/content");
const {render} = __non_webpack_require__("/lib/thymeleaf");

const view = resolve("comment-list.html");

export function get(): Response {
  const part = portalLib.getComponent<CommentListPartConfig>();
  const currentContent = portalLib.getContent();

  const res = contentLib.query<Comment>({
    count: 500,
    query: `_parentPath LIKE '/content${currentContent._path}'`,
    contentTypes: [`${app.name}:comment`]
  });

  return {
    status: 200,
    body: render<ThymeleafParams>(view, {
      comments: res.hits.map(createSimpleComment),
      displayDate: part.config.displayDate
    })
  };
}

function createSimpleComment(commentContent: Content<Comment>): SimpleComment {
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

interface ThymeleafParams {
  comments: Array<SimpleComment>;
  displayDate: boolean;
}

interface SimpleComment {
  author: string;
  text: string;
  imageUrl: string;
  altText: string;
  date: string;
}
