import { Request, Response, Router } from "express";
import { connection } from "../../index";
import { v4 as uuidv4 } from 'uuid';
import { OkPacket } from "mysql2";
import { enhanceProductsComments, enhanceProductsImages, getProductsFilterQuery } from "../helpers";
import {
  ICommentEntity,
  ImagesRemovePayload,
  SimilarsRemovePayload,
  ProductAddSimilarPayload,
  IProductEntity,
  IProductImageEntity,
  IProductSearchFilter,
  ProductAddImagesPayload,
  ProductCreatePayload,
  ISimilarEntity,
  CommentAddPayload,
} from "../../types";
import { mapCommentsEntity, mapImagesEntity, mapProductsEntity, mapSimilarsEntity } from "../services/mapping";
import {
  DELETE_IMAGES_QUERY,
  INSERT_PRODUCT_IMAGES_QUERY,
  INSERT_PRODUCT_QUERY,
  REPLACE_PRODUCT_THUMBNAIL,
  UPDATE_PRODUCT_FIELDS
} from "../services/queries";
import { type } from "os";

export const productsRouter = Router();

const throwServerError = (res: Response, e: Error) => {
  console.debug(e.message);
  res.status(500);
  res.send("Something went wrong");
}

/**
 * Задание 34.10 – доработанный метод получения списка товаров вместе с изображениями
 * //http://localhost:3000/api/products/
 */
productsRouter.get('/', async (req: Request, res: Response) => {
  // Необходимо прописать для гет запросов потому что почему то общая настройка здесь не срабатывает
  res.setHeader('Content-Type', 'application/json');
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const [productRows] = await connection.query<IProductEntity[]>("SELECT * FROM products");
    const [commentRows] = await connection.query<ICommentEntity[]>("SELECT * FROM comments");
    const [imageRows] = await connection.query<IProductImageEntity[]>("SELECT * FROM images");

    const products = mapProductsEntity(productRows);
    const withComments = enhanceProductsComments(products, commentRows);
    const withImages = enhanceProductsImages(withComments, imageRows)

    
    res.send(withImages);
  } catch (e) {
    throwServerError(res, e);
  }
});

/**
 * Задание 34.10 – доработанный метод поиска товаров вместе с изображениями
 * http://localhost:3000/api/products/search?title=Nova&description=compact&priceFrom=15000&priceTo=16000
 */
productsRouter.get('/search', async (
  req: Request<{}, {}, {}, IProductSearchFilter>,
  res: Response
) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const [query, values] = getProductsFilterQuery(req.query);
    const [rows] = await connection.query<IProductEntity[]>(query, values);

    if (!rows?.length) {
      res.send([]);
      return;
    }

    const [commentRows] = await connection.query<ICommentEntity[]>("SELECT * FROM comments");
    const [imageRows] = await connection.query<IProductImageEntity[]>("SELECT * FROM images");

    const products = mapProductsEntity(rows);
    const withComments = enhanceProductsComments(products, commentRows);
    const withImages = enhanceProductsImages(withComments, imageRows)
    res.send(withImages);
  } catch (e) {
    throwServerError(res, e);
  }
});


/**
 * Задание 34.10 – доработанный метод получения товара по id вместе с изображениями
 * http://localhost:3000/api/products/5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c
 */
productsRouter.get('/:id', async (
  req: Request<{ id: string }>,
  res: Response
) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const [rows] = await connection.query<IProductEntity[]>(
      "SELECT * FROM products WHERE product_id = ?",
      [req.params.id]
    );

    if (!rows?.[0]) {
      res.status(404);
      res.send(`Product with id ${req.params.id} is not found`);
      return;
    }

    const [comments] = await connection.query<ICommentEntity[]>(
      "SELECT * FROM comments WHERE product_id = ?",
      [req.params.id]
    );

    const [images] = await connection.query<IProductImageEntity[]>(
      "SELECT * FROM images WHERE product_id = ?",
      [req.params.id]
    );

    const product = mapProductsEntity(rows)[0];

    if (comments.length) {
      product.comments = mapCommentsEntity(comments);
    }

    if (images.length) {
      product.images = mapImagesEntity(images);
      product.thumbnail = product.images.find(image => image.main) || product.images[0];
    }

    res.send(product);
  } catch (e) {
    throwServerError(res, e);
  }
});

/**
 * Задание 34.10 – доработанный метод добавления товара с добавлением изображений в соответствующую таблицу
 */
