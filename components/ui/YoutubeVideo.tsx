import { clx } from "../../utils/clx.ts";

interface YoutubeVideoProps {
  url: string;
  class?: string;
}

export default function YoutubeVideo(
  { url, class: _class }: YoutubeVideoProps,
) {
  const embedUrl = url.replace("watch?v=", "embed/");

  return (
    <iframe
      src={embedUrl}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      class={clx("w-full h-full max-w-full max-h-full z-20", _class)}
    />
  );
}
