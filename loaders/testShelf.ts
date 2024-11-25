import { Product } from "apps/commerce/types.ts";
import { productsMock } from "../utils/mocks/product.ts";

export default function loader(): Product[] | null {
  return [...productsMock, ...productsMock, ...productsMock];
}
