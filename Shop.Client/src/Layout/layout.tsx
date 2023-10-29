import {Header} from '../Header/header';
import {Initial} from '../Initial/initial';
import {List} from '../List/list';
import {ProductItem} from '../ProductItem/productItem';
import "./layout.css";

import { Route, Routes} from "react-router-dom";

export interface LayoutProps {  
}

export const Layout = ({

}: LayoutProps) => {
  return (
  <div className="container">
  <div className="gray-square">
     <Header/>               
     <Routes>        
        <Route path='/' element={<Initial />} />
        <Route path={'/products/:productId'} element={<ProductItem />}/> 
        <Route path={'/products'} element={<List />}/> 
      </Routes>
    </div>
  </div>
    
  );
}
