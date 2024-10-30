import { BreadcrumbList } from "apps/commerce/types.ts";

interface Props {
    /** @description breadCrumb items*/
    breadcrumbList: BreadcrumbList

    /** @description limit of items*/
    maxQuantity?: number

    /** @description color of current item of breadcrumb */
    selectedColor: string
}

export default function BreadCrumb({ breadcrumbList, maxQuantity, selectedColor }: Props) {

    console.log("test1 ", breadcrumbList)
    console.log("test2", maxQuantity, selectedColor

    )
    const { itemListElement } = breadcrumbList;

    return (
        <nav aria-label="Breadcrumb">
            <ul className="flex h-9 items-center gap-4 text-xs text-[#848585] font-light">
                <li>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.33333 8H2L8 2L14 8H12.6667" stroke="#EE405A" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M3.33337 8V12.6667C3.33337 13.0203 3.47385 13.3594 3.7239 13.6095C3.97395 13.8595 4.31309 14 4.66671 14H11.3334C11.687 14 12.0261 13.8595 12.2762 13.6095C12.5262 13.3594 12.6667 13.0203 12.6667 12.6667V8" stroke="#EE405A" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6 14V10C6 9.6464 6.14048 9.30726 6.39052 9.05721C6.64057 8.80716 6.97971 8.66669 7.33333 8.66669H8.66667C9.02029 8.66669 9.35943 8.80716 9.60948 9.05721C9.85952 9.30726 10 9.6464 10 10V14" stroke="#EE405A" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </li>
                {itemListElement.map((item, index) => (
                    <li key={index} className="breadcrumb-item">
                        <a href={item.url}>{item.item}</a>
                        {index < itemListElement.length - 1 && (
                            <li>
                                <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1.5L5 5.5L1 9.5" stroke="#ADADAD" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </li>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );

}