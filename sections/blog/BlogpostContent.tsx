import { BlogPostPage } from "apps/blog/types.ts";
import Container, { SpacingConfig } from "../container/Container.tsx";
import BlogpostHeader from "../../components/blog/BlogpostHeader.tsx";
import { AppContext } from "../../mod.ts";

interface Props {
  /** @title Blogpost Loader */
  postPage: BlogPostPage | null;
  /** @title Spacing */
  spacing?: SpacingConfig;
}

export default function BlogpostContent(
  { postPage, spacing, siteTemplate }: ReturnType<typeof loader>,
) {
  if (!postPage) {
    return (
      <Container spacing={spacing} class="container px-6 sm:px-0">
        Not found!
      </Container>
    );
  }
  return (
    <Container
      spacing={spacing}
      class="container max-w-[863px] px-6 sm:px-0 flex flex-col"
    >
      <BlogpostHeader blogpost={postPage.post} siteTemplate={siteTemplate} />
    </Container>
  );
}

export function loader(props: Props, req: Request, ctx: AppContext) {
  const { siteTemplate } = ctx;
  return {
    ...props,
    url: req.url,
    siteTemplate,
  };
}
