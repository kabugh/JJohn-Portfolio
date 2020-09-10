export default interface ProductModel {
    title: string;
    image: string;
    catalogId: number;
    description?: string;
    details?: {
        material: string;
        artType: string;
        technique: string;
        width: string;
        height: string;
        releaseYear: string | number;
    },
    credits: {
        author: string;
        dealer: string;
    }
    featuredOn?: string[]
}