import { ProductDetailsPage } from "apps/commerce/types.ts";
import BreadCrumb from "../../../components/product/BreadCrumb.tsx";
import ProductMainBanner from "../../../components/product/ProductMainBanner.tsx";

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

export default function ProductPage({ page, breadCrumb }: ProductPageProps) {

    if (!page) return <></>
    const { product } = page
    const { image } = product

   console.log("image :", image)


    return (
        <div className="mt-20 flex flex-col container bg-slate-200">
            Product page
            <BreadCrumb
                breadcrumbList={page.breadcrumbList}
                maxQuantity={breadCrumb.maxQuantity}
                selectedColor={breadCrumb.selectedColor}
            />
            {/* <ProductMainBanner
                image={ } /> */}
        </div>
    );

}