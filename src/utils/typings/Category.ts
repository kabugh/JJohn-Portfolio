import ProductModel from "./ProductModel";

export default interface Category {
  title: string;
  description: string;
  frontImage: { fields: { file: { url: string } } };
  works: ProductModel[] | undefined;
  slug: string;
}
