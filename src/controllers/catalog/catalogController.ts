import { Request, Response } from "express";
import { CatalogServices } from "../../services/catalog/catalogServices";

class CatalogController{

    async handleCreateCatalog(req:Request, res:Response) {
        const { name, description, price, categoryId } = req.body

        //função para que a primeira letra de cada palavra fique em maiusculo, criando um banco de dados organizado!
        const formatName = (str: string): string => {
            return str
              .toLowerCase()
              .split(" ")
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");
          };
        const formattedName = formatName(name);
        //-----------------------------------------------------------------------------------------------
        
        const catalogServices = new CatalogServices()
        const response = await catalogServices.exCreateCatalog({
            name:formattedName,
            description,
            price,
            categoryId
        })
        res.json(response)
        return
    }

    
    async handleListCatalog(req:Request, res:Response) {
        
        const listCatalog = new CatalogServices()
        const response = await listCatalog.exListCatalog()

        res.json(response)
        return
    }
    
}
export {CatalogController}