import { ProductDetailsPage } from "apps/commerce/types.ts";
import BreadCrumb from "../../../components/product/BreadCrumb.tsx";
import ProductMainBanner from "../../../components/product/ProductMainBanner.tsx";
import ProductInfoBanners from "../../../components/product/ProductInfoBanners.tsx";
import ProductMain from "../../../components/product/ProductMain.tsx";
import ProductDetails from "../../../components/product/ProductDetails.tsx";

interface ProductPageProps {
    /** @description product loader of the page */
    page: ProductDetailsPage | null

    breadCrumb: {
        /** @description limit quantity of breadcrumb */
        maxQuantity?: number
        /** @description color of current item of breadcrumb */
        selectedColor: string
    }
    infoBanners: {
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
    }
    productMain: {
        buyButton: {
            /** @description Button background color */
            background: string;
            /** @description Button text color */
            textColor: string;
        }
    }
}

export default function ProductPage({ page, breadCrumb, infoBanners }: ProductPageProps) {

    if (!page) return <></>
    const { product } = page
    const { image, additionalProperty, description } = product

    const mainBannerImages = image?.filter(image =>
        image.additionalType === "MAIN_BANNER" || image.additionalType === "MAIN_BANNER_MOBILE"
    );
    const infoBannerImages = image?.filter(image =>
        image.additionalType === "INFO_BANNER"
    );


    console.log("------ main banner -----------")
    console.log(mainBannerImages)
    console.log("------ info banners -----------")
    console.log(infoBannerImages)

    return (
        <div className="mt-20 flex flex-col container bg-slate-200">
            <BreadCrumb
                breadcrumbList={page.breadcrumbList}
                maxQuantity={breadCrumb.maxQuantity}
                selectedColor={breadCrumb.selectedColor}
            />
            <ProductMainBanner images={mainBannerImages} />
            <ProductInfoBanners
                images={infoBannerImages}
                titleColor={infoBanners.titleColor}
                contentColor={infoBanners.contentColor}
                backgroundColor={infoBanners.backgroundColor}
            />
            <ProductMain />
            <ProductDetails additionalProperty={additionalProperty} description={description}/>
        </div>
    );

}