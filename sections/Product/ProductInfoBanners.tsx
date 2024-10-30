import { ImageWidget } from "apps/admin/widgets.ts";

interface Props {
    backgroundColor: {
        /** @description Primary background component */
        primary: string;
        /** @description Secondary background component */
        secondary: string;
    }
    titleColor: {
        /** @description Primary title color */
        primary: string;
        /** @description Secondary title color */
        secondary: string;
    }
    contentColor: {
        /** @description Primary text color */
        primary: string;
        /** @description Secondary text color */
        secondary: string;
    }
    image: {
        /** @description Image for big screens */
        src: ImageWidget;
    };
}

export default function ProductInfoBanners({ image, backgroundColor, titleColor, contentColor }: Props) {

    const test = [
        { firstText: "Lorem ipsum dolor", secondText: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel ultricies leo. Nam vel urna at mi ullamcorper sagittis. Aliquam erat volutpat." },
        { firstText: "Lorem ipsum dolor", secondText: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel ultricies leo. Nam vel urna at mi ullamcorper sagittis. Aliquam erat volutpat." },
        { firstText: "Lorem ipsum dolor", secondText: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel ultricies leo. Nam vel urna at mi ullamcorper sagittis. Aliquam erat volutpat." },
        { firstText: "Lorem ipsum dolor", secondText: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel ultricies leo. Nam vel urna at mi ullamcorper sagittis. Aliquam erat volutpat." },
    ];
    // <div
    //     key={index}
    //     className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
    //         } items-center bg-gray-200 p-4 rounded-lg`}
    // >

    return (
        <div className="w-full max-w-7xl lg:mx-auto">
            {test.map((item, index) => (
                <div className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                    <img src={image.src} alt={"teste"} />
                    <div class="w-full flex items-center bg-red-400 min-h-56 max-h-[516px]">
                        <div className="w-full max-w-[400px] h-full flex flex-col mx-auto text-left justify-center gap-4 p-3">
                            <span className="text-xl">{item.firstText}</span>
                            <p className="text-base font-light">
                            {item.secondText}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}