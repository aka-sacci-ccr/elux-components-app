import Image from "apps/website/components/Image.tsx";
import { PropertyValue } from "apps/commerce/types.ts";
import Slider from "../ui/Slider.tsx";
import { clx } from "../../utils/clx.ts";
import { useDevice } from "@deco/deco/hooks";
import { useId } from "../../sdk/useId.ts";

interface Props {
  PropertyCards: PropertyValue[] | undefined;
}

export default function AdditionalPropertyCards({ PropertyCards }: Props) {
  if (!PropertyCards) return <></>;

  const id = useId();

  const sortedPropertyCardsMobile = PropertyCards.sort((a, b) => {
    const hasUrlA = a.image?.[0]?.url !== undefined;
    const hasUrlB = b.image?.[0]?.url !== undefined;

    if (hasUrlA && !hasUrlB) return -1;
    if (!hasUrlA && hasUrlB) return 1;
    return 0;
  });

  // Função que calcula a estrutura de itens para renderizar com base no array completo
  const getItemsToRender = (cards: PropertyValue[]) => {
    const alreadyRenderedIndices = new Set();
    const itemsToRender = cards.map((card, index) => {
      if (alreadyRenderedIndices.has(index)) return null;

      const noImage = !card.image?.[0]?.url;
      const itemsGroup = noImage
        ? [card, cards[index + 1], cards[index + 2]]
          .filter((item, idx) =>
            item && !alreadyRenderedIndices.has(index + idx)
          )
        : [card];

      // Marcar os índices já processados
      if (noImage) {
        itemsGroup.forEach((_, idx) => alreadyRenderedIndices.add(index + idx));
      }
      return itemsGroup;
    });

    return itemsToRender.filter((group) => group !== null) as PropertyValue[][];
  };

  const itemsGroups = getItemsToRender(sortedPropertyCardsMobile);
  const device = useDevice();

  return (
    <>
      {device === "mobile"
        ? (
          <div
            className="w-full max-w-[65rem] mx-auto flex flex-col lg:hidden my-6 gap-6"
            id={id}
          >
            <Slider class="carousel carousel-center sm:carousel-end gap-5 sm:gap-10 w-full">
              {itemsGroups.map((itemsGroup, index) => (
                <Slider.Item
                  key={index}
                  index={index}
                  className="carousel-item"
                >
                  <div
                    className={`w-[90vw] overflow-hidden flex ${
                      itemsGroup.length > 1
                        ? "flex-col gap-4"
                        : "flex-col lg:flex-row-reverse"
                    } lg:border-t border-base-200`}
                  >
                    {itemsGroup.map((item, idx) => (
                      <div
                        key={item["@id"] || idx}
                        className="w-full flex flex-col gap-6"
                      >
                        {item.image?.[0]?.url && (
                          <div className="w-full flex justify-center overflow-hidden">
                            <Image
                              alt={item.name || "Imagem do card"}
                              src={item.image[0].url}
                              width={375}
                              height={300}
                              className="object-contain w-full"
                            />
                          </div>
                        )}
                        <div className="flex flex-col flex-1 gap-2 text-secondary text-sm px-1">
                          {item.name && <span>{item.name}</span>}
                          {item.value && (
                            <article
                              className="font-light"
                              dangerouslySetInnerHTML={{ __html: item.value }}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Slider.Item>
              ))}
            </Slider>

            {/* Dots */}
            <ul
              className={clx(
                "carousel carousel-center justify-center gap-3 px-5",
                "rounded-full",
                "border-[1px] border-slate-200",
                "flex lg:hidden",
                "max-w-40 h-6 mx-auto",
                "overflow-x-auto",
                "sm:overflow-y-auto",
              )}
              style={{ maxHeight: "600px" }}
            >
              {itemsGroups.map((_, index) => (
                <li
                  key={index}
                  className="carousel-item w-3 h-full flex justify-center items-center"
                >
                  <Slider.Dot
                    index={index}
                    className="disabled:bg-primary flex w-2.5 h-2.5 rounded-full bg-base-200"
                  >
                  </Slider.Dot>
                </li>
              ))}
            </ul>
            <Slider.JS rootId={id} />
          </div>
        )
        : (
          <div className="w-full max-w-[65rem] mx-auto hidden lg:grid">
            {PropertyCards.map((card, index) => {
              const isLastAndOdd = index === PropertyCards.length - 1 &&
                (index + 1) % 2 !== 0;

              return (
                <>
                  <div
                    key={card["@id"]}
                    className={`w-full max-w-[520px] lg:max-h-[231px] overflow-hidden flex flex-col lg:flex-row-reverse ${
                      !isLastAndOdd && "lg:border-b"
                    } border-base-200`}
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
                    <div className="flex flex-col flex-1 gap-2 text-secondary text-sm self-center py-4">
                      <span>{card.name}</span>
                      <article
                        className="font-light max-w-[500px]"
                        dangerouslySetInnerHTML={{ __html: card.value! }}
                      />
                    </div>
                  </div>
                  {isLastAndOdd && (
                    <div class="h-[1px] bg-base-200 hidden lg:grid col-span-2">
                    </div>
                  )}
                </>
              );
            })}
          </div>
        )}
    </>
  );
}
