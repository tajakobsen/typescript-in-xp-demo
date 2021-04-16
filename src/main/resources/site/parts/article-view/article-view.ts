import {Article} from "../../content-types/article/article";
import {Content} from "enonic-types/content";
import {Request, Response} from "enonic-types/controller";
import portalLib from "/lib/xp/portal";
import {render} from "/lib/thymeleaf";

const view = resolve("article-view.html");

export function get(req: Request): Response {
  const currentContent = portalLib.getContent<Article>();

  return {
    status: 200,
    body: render<ThymeleafParams>(
      view,
      createThymeleafParams(currentContent)
    )
  };
}

function createThymeleafParams(currentContent: Content<Article>): ThymeleafParams {
  return {
    title: currentContent.displayName,
    preface: currentContent.data.preface,
    body: currentContent.data.body,
    imageUrl: (currentContent.data.articleImage !== undefined)
      ? portalLib.imageUrl({
        id: currentContent.data.articleImage,
        quality: 80,
        scale: 'block(936, 400)',
        filter: 'rounded(10)',
        format: 'jpeg'
      })
      : undefined,
    imageAltText: currentContent.data.imageAlt
  };
}

interface ThymeleafParams {
  title: string;
  preface: string;
  body: string;
  imageUrl?: string;
  imageAltText?: string;
}
