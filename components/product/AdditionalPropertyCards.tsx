import Image from "apps/website/components/Image.tsx";
import { PropertyValue } from "apps/commerce/types.ts";

interface Props {
  PropertyCards: PropertyValue[] | undefined;
}

export default function AdditionalPropertyCards({ PropertyCards }: Props) {
  console.log("cards ", PropertyCards);
  if (!PropertyCards) return <></>;

  console.log("OI");
  return (
    <div className="w-full max-w-[65rem] mx-auto hidden  lg:grid lg:grid-cols-[520px_520px] my-6">
      {PropertyCards.map((card) => (
        <div
          key={card["@id"]}
          className="w-full max-w-[520px] lg:max-h-[231px] overflow-hidden flex flex-col lg:flex-row-reverse lg:border-t border-[#EBEBEB]"
        >
          {card.image?.[0]?.url && (
            <div className="w-full lg:max-w-[240px] h-[240px] flex justify-center overflow-hidden">
              <Image
                alt={card.name}
                src={card.image[0].url}
                width={375}
                height={300}
                className="object-contain w-full"
              />
            </div>
          )}
          <div className="flex flex-col flex-1 gap-2 text-[#323333] text-sm pt-6">
            <span>{card.name}</span>
            <article
              className="font-light"
              dangerouslySetInnerHTML={{ __html: card.value! }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
