import prismaClient from "../../prisma";


interface CreateCategory {
    name:string
}

class CategoryServices {

    async exCreateCategory({name}:CreateCategory){

        const verifyName = await prismaClient.category.findFirst({
            where:{
                name:name
            }
        })
        if(verifyName){
            return {message:"category already registered"}
        }
        
        await prismaClient.category.create({
            data:{
                name:name
            }
        })
        return {message:"category created successfully"}
    }
}
export {CategoryServices}