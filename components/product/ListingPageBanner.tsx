import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface Props {
  image: string;
  description?: string;
}

export default function ListingPageBanner({ image, description }: Props) {
  return (
    <div className="w-full relative overflow-hidden mx-auto">
      <div className="flex">
        <Picture class="object-contain">
          <Source
            media="(max-width: 640px)"
            alt={description ?? ""}
            src={image}
            width={375}
            height={240}
            class="object-contain w-full"
          />
          <Source
            media="(min-width: 640px)"
            alt={description ?? ""}
            src={image}
            width={1280}
            height={300}
            class="object-contain w-full"
          />
          <img
            alt={description ?? ""}
            src={image}
            class="w-full"
          />
        </Picture>
      </div>
      <div class="absolute z-10 w-full h-full top-0 bg-black opacity-40">
      </div>
      <div class="absolute z-20 flex flex-col bottom-5 lg:bottom-12 lg:left-32 text-white px-5 lg:p-0 gap-2">
        <h1 className="text-2.5xl lg:text-4xl font-semibold">
          {description}
        </h1>
      </div>
    </div>
  );
}
