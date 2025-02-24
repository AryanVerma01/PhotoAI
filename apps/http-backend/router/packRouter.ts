import { application, Router } from "express";
import { generateImagefromPackModel } from "@repo/common/schemas";
import { client } from "@repo/db/client";
export const packRouter:Router = Router();

// create a new pack eg valentine pack , bussiness pack
packRouter.post("/generate",async (req,res)=>{
    try{
        // user send packId and modelId 
        const parsedBody = generateImagefromPackModel.safeParse(req.body)
        const userId = req.body.userId

        if(parsedBody.error){
            res.json({
                msg:"Wrong Pack Input"
            })
            return
        }

        // get prompt from packid user sends
        const prompts = await client.packPrompts.findMany({
            where:{
                packId:parsedBody.data.packId
            }
        })

        // API - create image using API
        const imageresponse = await client.outputImages.createManyAndReturn({
            data:
                prompts.map((prompt)=>({ 
                    prompt:prompt.prompt,
                    userId:userId,
                    modelId:parsedBody.data.modelId,
                    imageUrl:"demo",
            }))
        })

        res.status(200).json({
            imageId: imageresponse.map((image)=>image.id)
        })
    }
    catch(error){
        
        res.status(500).json({
            msg:"Error Creating pack images"
        })
    }
})

// Prints all the packs
packRouter.get("/bulk",async (req,res)=>{
    try{
        const allpacks = await client.pack.findMany({})
    
        res.status(200).json({
            allpacks
        })
    }
    catch(error){
        res.status(500).json({
            msg:"Unable to retrieve Packs"
        })
    }
})