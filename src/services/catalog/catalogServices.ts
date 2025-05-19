import prismaClient from "../../prisma";

interface CreateCatalog {
    name:string
    description:string
    price:number
    categoryId:string
}

class CatalogServices {

    async exCreateCatalog({name, description, price, categoryId}:CreateCatalog){

        const verifyName = await prismaClient.catalog.findFirst({
            where:{
                name:name
            }
        })
        if(verifyName){
            return {message:"product already registered"}
        }
        
        await prismaClient.catalog.create({
            data:{
                name:name,
                description:description,
                price:price,
                categoryId:categoryId
            }
        })
        return {message:"product registered successfully"}
    }

    async exListCatalog(){

        const listCatalog = await prismaClient.catalog.findMany({})
        return(listCatalog)

    }

}
export {CatalogServices}