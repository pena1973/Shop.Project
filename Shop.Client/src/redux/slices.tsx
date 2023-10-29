import { createSlice } from '@reduxjs/toolkit';
import { ProductState, ListState} from './types'
import { IProduct, ISimilar} from "../redux/types";
// import { createAsyncThunk } from "@reduxjs/toolkit";

// import { RootState, AppDispatch } from "../main";
// import { newTickets,moreTickets } from '../mock'

export const emptyProduct: IProduct = {
    id: "",
    title: "",
    description: "",
    price: 0,
    thumbnail: {
        id: "",
        productId: "",
        main: true,
        url: "",
    },
    comments: [{
        id: "",
        name: "",
        email: "",
        body: "",
        productId: ""
    }],

    images: [{
        id: "",
        productId: "",
        main: true,
        url: "",
    }]
};
export const emptySimilar: ISimilar = {
    id: "",
    title: "",
    price: 0,
};
// productListState
const sortIntialState: ListState = {
    loading: false,
    filter: { title: '', priceFrom: 0, priceTo: 0, },
    products:[]        
}
// products:[
//     {id: "34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06",
//     title: "Galaxy A52",        
//     price: 17999.25,
//     thumbnail: {
//         id: "2010c194-e446-11ed-b5ea-0242ac120002",
//         productId: "34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06",
//         main: true,
//         url: "https://via.placeholder.com/150/9c184f",
//       },
//       comments:5,
//     },
//     {id: "34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa07",
//     title: "Gal A50",        
//     price: 1730.55,
//     thumbnail: undefined,
//       comments:5,
//     },
//     {id: "34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa03",
//     title: "Galaxy A5",        
//     price: 4599.25,
//     thumbnail: undefined,
//       comments:5,
//     },
//     {id: "34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa03",
//     title: "Galaxy A2",        
//     price: 13758.25,
//     thumbnail: {
//         id: "2010c194-e446-11ed-b5ea-0242ac120007",
//         productId: "34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa07",
//         main: true,
//         url: "https://via.placeholder.com/150/9c184f",
//       },
//       comments:5,
//     },
// ]

// productState
const queryIntialState: ProductState = {    
    loading: false,    
    // product:{
    // id: "34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06",
    // title: "Galaxy A52",
    // description: "333A mid-range smartphone with a large battery and display",
    // price: 17999.25,
    
    // thumbnail: {
    //     id: "2010c194-e446-11ed-b5ea-0242ac120002",
    //     productId: "34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06",
    //     main: true,
    //     url: "https://via.placeholder.com/150/9c184f",
    //   },
    // comments: [{
    //     id: "6dfb448b-df24-4b05-8965-676e433b9a41",
    //     name: "nata",
    //     email: "liseo@gardner.biz",
    //     body: "laudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo necessitatibus dolor quam autem quasi reiciendis et nam sapiente accusantium",
    //     productId: "34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06"}],

    // images: [{
    //     id: "2010c194-e446-11ed-b5ea-0242ac120002",
    //     productId: "34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06",
    //     main: true,
    //     url: "https://via.placeholder.com/150/9c184f",
    //   }]
    // },    
    comments: [{
        id: "6dfb448b-df24-4b05-8965-676e433b9a41",
        name: "nata",
        email: "liseo@gardner.biz",
        body: "laudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo necessitatibus dolor quam autem quasi reiciendis et nam sapiente accusantium",
        productId: "34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06"}],

    // similars: [{id: "34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06",title: "Galaxy A52", price: 17999.25,}]
}

const listSlices = createSlice({
    name: 'list',
    initialState: sortIntialState,
    reducers: {        
        setFilter:(state, action) => {
                 state.filter = action.payload;
             },
        setProducts:(state, action) => {
                state.products = action.payload;
            },   
        showLoadingList: (state, action) => {
                state.loading = action.payload;
            },      
    },
})

