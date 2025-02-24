import { Router } from "express";
import { trainModel } from "@repo/common/schemas";
import { outputImageModel } from "@repo/common/schemas";
import { client } from "@repo/db/client"
import { s3, write, S3Client } from "bun";

export const aiRouter:Router = Router();

// recieves information and images of a real human

aiRouter.post("/training",async (req,res)=>{

    try{
        const userId = req.body.userId 
        const parsedBody = trainModel.safeParse(req.body);
    
        if(parsedBody.error){
            res.status(500).json({
                msg:"Incorrect Model Information"
            })
            return
        }

        // store model info in DB
        const response = await client.model.create({
            data:{
                name:parsedBody.data.name,
                type:parsedBody.data.type,
                age:parsedBody.data.age,
                ethnicity:parsedBody.data.ethnicity,
                eyecolor:parsedBody.data.eyecolor,
                bald:parsedBody.data.bald,
                userId:userId
            }
        }) 

        res.status(200).json({
            msg:response.id
        })
    }
    catch(error){
        res.status(500).json({
            msg:"Error creating model"
        })
    }

    
})

// excepts prompt to genrate new image after training

aiRouter.post("/generate",async (req,res)=>{
    try{     
        const userId = req.body.userId            // It comes from clerk
        const parsedBody = outputImageModel.safeParse(req.body)

        if(parsedBody.error){
            res.json({
                msg:"Incorrect input for generating Images"
            })
            return
        }


    // API logic to generate imges with prompt for specific model


        const response = await client.outputImages.create({
            data:{
                imageUrl:parsedBody.data.imageUrl,
                userId:userId,
                modelId:parsedBody.data.modelId,
                prompt:parsedBody.data.prompt
            }
        })

        res.status(200).json({
            imageId:response.id
        })
        
    }
    catch(error){
        res.status(500).json({
            msg:"Error in generating Image"
        })
    }
})