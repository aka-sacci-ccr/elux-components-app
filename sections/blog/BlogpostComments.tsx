import { BlogPostPage, Review } from "apps/blog/types.ts";
import Container, { SpacingConfig } from "../container/Container.tsx";
import { AppContext } from "../../mod.ts";
import { ModalProps } from "../../components/ui/InformativeModal.tsx";
import CommentResult from "../../components/blog/CommentResult.tsx";

export interface Props {
  /**
   * @title Blogpostpage Loader
   */
  page: BlogPostPage | null;
  /**
   * @title Section Title
   */
  title: string;
  /**
   * @title Section Title - Comment
   */
  titleComment: string;
  /**
   * @title Comments per page
   */
  commentsPerPage: number;
  /**
   * @title Submit dialog
   * @description Dialog displayed after submitting a comment
   */
  modalProps: ModalProps;
  /**
   * @title Comment textbox
   */
  textboxProps?: TextboxProps;
  /**
   * @title Spacing config
   */
  spacing?: SpacingConfig;
  /**
   * @ignore
   */
  comments?: Review[];
}

export interface TextboxProps {
  /**
   * @title Maximum lines
   */
  maxLines?: number;
  /**
   * @title Maximum characters
   */
  maxLength?: number;
}

export default function Comments(
  {
    spacing,
    title,
    comments,
    commentsPerPage,
    page,
    modalProps,
    titleComment,
    siteTemplate,
    language,
  }: ReturnType<
    typeof loader
  >,
) {
  if (!page) {
    return <></>;
  }

  const hasComments = !!(comments && comments.length > 0);
  const styling = siteTemplate === "elux" ? ELUX_STYLING : FRIGIDAIRE_STYLING;

  return (
    <Container
      class="container max-w-[863px] px-6 sm:px-0 flex flex-col"
      spacing={spacing}
    >
      {hasComments
        ? (
          <>
            <h2 class={styling.commentTitle}>
              {title}
            </h2>
            <div class="pt-6 pb-10 sm:pt-8 sm:pb-12 max-w-[687px] flex flex-col gap-4">
              <CommentResult
                comments={comments}
                commentsPerPage={commentsPerPage}
                page={page}
                commentsPage={1}
                modalProps={modalProps}
                siteTemplate={siteTemplate}
                language={language}
              />
            </div>
            <h2 class={styling.submitTitle}>
              {titleComment}
            </h2>
            {
              /* <Submit
              hasComments={hasComments}
              titleComment={titleComment}
              modalProps={modalProps}
              itemReviewed={page?.post.slug!}
              maxLines={textboxProps?.maxLines}
              maxLength={textboxProps?.maxLength}
            /> */
            }
          </>
        )
        : (
          <>
            <h2 class={styling.submitTitle}>
              {titleComment}
            </h2>
            {
              /* <Submit
              hasComments={hasComments}
              titleComment={titleComment}
              modalProps={modalProps}
              itemReviewed={page?.post.slug!}
              maxLines={textboxProps?.maxLines}
              maxLength={textboxProps?.maxLength}
            /> */
            }
          </>
        )}
    </Container>
  );
}

/* const Submit = (
  props: SubmitCommentProps & {
    hasComments: boolean;
    hideNotFound: boolean;
    titleComment: string;
    maxLines?: number;
    maxLength?: number;
  },
) => {
  return (
    <div
      class={clx(
        props.hasComments ? "pt-6" : props.hideNotFound ? "" : "pt-6",
        "lg:max-w-3.5xl",
      )}
    >
      <h2 class="font-electrolux-sans font-medium text-2xl text-accent-content">
        {props.titleComment}
      </h2>
      <SubmitComment {...props} />
    </div>
  );
}; */

export function loader(
  {
    commentsPerPage = 5,
    page,
    ...rest
  }: Props,
  _req: Request,
  ctx: AppContext,
) {
  if (!page) {
    return {
      ...rest,
      page,
      commentsPerPage,
      language: ctx.language,
      siteTemplate: ctx.siteTemplate,
    };
  }

  const commentsQty = page.post.review?.length ?? 0;
  const endIndex = Math.min(commentsPerPage, commentsQty);
  const comments = page.post.review?.slice(0, endIndex) ?? [];
  return {
    ...rest,
    commentsPerPage,
    page,
    language: ctx.language,
    siteTemplate: ctx.siteTemplate,
    comments,
  };
}

const ELUX_STYLING = {
  commentTitle: "text-primary font-medium text-xl",
  submitTitle: "font-primary font-medium text-xl pb-6",
};

const FRIGIDAIRE_STYLING = {
  commentTitle: "text-secondary font-medium text-xl",
  submitTitle: "font-secondary font-medium text-xl pb-6",
};
