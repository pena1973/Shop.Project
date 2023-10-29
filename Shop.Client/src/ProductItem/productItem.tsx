import "./productItem.css";
import { useSelector } from "react-redux";
import { RootState,useAppDispatch } from "../main";
import { ProductImage } from "../ProductImage/productImage"
import { ProductComment } from "../ProductComment/productComment"
import { NewCommentForm } from "../NewCommentForm/newCommentForm"
import { ProductSimilar } from "../ProductSimilar/productSimilar"
import { useParams } from "react-router-dom";
import { Loader } from "../Loader/loader"
import { IProduct, ISimilar} from "../redux/types";
import { getProduct, getSimilars } from "../queries";
import {setComents, showLoadingProduct,emptyProduct,emptySimilar} from "../redux/slices"
import { useState, useEffect } from "react";

export interface productItemProps { 
}

export const ProductItem = ({

}: productItemProps) => {
  
  const params = useParams();
  const dispatch = useAppDispatch();
  const productId = params.productId;
  const [product, setProduct] = useState(emptyProduct);
  const [similars, setSimilars] = useState([emptySimilar]); 
 
  
// Обработка запросов к апи  
const doSuccessProduct = (data: IProduct) => {
  setProduct(data);
   dispatch(setComents(data.comments));
   dispatch(showLoadingProduct(false));

}
const doErrorProduct = () => {
  dispatch(setComents([]));  
  dispatch(showLoadingProduct(false));
}  
const doSuccessSimilars = (data: ISimilar[]) => {
   setSimilars(data);   
}
const doErrorSimilars = () => {
  setSimilars([]);     
}

// Запрос к Апи при прорисовке  -  получим продукт и похожие
// а здесь запросим все данные по продукту для стартовой загрузки, ничего кроме коментов не меняется
if (!productId)  return
// Если пустой  - то получаем
if (!product.id) {
getProduct(productId,doSuccessProduct,doErrorProduct); 
getSimilars(productId,doSuccessSimilars,doErrorSimilars); }
// Начальное состояние коментов из базы
useEffect(() => {
// а коменты в диспач потому что меняю состояние в другом компоненте
// и чтоб все не перерисовывать при обновлении через запрос
dispatch(setComents(product.comments));  
}, []);

// загрузчик состояние
const loading = useSelector((state: RootState) => {
    return state.productSlices.loading;
})

//  прорисовка измененных 
const comments = useSelector((state: RootState) => {
  return state.productSlices.comments;
})

// прорисовываю фото кроме главного
  let productImagesReactNodes;
  if (!(!product.images))
    productImagesReactNodes = product.images.map(element => (
      (element.id !== product.thumbnail?.id) && <ProductImage key={element.id} src={element.url} />
    ))
// коменты
  let productCommentsReactNodes;
  if (!(!comments))
    productCommentsReactNodes = comments.map(element => (
      <ProductComment key={element.id} name={element.name} body={element.body} />
    ))
// похожие
  let productSimilarReactNodes;
  if (!(!similars))
    productSimilarReactNodes = similars.map(element => (
      <ProductSimilar key={element.id} title={element.title} price={element.price} />
    ))
    
  return (
    <div className="item">
      {loading && <Loader />}
      {/* <!-- представление --> */}
      {(!loading) && <div className="item-presentation">
        <div className="item-imgage-thumbnail">
          <img src={product.thumbnail?.url} alt={product.thumbnail?.url}></img>
        </div>
        <div className="item-info">
          <div className="item-title"> {product.title} </div>
          <div className="item-description">{product.description} </div>
          <div className="item-price">Price: &nbsp;{product.price} </div>
        </div>
      </div>}

      <div className="line" ></div>
      {/* <!-- фото товара --> */}

      {(!loading) && <div className="item-title-header"> Other photo </div>}
      {!loading && <div className="item-images">
        {productImagesReactNodes}
      </div>}

      <div className="line" ></div>

      {/* <!-- коментарии --> */}
      {!loading && <div className="item-title-header"> Comments </div>}
      {!loading && <div className="item-comments">
        {productCommentsReactNodes}
      </div>}

      <div className="line" ></div>

      {/* <!--ввод нового  коментария --> */}
      {!loading && <NewCommentForm product={product} productComments = {comments} />}

      <div className="line" ></div>

      {/* <!--Похожие --> */}
      {!loading && <div className="item-title-header"> Similars </div>}
      {!loading && <div className="similars">
        {productSimilarReactNodes}
      </div>
      }
    </div>
  );
}