productsRouter.post('/', async (
  req: Request<{}, {}, ProductCreatePayload>,
  res: Response
) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const { title, description, price, images } = req.body;
    const productId = uuidv4();
    await connection.query<OkPacket>(
      INSERT_PRODUCT_QUERY,
      [productId, title || null, description || null, price || null]
    );

    if (images) {
      const values = images.map((image) => [uuidv4(), image.url, productId, image.main]);
      await connection.query<OkPacket>(INSERT_PRODUCT_IMAGES_QUERY, [values]);
    }
    res.status(201);
    res.send({ productId: productId, message: `Product with id:${productId} have been added!` });
  } catch (e) {
    throwServerError(res, e);
  }
});

/**
 * Задание 34.10
 * доработанный метод удаления товара с предварительным удалением всех изображений и комментариев,
 * которые относятся к этому товару
 */
productsRouter.delete('/:id', async (
  req: Request<{ id: string }>,
  res: Response
) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const [rows] = await connection.query<IProductEntity[]>(
      "SELECT * FROM products WHERE product_id = ?",
      [req.params.id]
    );

    if (!rows?.[0]) {
      res.status(404);
      res.send(`Product with id ${req.params.id} is not found`);
      return;
    }
    
    await connection.query<OkPacket>("DELETE FROM images WHERE product_id = ?", [req.params.id]);
    
    await connection.query<OkPacket>("DELETE FROM comments WHERE product_id = ?", [req.params.id]);
    
    // очищаю все таблицы которые могут быть с этим связаны
    await connection.query<OkPacket>("DELETE FROM similars WHERE similar_id = ?", [req.params.id]);
    await connection.query<OkPacket>("DELETE FROM similars WHERE product_id = ?", [req.params.id]);
    
    await connection.query<OkPacket>("DELETE FROM products WHERE product_id = ?", [req.params.id]);
   

    res.status(200);
    res.end();
  } catch (e) {
    throwServerError(res, e);
  }
});

/**
 * Задание 34.10 – добавление изображений конкретному товару
 */
productsRouter.post('/add-images', async (
  req: Request<{}, {}, ProductAddImagesPayload>,
  res: Response
) => { 
  res.setHeader('Content-Type', 'application/json');
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const { productId, images } = req.body;

    if (!images?.length) {
      res.status(400);
      res.send("Images array is empty");
      return;
    }

    const values = images.map((image) => [uuidv4(), image.url, productId, image.main]);
    await connection.query<OkPacket>(INSERT_PRODUCT_IMAGES_QUERY, [values]);

    res.status(201);
    res.send(`Images for a product id:${productId} have been added!`);
  } catch (e) {
    throwServerError(res, e);
  }
});

//  удаление коментов конкретного продукта из таблицы comments
productsRouter.post('/remove-comments/:id', async (
  req: Request<{ id: string }>,
  res: Response
) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const [info] = await connection.query<OkPacket>("DELETE FROM comments WHERE product_id = ?", [req.params.id]);
    // удаляю проверку потому что она мешает при удалении продукта целиком
    // if (info.affectedRows === 0) {
    //   res.status(404);
    //   res.send("No one comment has been removed");
    //   return;
    // }
    res.status(200);
    res.send(`Comments have been removed!`);
  } catch (e) {
    throwServerError(res, e);
  }
});

//  удаление списка изображений конкретного продукта из таблицы images
productsRouter.post('/remove-images/:id', async (
  req: Request<{ id: string }>,
  res: Response
) => {
  
  try {
    const [info] = await connection.query<OkPacket>("DELETE FROM images WHERE product_id = ?", [req.params.id]);
    // удаляю проверку потому что она мешает при удалении продукта целиком
    // if (info.affectedRows === 0) {
    //   res.status(404);
    //   res.send("No one image has been removed");
    //   return;
    // }
    res.status(200);
    res.send(`Images have been removed!`);
  } catch (e) {
    throwServerError(res, e);
  }
});

//  Задание 34.10 – удаление списка изображений из таблицы images
productsRouter.post('/remove-images', async (
  req: Request<{}, {}, ImagesRemovePayload>,
  res: Response
) => {
  
  try {
    const imagesToRemove = req.body;

    if (!imagesToRemove?.length) {
      res.status(400);
      res.send("Images array is empty");
      return;
    }

    const [info] = await connection.query<OkPacket>(DELETE_IMAGES_QUERY, [[imagesToRemove]]);

    if (info.affectedRows === 0) {
      res.status(404);
      res.send("No one image has been removed");
      return;
    }

    res.status(200);
    res.send(`Images have been removed!`);
  } catch (e) {
    throwServerError(res, e);
  }
});

