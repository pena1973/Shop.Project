import "./list.css";
import { Filter } from "../Filter/filter"
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../main";
import { Link } from 'react-router-dom';
import { ProductList } from "../ProductList/productList"
import { Loader } from "../Loader/loader"
import placeholder from "./product-placeholder.png"
import { useEffect } from "react";
import { getProducts } from "../queries";
import { IProduct, IProductList } from "../redux/types";
import { setProducts, showLoadingList } from "../redux/slices"
import axios from 'axios';

export interface listProps {
}

// Перенести в квери
// const getProducts = async (doSuccess: (data: IProduct[]) => void, doError: () => void) => {

//   const config = {
//     method: 'get',
//     url: 'http://localhost:3000/api/products/',
//     headers: {
//       // "Access-Control-Allow-Origin": "*",
//       'Content-Type': 'application/json'
//     },
//   }

//   await axios(config)
//     .then(response => {
//       console.log('Response', response.data)
//       const data: IProduct[] = response.data;
//       doSuccess(data);
//     })
//     .catch(e => {
//       console.log('Error: ', e.message)
//       doError();
//     })
// }

export const List = ({
}: listProps) => {


  const dispatch = useAppDispatch();

  const doSuccess = (data: IProduct[]) => {
    const productsList: IProductList[] = data.map(element => ({
      id: element.id,
      title: element.title,
      price: element.price,
      thumbnail: element.thumbnail,
       comments: element.comments?.length,
      //  comments: 0,
    }
    ))
    dispatch(setProducts(productsList));
    dispatch(showLoadingList(false));
  }
  const doError = () => {
    dispatch(setProducts([]));
    dispatch(showLoadingList(false));
  }

  // Начальное состояние массива продуктов
  useEffect(() => {
    // dispatch(showLoadingList(true));
    getProducts(doSuccess, doError);
  }, []);


  const filter = useSelector((state: RootState) => {
    return state.listSlices.filter;
  })

  const products = useSelector((state: RootState) => {
    return state.listSlices.products;
  })

  const filteredProducts = products.filter((item) => {
    let result =
      ((filter.title.trim() === "") ? true : item.title.includes(filter.title))
      && ((Number(filter.priceFrom) == 0) ? true : (item.price >= filter.priceFrom))
      && ((Number(filter.priceTo) == 0) ? true : (item.price <= filter.priceTo))
    return result
  })


  const loading = useSelector((state: RootState) => {
    return state.listSlices.loading;
  })


  let productsReactNodes = filteredProducts.map(element => (
    <Link
      to={`/products/${element.id}`}
      key={element.id} >
      <ProductList
        key={element.id}
        title={element.title}
        price={element.price}
        comments={element.comments}
        url={!(element.thumbnail) ? placeholder : element.thumbnail.url} />
    </Link>
  ))

  const n = useSelector((state: RootState) => {
    return state.listSlices.products.length;
  })


  return (
    <div>
      <p className="text-body">
        Список товаров ({n})
      </p>
      <Filter />
      <div className="item-list">
        {loading && <Loader />}
        {!loading && productsReactNodes}
      </div>
    </div>
  );
}
