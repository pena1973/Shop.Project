export const QUERY = 'QUERY';
export const SET_VARIANT = 'SET_VARIANT';
export const SET_TRANSFERS = 'SET_TRANSFERS';
export const SET_COMPANIES = 'SET_COMPANIES';

     
//   состояние квери редюсора
export type ProductState = {
    loading: boolean,    
    // product: IProduct,   
    comments: IComment[] 
    similars?: ISimilar []
  }

//   состояние сорт редюсора
  export type ListState = {
    loading: boolean,
    filter:{ title: string, priceFrom: number, priceTo: number},
    products:IProductList[];
  }
   
// продукт
export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail?: IProductImage;
  comments: IComment[];
  images: IProductImage[];
}
// продукт  в листе
export interface IProductList {
  id: string;
  title: string;  
  price: number;
  thumbnail?: IProductImage;
  comments: number;  
}
// продукт  в листе
export interface ISimilar{
  id: string;
  title: string;  
  price: number;    
}
export interface IProductImage {
  id: string;
  productId: string;
  main: boolean;
  url: string;
}

export interface IComment {
  id: string;
  name: string;
  email: string;
  body: string;
  productId: string;
}
