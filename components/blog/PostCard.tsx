import { BlogPost } from "apps/blog/types.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { clx } from "../../utils/clx.ts";

export interface Props {
  template: "elux" | "frigidaire";
  post: BlogPost;
  url: string;
}

const buildPostUrl = (url: string, postSlug: string, categorySlug: string) => {
  const newUrl = new URL(url);
  const pathname = `blog/${categorySlug}/${postSlug}`;
  return new URL(pathname, newUrl.origin).href;
};

export default function PostCard({ template, post, url }: Props) {
  const { category, title, borders } = template === "elux"
    ? ELUX_STYLING
    : FRIGIDAIRE_STYLING;
  return (
    <a
      class="flex flex-col w-full h-full"
      href={buildPostUrl(url, post.slug, post.categories[0].slug)}
    >
      <Picture class="object-contain">
        <Source
          media="(max-width: 640px)"
          alt={post.alt ?? ""}
          src={post.image!}
          width={327}
          height={160}
          class="object-contain w-full"
        />
        <Source
          media="(min-width: 640px)"
          alt={post.alt ?? ""}
          src={post.image!}
          width={274}
          height={160}
          class="object-contain w-full"
        />
        <img
          alt={post.alt ?? ""}
          src={post.image!}
          class="w-full"
        />
      </Picture>
      <div class={clx("flex flex-col py-3 px-4 bg-white h-full", borders)}>
        <p class={clx(category)}>
          {post.categories[0].name}
        </p>
        <p class={clx(title, "pt-2")}>{post.title}</p>
        <div class="flex-grow" />
      </div>
    </a>
  );
}

const ELUX_STYLING = {
  category: "font-light text-sm text-neutral",
  title: "text-secondary font-medium",
  borders: "border-[#DEE7EA] border-b border-x",
};

const FRIGIDAIRE_STYLING = {
  category: "font-light text-sm text-info",
  title: "text-secondary font-medium",
  borders: "border-neutral border-b border-x",
};
