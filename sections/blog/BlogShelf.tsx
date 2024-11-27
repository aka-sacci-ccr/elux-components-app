import type { BlogPost } from "apps/blog/types.ts";
import { AppContext } from "../../mod.ts";
import PostCard from "../../components/blog/PostCard.tsx";
import { clx } from "../../utils/clx.ts";

export interface Props {
    /**
     * @description Title of the section
     */
    title: string;
    /**
     * @description Description of the section
     * @format rich-text
     */
    description?: string;
    /**
     * @description Blog posts to be displayed
     */
    blogposts: BlogPost[] | null;
}

export const loader = (props: Props, req: Request, ctx: AppContext) => {
    return {
        ...props,
        siteTemplate: ctx.siteTemplate,
        url: req.url,
    };
};

export default function BlogShelf(
    { siteTemplate, title, description, blogposts, url }: ReturnType<
        typeof loader
    >,
) {
    const styling = siteTemplate === "elux" ? ELUX_STYLING : FRIGIDAIRE_STYLING;
    return (
        <div class={clx("w-full h-full", styling.bgColor)}>
            <div class="container !max-w-[863px] flex flex-col gap-8 max-lg:px-6 pt-16 pb-20 max-lg:pt-9 max-lg:pb-11.5">
                <div class="flex flex-col gap-2">
                    <h2 class={styling.title}>{title}</h2>
                    {description && (
                        <div
                            class={styling.description}
                            dangerouslySetInnerHTML={{
                                __html: description,
                            }}
                        />
                    )}
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-5">
                    {blogposts?.map((post) => (
                        <PostCard
                            template={siteTemplate}
                            post={post}
                            url={url}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

const ELUX_STYLING = {
    bgColor: "bg-base-content",
    title: "text-2.5xl max-lg:text-2xl font-medium text-primary",
    description:
        "font-light text-secondary [&_strong]:font-bold [&_a]:underline [&_a]:underline-offset-4",
};

const FRIGIDAIRE_STYLING = {
    bgColor: "bg-base-300",
    title: "text-3xl max-lg:text-xl font-medium text-secondary",
    description:
        "text-sm font-light text-secondary [&_a]:underline [&_a]:underline-offset-1",
};
