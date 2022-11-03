import { SafeResourceUrl } from "@angular/platform-browser";

export interface Product {
    id?: number,
    name?: string,
    price?: number,
    details?: string,
    image?: string,
    isHighlightMenu?: boolean,
    subCategoryId?: number,
    decodeImage?: SafeResourceUrl
}

export interface Category extends CategoryDTO {
    subCategories: SubCategory[],
}

export interface CategoryDTO {
    id?: number,
    name?: string,
}


export interface SubCategory extends SubCategoryDTO {
    products: Product[]
}

export interface SubCategoryDTO {
    id?: number,
    name?: string,
}