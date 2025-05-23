import { Router } from "express";

import { CategoryController } from "./controllers/category/categoryController";
import { CatalogController } from "./controllers/catalog/catalogController";
import { ChatbotHandler } from "./controllers/chatbot/chatController";


const rotas = Router()

//Category
rotas.post("/create-category", new CategoryController().handleCreateCategory)

//Catalog
rotas.post("/create-catalog", new CatalogController().handleCreateCatalog)

//ChatOpenAi
rotas.post("/messages", ChatbotHandler)



export {rotas}