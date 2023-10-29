import { IProduct, ISimilar, IComment } from "./redux/types";
import axios from 'axios';

// полные данные продукта
export const getProduct = async (
  id: string,
  doSuccessProduct: (data: IProduct) => void,
  doErrorProduct: () => void) => {

  const config = {
    method: 'get',
    url: `http://localhost:3000/api/products/${id}`,
    headers: { 'Content-Type': 'application/json' },
  }

  await axios(config)
    .then(response => {
      console.log('Response', response.data)
      const data: IProduct = response.data;
      doSuccessProduct(data);
    })
    .catch(e => {
      console.log('Error: ', e.message)
      doErrorProduct();
    })
}
// return  {
//   id: "34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06",
//   title: "Galaxy A52",
//   description: "333A mid-range smartphone with a large battery and display",
//   price: 17999.25,

//   thumbnail: {
//       id: "2010c194-e446-11ed-b5ea-0242ac120002",
//       productId: "34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06",
//       main: true,
//       url: "https://via.placeholder.com/150/9c184f",
//     },
//   comments: [{
//       id: "6dfb448b-df24-4b05-8965-676e433b9a41",
//       name: "nata",
//       email: "liseo@gardner.biz",
//       body: "laudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo necessitatibus dolor quam autem quasi reiciendis et nam sapiente accusantium",
//       productId: "34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06"}],

//   images: [{
//       id: "2010c194-e446-11ed-b5ea-0242ac120002",
//       productId: "34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06",
//       main: true,
//       url: "https://via.placeholder.com/150/9c184f",
//     }]
//   }   

// url: 'http://localhost:3000/api/products/similars/:id'
export const getSimilars = async (
  id: string,
  doSuccessSimilars: (data: ISimilar[]) => void,
  doErrorSimilars: () => void) => {

  const config = {
    method: 'get',
    url: `http://localhost:3000/api/products/similars/${id}`,
    headers: { 'Content-Type': 'application/json' },
  }
  await axios(config)
    .then(response => {
      console.log('Response', response.data)
      const data: ISimilar[] = response.data;
      doSuccessSimilars(data);
    })
    .catch(e => {
      console.log('Error: ', e.message)
      doErrorSimilars();
    })

  // similars:
  // return [{id: "34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06",title: "Galaxy A52", price: 17999.25,}]
}

export const setNewComment = async (
  productId: string,
  name: string,
  email: string,
  body: string,
  doSuccessNewComment: (data: string) => void,
  doErrorNewComment: () => void
) => {

  const config = {
    method: 'post',
    url: `http://localhost:3000/api/comments`,
    // headers: {
    //   'Content-Type': 'application/json',
    //   'Access-Control-Allow-Origin': '*'
    // },
    data: {      
      name: name,
      email: email,
      body: body,
      productId: productId
    }
  }

  

  await axios(config)
    .then(response => {
      // console.log('Response', response.data)
      const data: string = response.data;
      doSuccessNewComment(data);
    })
    .catch(e => {
      console.log('Error: ', e.message)
      doErrorNewComment();
    })

  // console.log(productId, name, email, body)
  // Возврат КоментИД
  // return "1";
}

// Заполнение списка товаров из АПИ
// http://localhost:3000/api/products/
export const getProducts = async (doSuccess: (data: IProduct[]) => void, doError: () => void) => {

  const config = {
    method: 'get',
    url: 'http://localhost:3000/api/products',
    headers: {
      // "Access-Control-Allow-Origin": "*",
      'Content-Type': 'application/json'
    },
  }

  await axios(config)
    .then(response => {
      console.log('Response', response.data)
      const data: IProduct[] = response.data;
      doSuccess(data);
    })
    .catch(e => {
      console.log('Error: ', e.message)
      doError();
    })
}
