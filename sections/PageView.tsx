import { Head } from "$fresh/runtime.ts";
import { useScript } from "@deco/deco/hooks";

interface Props {
  contentGroupValue: string;
  considerSubpages: boolean;
}

type DataLayerPushData = {
  [key: string]: string;
};

export function loader(
  props: Props,
  req: Request,
) {
  return { ...props, url: req.url };
}

function script(
  contentGroupValue: string,
  url: string,
  considerSubpages: boolean,
) {
  const pageUrl = new URL(url ?? "");
  const subpages = considerSubpages ? pageUrl.pathname.split("/") : undefined;

  const pushToDataLayer = () => {
    const data = subpages?.reduce<DataLayerPushData>((acc, _, index) => {
      const groupKey = index === 0
        ? "content_group"
        : `content_group${index + 1}`;
      const pathSegments = subpages.slice(0, index + 1).join("_");
      acc[groupKey] = `${contentGroupValue}_${pathSegments}`;
      return acc;
    }, { event: "page_view_custom" }) ??
      { event: "page_view_custom", "content_group": contentGroupValue };

    // @ts-ignore globalThis is defined
    globalThis.dataLayer = globalThis.dataLayer || [];
    // @ts-ignore dataLayer is defined
    globalThis.dataLayer.push(data);
  };

  if (document.readyState === "complete") {
    pushToDataLayer();
  } else {
    globalThis.addEventListener("load", pushToDataLayer);
  }
}

export default function PageView(
  { contentGroupValue, url, considerSubpages }: ReturnType<typeof loader>,
) {
  return (
    <Head>
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(
            script,
            contentGroupValue,
            url,
            considerSubpages,
          ),
        }}
      />
    </Head>
  );
}