/**
 * новый метод в рамках задания 35.3.1
 * изменение обложки товара
 */
productsRouter.post('/update-thumbnail/:id', async (
  req: Request<{ id: string }, {}, { newThumbnailId: string }>,
  res: Response
) => {
  
  try {
    /**
     *  проверяем наличие у данного товара обложки,
     *  далее мы будем использовать id текущей облажки из currentThumbnailRows
     */
    const [currentThumbnailRows] = await connection.query<IProductImageEntity[]>(
      "SELECT * FROM images WHERE product_id=? AND main=?",
      [req.params.id, 1]
    );

    if (!currentThumbnailRows?.length || currentThumbnailRows.length > 1) {
      res.status(400);
      res.send("Incorrect product id");
      return;
    }

    /**
     * проверяем наличие новой обложки в базе;
     * если её там нет – мы не сможем переопределить обложку товара
     */
    const [newThumbnailRows] = await connection.query<IProductImageEntity[]>(
      "SELECT * FROM images WHERE product_id=? AND image_id=?",
      [req.params.id, req.body.newThumbnailId]
    );

    if (newThumbnailRows?.length !== 1) {
      res.status(400);
      res.send("Incorrect new thumbnail id");
      return;
    }

    const currentThumbnailId = currentThumbnailRows[0].image_id;
    const [info] = await connection.query<OkPacket>(
      REPLACE_PRODUCT_THUMBNAIL,
      [currentThumbnailId, req.body.newThumbnailId, currentThumbnailId, req.body.newThumbnailId]
    );

    if (info.affectedRows === 0) {
      res.status(404);
      res.send("No one image has been updated");
      return;
    }

    res.status(200);
    res.send("New product thumbnail has been set!");
  } catch (e) {
    throwServerError(res, e);
  }
});

/**
 * новый метод в рамках задания 35.3.1
 * обновление данных товара – заголовка, описания и стоимости
 */
productsRouter.patch('/:id', async (
  req: Request<{ id: string }, {}, ProductCreatePayload>,
  res: Response
) => {
 
  try {
    const { id } = req.params;

    const [rows] = await connection.query<IProductEntity[]>(
      "SELECT * FROM products WHERE product_id = ?",
      [id]
    );

    if (!rows?.[0]) {
      res.status(404);
      res.send(`Product with id ${id} is not found`);
      return;
    }

    const currentProduct = rows[0];

    /**
     * по-простому обновляем поля: либо берем их новые значения,
     * либо их текущие значения
     */
    await connection.query<OkPacket>(
      UPDATE_PRODUCT_FIELDS,
      [
        req.body.hasOwnProperty("title") ? req.body.title : currentProduct.title,
        req.body.hasOwnProperty("description") ? req.body.description : currentProduct.description,
        req.body.hasOwnProperty("price") ? req.body.price : currentProduct.price,
        id
      ]
    );

    res.status(200);
    res.send(`Product id:${id} has been added!`);
  } catch (e) {
    throwServerError(res, e);
  }
});

//---------------------------

// метод получения списка получает id товара и выдаёт список «похожих товаров», связанных с этим id;
// получение списка похожих товаров по ИД
productsRouter.get('/similars/:id', async (
  req: Request<{ id: string }>,
  res: Response
) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    // похожие товары
    const [rows] = await connection.query<ISimilarEntity[]>(
      "SELECT * from similars where product_id = ? ORDER BY title",
      [req.params.id]
    );

    const similars = mapSimilarsEntity(rows);

    res.send(similars);
  } catch (e) {
    throwServerError(res, e);
  }
});

// метод получения списка получает id товара и выдаёт список «прочих товаров (не симилар)», не связанных с этим id;
// получение списка похожих товаров по ИД
productsRouter.get('/others/:id', async (
  req: Request<{ id: string }>,
  res: Response
) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const text_query =
      `SELECT 
 products.product_id as product_id,
 products.title as title,
 products.description as description,
 products.price as price,
 similars.row_id as row_id
 FROM  (SELECT * from products where product_id != ?)  as products
 LEFT JOIN (SELECT * FROM similars where product_id = ?) as similars
 on products.product_id = similars.similar_id
 where row_id is null
 ORDER BY products.title`

    //  LEFT JOIN (SELECT * FROM similars where product_id = "${req.params.id}") as similars

    const [rows] = await connection.query<IProductEntity[]>(
      text_query,
      [req.params.id, req.params.id]
    );

    if (!rows?.[0]) {
      res.status(404);
      res.send(`Other products not similar id ${req.params.id} is not found`);
      return;
    }
    const products = mapProductsEntity(rows);
    res.send(products);
  } catch (e) {
    throwServerError(res, e);
  }
});

