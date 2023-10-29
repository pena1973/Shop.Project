import axios, { Axios, AxiosResponse } from "axios";
import { IProduct, IProductFilterPayload } from "@Shared/types";
import { IProductEditData,IProductCreateData } from "../types"
import { type } from "os";
// import { randomUUID } from "crypto";

const host = `http://${process.env.LOCAL_PATH}:${process.env.LOCAL_PORT}/${process.env.API_PATH}`;

export async function getProducts() {
    const { data } = await axios.get<IProduct[]>(`${host}/products`);
    return data || [];
}
export async function searchProducts(
    filter: IProductFilterPayload
): Promise<IProduct[]> {
    const { data } = await axios.get<IProduct[]>(
        `${host}/products/search`,
        { params: filter }
    );
    return data || [];
}

export async function getProduct(
    id: string
): Promise<IProduct | null> {
    try {
        const { data } = await axios.get<IProduct>(
            `${host}/products/${id}`
        );

        return data;
    } catch (e) {
        return null;
    }
}
//  отправили основной ИД - получили список прочих продуктов
export async function getOthers(
    id: string
): Promise<IProduct[] | null> {
    try {
        const { data } = await axios.get<IProduct[]>(
            `${host}/products/others/${id}`
        );
        //   console.log(`${host}/products/others/${id}`);
        return data;
    } catch (e) {
        return null;
    }
}
// отправили основной ИД - получили список похожих продуктов
export async function getSimilars(
    id: string
): Promise<IProduct[] | null> {
    try {
        const { data } = await axios.get<IProduct[]>(
            `${host}/products/similars/${id}`
        );
        return data;
    } catch (e) {
        return null;
    }
}

export async function removeProduct(id: string): Promise<void> {
    // Сначала удалим связи
    // похожие
    // await axios.post(`${host}/products/remove-all-similars/${id}`);
    // // коменты
    // await axios.post(`${host}/products/remove-comments/${id}`);
    // // рисунки
    // await axios.post(`${host}/products/remove-images/${id}`);
    // продукт
    await axios.delete(`${host}/products/${id}`);
    
}

//   с помощью регулярного выражения мы разбиваем строку на части по разрыву строки или запятой,
//   затем очищаеем каждое значение от пробелов,
//   а затем избвляемся от пустых строк, которые могли образоваться после split
function splitNewImages(str = ""): string[] {
    return str
        .split(/\r\n|,/g)
        .map(url => url.trim())
        .filter(url => url);
}

function compileIdsToRemove(data: string | string[]): string[] {
    if (typeof data === "string") return [data];
    return data;
}

export async function updateProduct(
    productId: string,
    formData: IProductEditData
): Promise<void> {
    // console.log("newSimilars", formData.newSimilars);
    // console.log("similarsToRemove", formData.similarsToRemove);
    try {
        const { data: currentProduct } = await axios.get<IProduct>(`${host}/products/${productId}`);

        // коментарии
        if (formData.commentsToRemove) {
            // formData.commentsToRemove может содержать как строку с одним значением,
            // так и массив значений, поэтому используется хелпер compileIdsToRemove,
            // который в итоге выдаст массив строк                         
            const commentsIdsToRemove = compileIdsToRemove(formData.commentsToRemove);

            // создаем функцию, которая при вызове выдаст массив из вызовов обращений к API            
            const getDeleteCommentActions = () => commentsIdsToRemove.map(commentId => {
                return axios.delete(`${host}/comments/${commentId}`);
            });

            // вызываем функцию с обращениями к API, все запросы запустятся одновременно*/
            await Promise.all(getDeleteCommentActions());

            /**
             * пояснение к Promise.all – это один из вариантов того,
             * как можно удалять комментарии по одному
             *
             * Comments API не имеет метода удаления нескольких комментариев единовременно
             *
             * если вам такой способ неудобен, вы можете реализовать дополнительный
             * метод в Comments API для удаления нескольких комментариев за один вызов
             *
             * такой метод можно реализовать по аналогии с POST /api/products/remove-images
             */
        }

        // удаляем похожие
        if (formData.similarsToRemove) {
            // хелпер compileIdsToRemove который в итоге выдаст массив строк                         
            const similarsIdsToRemove = compileIdsToRemove(formData.similarsToRemove);
           
            await axios.post(`${host}/products/remove-similars/${productId}`, similarsIdsToRemove);
            // console.log("host",`${host}/products/remove-similar/${productId}`);       
        }

        // добавим прочие

        if (formData.newSimilars) {
            // превращаем строку с массив строк
            const similarsIds = compileIdsToRemove(formData.newSimilars);
            // console.log(similarsIds);
            // дописываем ИД в пару
            const similarsIdstoAdd = similarsIds.map(similarId => ({ productId: productId, similarId: similarId }));
            // console.log("similarsIdstoAdd",similarsIdstoAdd);
            // постим в базу
            await axios.post(`${host}/products/add-similar`, similarsIdstoAdd);
        }

        // рисунки
        if (formData.imagesToRemove) {
            // используем хелпер compileIdsToRemove по аналогии с commentsToRemove
            const imagesIdsToRemove = compileIdsToRemove(formData.imagesToRemove);
            await axios.post(`${host}/products/remove-images`, imagesIdsToRemove);
        }


        if (formData.newImages) {
            // превращаем строку с массив строк
            const urls = splitNewImages(formData.newImages);

            //   согласно типу Request body ProductAddImagesPayload /api/add-images,
            //   нам нужно передать объект с полями productId и images,
            //   где images это массив объектов с полями url и main             
            //   все новые картинки мы помечаем как картинки не для обложки,
            //   поэтому main: false             
            const images = urls.map(url => ({ url, main: false }));

            //   если у данного товара еще нет обложки,
            //   то первое изображение из массива images мы установим как обложку товара

            if (!currentProduct.thumbnail) {
                images[0].main = true;
            }
            await axios.post(`${host}/products/add-images`, { productId, images });
        }

        if (formData.mainImage && formData.mainImage !== currentProduct.thumbnail?.id) {
            await axios.post(`${host}/products/update-thumbnail/${productId}`, {
                newThumbnailId: formData.mainImage
            });
        }

        // обновление полей title, description и price в текущем товаре;
        // price из формы приходит в виде строки, поэтому нужно превратить его в число          
        await axios.patch(`${host}/products/${productId}`, {
            title: formData.title,
            description: formData.description,
            price: Number(formData.price)
        });
    } catch (e) {
        console.log(e);
    }
}

export async function addProduct(
    formData: IProductCreateData
): Promise<IProduct | null> {
 
    try {
        
        let images;
        let id;
        
        // еслои есть необходимо преобразовать рисунки в нужный формат
        // превращаем строку с массив строк
        
        if (!(!formData.newImages))
        {const urls = splitNewImages(formData.newImages);

        images = urls.map(url => ({ url, main: false }));
        //   первое изображение из массива images мы установим как обложку товара
        images[0].main = true;}

        // Постим в базу        
        await axios.post(`${host}/products`, {
            title: formData.title, 
            description: formData.description, 
            price: formData.price,             
            images: images
        })
            .then(function (response) {
                id = response.data.productId;
            })
            .catch(function (error) {
                return error;
            });

        try {
            const { data } = await axios.get<IProduct>(
                `${host}/products/${id}`
            );

            return data;
        } catch (e) {
            return null;
        }

    } catch (e) {
        console.log(e);
        return e;

    }
}

