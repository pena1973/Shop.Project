import { Router, Request, Response } from "express";
import { getProducts,searchProducts,getProduct,removeProduct,updateProduct, getOthers,getSimilars,addProduct} from "../models/products.model";
import {IProductFilterPayload} from '@Shared/types'
export const productsRouter = Router();
import {IProductEditData,IProductCreateData} from "../types";

import {throwServerError} from './helper'

function clickHandler(){
    
    // console.log(1);
}

productsRouter.get('/', async (req: Request, res: Response) => {
    try {
        // console.log(req.session.username);  
        const products = await getProducts();
        res.render("products", { 
            items: products, 
            queryParams: {} 
        });
    } catch (e) {
        throwServerError(res, e);
    }
});

productsRouter.get('/search', async (
    req: Request<{}, {}, {}, IProductFilterPayload>,
    res: Response
) => {
    try {
        const products = await searchProducts(req.query);
        res.render("products", {
            items: products,
            queryParams: req.query
        });
    } catch (e) {
        throwServerError(res, e);
    }
});

productsRouter.get('/:id', async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const product = await getProduct(req.params.id);
        //  console.log("product");
        const others  = await getOthers(req.params.id);
        // console.log("others",others);
        const similars  = await getSimilars(req.params.id);
        // console.log(similars);
        if (product) {
            res.render("product/product", {
                item: {
                product:product,
                others: others,
                similars: similars,
            }
            });
        } else {
            res.render("product/empty-product", {
                id: req.params.id
            });
        }
    } catch (e) {
        throwServerError(res, e);
    }
});

productsRouter.get('/remove-product/:id', async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {      
        if (req.session.username !== "admin") {
            res.status(403);
            res.send("Forbidden");
            return;
        }

        await removeProduct(req.params.id);
        res.redirect(`/${process.env.ADMIN_PATH}`);
    } catch (e) {
        throwServerError(res, e);
    }
});

productsRouter.post('/save/:id', async (
    req: Request<{ id: string }, {}, IProductEditData>,
    res: Response
) => {
     
    try {
        await updateProduct(req.params.id, req.body);
        res.redirect(`/${process.env.ADMIN_PATH}/${req.params.id}`);
      } catch (e) {
        throwServerError(res, e);
      }
    
});

// переключение на форму заполнения
productsRouter.post('/add', async (
    req: Request<{}, {}, {}>,
    res: Response
) => {
    try {        
        res.render("product/product-new")        
      } catch (e) {
        throwServerError(res, e);
      }    
});

// обработка заполненной формы
productsRouter.post('/addNewProduct', async (
    req: Request<{}, {}, IProductCreateData>,
    res: Response
) => {
    // console.log(11);
    // считываем из формы, постим в базу и возвращаемся  в полную форму редактирования
    try {
        const product = await addProduct(req.body);
        // console.log(product);
        const others = await getOthers(product.id);
        const similars = await getSimilars(product.id);

        if (product) {
            res.render("product/product", {
                item: {
                    product: product,
                    others: others,
                    similars: similars,
                }
            });
        } else {
            res.render("product/empty-product", {
                id: product.id
            });
        }
    } catch (e) {
        throwServerError(res, e);
    }
    
 });