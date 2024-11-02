import Image from "apps/website/components/Image.tsx";
import { PropertyValue } from "apps/commerce/types.ts";
import { useDevice } from "@deco/deco/hooks";
import Slider from "../ui/Slider.tsx";

interface Props {
  PropertyCards: PropertyValue[] | undefined;
}

export default function AdditionalPropertyCards({ PropertyCards }: Props) {

  if (!PropertyCards) return <></>;

  const sortedPropertyCardsMobile = PropertyCards.sort((a, b) => {
    // Checa se a URL da imagem está definida para os primeiros itens
    const hasUrlA = a.image?.[0]?.url !== undefined;
    const hasUrlB = b.image?.[0]?.url !== undefined;

    // Ordena de modo que os itens com `url` definido venham primeiro
    if (hasUrlA && !hasUrlB) return -1; // `a` vem antes de `b`
    if (!hasUrlA && hasUrlB) return 1;  // `b` vem antes de `a`
    return 0; // Manter a ordem relativa para itens com ambas URLs definidas ou indefinidas
  });

  const alreadyRenderedIndices = new Set();

  const device = useDevice()
  console.log("device ", device)

  const slideCount = sortedPropertyCardsMobile.reduce((count, card, index) => {
    if (!card.image?.[0]?.url) {
      index += 2;
    }
    return count + 1;
  }, 0);
  return (
    <>
      <div className="w-full max-w-[65rem] mx-auto flex flex-col lg:hidden my-6">
        <Slider class="carousel carousel-center sm:carousel-end gap-5 sm:gap-10 w-full">
          {sortedPropertyCardsMobile.map((card, index) => {
            if (alreadyRenderedIndices.has(index)) return null;

            const noImage = !card.image?.[0]?.url;
            const itemsToRender = noImage
              ? [card, sortedPropertyCardsMobile[index + 1], sortedPropertyCardsMobile[index + 2]]
                .filter((item, idx) => item && !alreadyRenderedIndices.has(index + idx))
              : [card];

            if (noImage) {
              itemsToRender.forEach((_, idx) => alreadyRenderedIndices.add(index + idx));
            }

            return (
              <Slider.Item
                key={index}
                index={index}
                className="carousel-item"
              >
                <div
                  className={`w-[90vw] overflow-hidden flex ${noImage ? 'flex-col gap-4' : 'flex-col lg:flex-row-reverse'
                    } lg:border-t border-[#EBEBEB]`}
                >
                  {itemsToRender.map((item, idx) => (
                    <div key={item["@id"] || idx} className="w-full max-w-[520px] pt-4">
                      {item.image?.[0]?.url && (
                        <div className="w-full  flex justify-center overflow-hidden">
                          <Image
                            alt={item.name || "Imagem do card"}
                            src={item.image[0].url}
                            width={375}
                            height={300}
                            className="object-contain w-full"
                          />
                        </div>
                      )}
                      <div className="flex flex-col flex-1 gap-2 text-[#323333] text-sm pt-6 px-1">
                        {item.name && <span>{item.name}</span>}
                        {item.value && (
                          <article
                            className="font-light max-w-[500px]"
                            dangerouslySetInnerHTML={{ __html: item.value }}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Slider.Item>
            );
          })}
        </Slider>
        {/* dots */}
        <div className="flex justify-center gap-2 mt-4 bg-slate-200">
          {[...Array(slideCount)].map((_, dotIndex) => (
            <button
              key={dotIndex}
              className="bg-red-200"
            />
          ))}
        </div>
      </div>


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
                className="font-light max-w-[500px]"
                dangerouslySetInnerHTML={{ __html: card.value! }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
