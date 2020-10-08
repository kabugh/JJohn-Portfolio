export default interface ProductModel {
  title: string;
  image: { fields: { file: { url: string } } } | string;
  category: string;
  catalogId: number;
  description?: string;
  details?: {
    material: string;
    artType?: string;
    technique?: string;
    width?: string;
    height?: string;
    releaseYear?: string | number;
  };
  author: string;
  reproductionAvailable: boolean;
  dealer?: string;
  featuredOn?: string[]
}