// метод удаления получает список id похожих для id продукта, для которых нужно удалить все связи из таблицы.
// а если список пуст  - удаление всех похожих товаров для id продукта
productsRouter.post('/remove-similars/:id', async (
  req: Request<{ id: string }, {}, SimilarsRemovePayload>,
  res: Response
) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {

    const similarsToRemove = req.body;
    const productId = req.params.id;
    const [info] = await connection.query<OkPacket>(`DELETE FROM similars where product_id = ? and similar_id IN ?`, [productId, [similarsToRemove]]);

    if (info.affectedRows === 0) {
      res.status(404);
      res.send("No one image has been removed");
      return;
    }

    res.status(200);
    res.send(`Images have been removed!`);
  } catch (e) {
    throwServerError(res, e);
  }
});
// метод удаления получает список id похожих для id продукта, для которых нужно удалить все связи из таблицы.
// а если список пуст  - удаление всех похожих товаров для id продукта
productsRouter.post('/remove-all-similars/:id', async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {

    const productId = req.params.id;
    const [info] = await connection.query<OkPacket>(`DELETE FROM similars where product_id = ?`, [productId]);
    // удаляю проверку потому что она мешает при удалении продукта целиком
    // if (info.affectedRows === 0) {
    //   res.status(404);
    //   res.send("No one similar has been removed");
    //   return;
    // }

    res.status(200);
    res.send(`Images have been removed!`);
  } catch (e) {
    throwServerError(res, e);
  }
});


// метод добавления получает список пар id товаров, которые нужно добавить в таблицу;
// добавление списка пар похожих товаров
productsRouter.post('/add-similar', async (
  req: Request<{}, {}, ProductAddSimilarPayload>,
  res: Response
) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const similarsToAdd = req.body;

    if (!similarsToAdd?.length) {
      res.status(400);
      res.send("Simmilar array is empty");
      return;
    }

    const similarsID = similarsToAdd.map(item => item.similarId);

    // далее запрашиваю из базы данные по всем похожим продуктам для доп информации по ним
    const [productsRows] = await connection.query<IProductEntity[]>("SELECT * FROM products where product_id IN ?", [[similarsID]]);

    // создаю строки для вставки
    const values = similarsToAdd.map((item) => {
      let similar = productsRows.find((element) => (element.product_id = item.similarId))
      return [uuidv4(), similar.title, similar.description, similar.price, item.productId, item.similarId]
    });

    await connection.query<OkPacket>("INSERT INTO similars (row_id, title, description, price, product_id, similar_id) VALUES ?", [values]);

    res.status(201);
    res.send(`Images for a product id:${similarsToAdd} have been added!`);
  } catch (e) {
    throwServerError(res, e);
  }
});


// // метод добавления коментария;
// productsRouter.post('/add-comment/:id', async (
//   req: Request<{ id: string }, {}, CommentAddPayload>,  
//   res: Response
// ) => {

//   res.setHeader('Content-Type', 'application/json');
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
//   try {
//     const commentToAdd = req.body;

//     if (!commentToAdd) {
//       res.status(400);
//       res.send("Comment is empty");
//       return;
//     }

//     const values = [[
//        req.params.id,
//        commentToAdd.name,
//        commentToAdd.email,
//        commentToAdd.body,
//        uuidv4()
//     ]]

//     await connection.query<OkPacket>("INSERT INTO comments (product_id, name, email, body, comment_id) VALUES ?", [values]);
   
//     res.status(201);
//     res.send(commentToAdd);
//   } catch (e) {
//     throwServerError(res, e);
//   }
// });


// similars(
// 		row_id VARCHAR(36) NOT NULL,
//           title  VARCHAR(255) NOT NULL,
//           description  VARCHAR(255) NOT NULL,
//           price DECIMAL(10, 2) NOT NULL,
//           product_id VARCHAR(36) NOT NULL,
//           similar_id VARCHAR(36) NOT NULL,
//           PRIMARY KEY (row_id),
//           FOREIGN KEY (product_id) REFERENCES products(product_id),
//           FOREIGN KEY (similar_id) REFERENCES products(product_id)
//       );