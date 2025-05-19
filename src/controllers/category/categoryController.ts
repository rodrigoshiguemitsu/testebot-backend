import { Request, Response } from "express";
import { CategoryServices } from "../../services/category/categoryService";


class CategoryController {

    async handleCreateCategory(req:Request, res:Response) {
        const { name } = req.body

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

        const categoryServices = new CategoryServices()
        const response = await categoryServices.exCreateCategory({
                name:formattedName
        })
        res.json(response)
        return
    }


}
export {CategoryController}