const productSlices = createSlice({
    name: 'product',
    initialState: queryIntialState,
    reducers: {       
        showLoadingProduct: (state, action) => {
            state.loading = action.payload;
        },

        // setProduct:(state, action) => {
        //     state.product = action.payload;
        // },
        setComents:(state, action) => {
            state.comments = action.payload;
        },
            setSimilars:(state, action) => {
           state.similars = action.payload;
       },   


    },
    // extraReducers: (builder) => {
    //     // обработка ошибок выполнения промежуточного действия queryThunk -  обращения к 
    //     console.log('queryThunk');
    //     builder.addCase(queryThunk.fulfilled, (state, action) => {
    //         console.log('fulfilled', state, action);
    //     })
    //     builder.addCase(queryThunk.rejected, (state, action) => {
    //         console.log('rejected', state, action)

    //     })
    //     builder.addCase(queryThunk.pending, (state, action) => {
    //         console.log('pending', state, action);

    //     })
    //  },
})

// // запрос делаем в каждый момент изменения отбора компаний и пересадок
// interface UserData {
//     // transfers: Transfers,
//     // companies: Company[],
//     variant: string,
//     loadmore: boolean,
// }

// export const queryThunk = createAsyncThunk<
//     // Ticket[],
//     void,
//     UserData,
//     {
//         dispatch: AppDispatch,
//         state: RootState
//     }
// >
//     ("query/queryApi", async ({ variant, loadmore }, thunkApi) => {
//         const dispatch = thunkApi.dispatch;
//         const sortState = thunkApi.getState().sortSlices;
//         const queryState = thunkApi.getState().querySlices;

//         const transfers1 = sortState.transfers;
//         const companies1 = sortState.companies;
//         //  transfers, companies -  параметры запроса АПИ   
//         //  я их беру из слайса а на входе оставлю себе на будущее как пример на память
//         //   variant -  параметр сортировки                      

//         //   Запрос если loadmore -  тогда делаем запрос на следующую порцию и добавим к имеющейся
//         //   const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
//         //   ответ - массив билетов
//         //   const newTickets = await response.json();
//         // имитация что загрузили  лежит в файле mock (newTickets - получили)
//         // имитация что ДОгрузили билеты  лежит в файле mock (moreTickets - получили)
//         let rawTickets:Ticket[] = [];
//         if (loadmore) {
//             rawTickets  = queryState.tickets.concat(moreTickets);
//         }
//         else{
//             rawTickets  = newTickets;
//         }

//         // отбор  как бы параметры запроса
//         const resultTickets = rawTickets.filter((ticket) => {
//             let transfer = false;
          
//             if (!transfers1.checked0
//                 && !transfers1.checked1
//                 && !transfers1.checked2
//                 && !transfers1.checked3
//             ) transfer = false;
//             else if (ticket.transferCount === 0) transfer = transfers1.checked0
//             else if (ticket.transferCount === 1) transfer = transfers1.checked1
//             else if (ticket.transferCount === 2) transfer = transfers1.checked2
//             else if (ticket.transferCount === 3) transfer = transfers1.checked3

//             return (transfer && companies1.find((element) => (element.name === ticket.companyLogo))?.checked)
//         });

//         // имитация задержки
//         setTimeout(() => {
//             // сортировка
//             switch (variant) {
//                 case 'chip':
//                     dispatch(sortPrice(resultTickets))
//                     break;
//                 case 'fast':
//                     dispatch(sortTime(resultTickets))
//                     break;
//                 case 'optim':
//                     dispatch(sortOpnim(resultTickets))
//                     break;
//                 default:
//             }
//             // отменяю показ колесика загрузки
//             dispatch(showLoading(false));
//         }, 1000);

//     },
//     );

export const { setFilter, setProducts, showLoadingList } = listSlices.actions;
export const {setComents,  showLoadingProduct } = productSlices.actions;
export { listSlices, productSlices};