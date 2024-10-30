import { ImageWidget } from "apps/admin/widgets.ts";

interface Props {
    image: {
        /** @description Image for big screens */
        src: ImageWidget;
    };
}

export default function ProductInfoBanners({ image }: Props) {

    // const test = [
    //     { firstText: "oi", secondText: "oi2" },
    //     { firstText: "olá", secondText: "tudo bem?" },
    //     { firstText: "hello", secondText: "world" },
    //     { firstText: "bonjour", secondText: "monde" },
    //     { firstText: "hola", secondText: "mundo" },
    //     { firstText: "hallo", secondText: "welt" },
    // ];

    return (
        <div className="w-full max-w-[80rem] lg:mx-auto ">
            {/* {test.map((item, index) => (
                <div
                    key={index}
                    className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                        } items-center bg-gray-200 p-4 rounded-lg`}
                >
                    <p className="text-lg text-blue-500 flex-1 bg-slate-800">{item.firstText}</p>
                    <p className="text-lg text-red-500 ml-4 flex-1 bg-slate-500">{item.secondText}</p>
                </div>
            ))} */}
            <div class="flex flex-col lg:flex-row">
                <img src={image.src} alt={"teste"} />
                <div class="w-full flex items-center bg-red-400 min-h-56 max-h-[516px]">
                    <div className="w-full max-w-[400px] h-full flex flex-col mx-auto text-left justify-center gap-4 p-3">
                        <span className="text-xl">Lorem ipsum dolor</span>
                        <p className="text-base font-light">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel ultricies leo. Nam vel urna at mi ullamcorper sagittis. Aliquam erat volutpat.
                        </p>
                    </div>
                </div>
            </div>
            <div class="flex flex-col lg:flex-row-reverse">
                <img src={image.src} alt={"teste"} />
                <div class="w-full flex items-center bg-red-400 min-h-56 max-h-[516px]">
                    <div className="w-full max-w-[400px] h-full flex flex-col mx-auto text-left justify-center gap-4 p-3">
                        <span className="text-xl">Lorem ipsum dolor</span>
                        <p className="text-base font-light">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel ultricies leo. Nam vel urna at mi ullamcorper sagittis. Aliquam erat volutpat.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}