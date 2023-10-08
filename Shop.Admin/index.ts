import express, { Express } from "express";
import {productsRouter } from './controllers/products.controller';
import {authRouter, validateSession } from './controllers/auth.controller';
import layouts from "express-ejs-layouts";
import bodyParser from "body-parser";
import session from "express-session";

export default function (): Express {
    const app = express();

    // Для хранения сессий
    // Параметр secret используется для подписи session-куки. 
    // Это обязательный параметр, в котором указан секретный ключ.
    //  На его основе генерируются данные для сессионной куки. 
    //  Также с его помощью валидируются куки. 
    //  А это гарантирует защиту от подмены. она должна быть набором символов
    // Более надёжное место для secret — environment variables.
    // дальше пояснение ниже
    // app.use(session({
    //     secret: "abcde",
    //     saveUninitialized: false,
    //     resave: false
    // }));

    app.use(session({
        /**
         * 35.4.2
         * использование значения из env для параметра secret
         */
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false
      }));


    // для правильного парсинга данных JSON в теле пост запроса
        app.use(express.json());
        app.use(bodyParser.urlencoded({ extended: false }));
  
    // шаблонизатор страниц
    app.set("view engine", "ejs");
    app.set("views", "Shop.Admin/views");
    
    app.use(layouts);
//  подключение папки публик и ее содержимого
    app.use(express.static(__dirname + "/public"));  // хелпер начнет поиск из корня проекта
    
    app.use(validateSession);
    app.use("/auth", authRouter);
    app.use("/", productsRouter);

    return app;
}

// У параметра saveUninitialized по умолчанию значение true, он также требуется для явного указания в конфиге сессий.

// Если установлено значение true, сессия будет сохранена в хранилище сессий, даже если она не инициализирована (т. е. в неё не были добавлены данные). Это может быть полезно для предварительной авторизации, когда данных для сохранения в сессии ещё нет.
// Если установлено значение false, сессия не будет храниться в хранилище сессий, пока к ней не будут добавлены данные. Это помогает экономить место в хранилище сессий.
// Параметр resave также является обязательным:

// Если установлено значение true, кука сессии будет перезаписываться при каждом запросе. Даже если сессия не была изменена.
// Если установлено значение false, сессия будет сохранена в хранилище сессий только при изменении во время запроса. Это помогает оптимизировать производительность за счёт сокращения ненужных операций записи в хранилище сессий.
