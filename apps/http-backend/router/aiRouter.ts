import { Router } from "express";
import { trainModel } from "@repo/common/schemas";
import { outputImageModel } from "@repo/common/schemas";
import { client } from "@repo/db/client"
import { s3, write, S3Client } from "bun";
import { FalAIModel } from "../models/FalAImodel.js";    // Class
import { parse } from "dotenv";

const falAiClient = new FalAIModel()         // new object of FalAIModel class
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

        const {request_id,response_url} = await falAiClient.trainModel("",parsedBody.data.triggerWord)

        // store model info in DB
        const response = await client.model.create({
            data:{
                name:parsedBody.data.name,
                type:parsedBody.data.type,
                age:parsedBody.data.age,
                ethnicity:parsedBody.data.ethnicity,
                eyecolor:parsedBody.data.eyecolor,
                bald:parsedBody.data.bald,
                userId:userId,
                triggerWord:parsedBody.data.triggerWord,
                RequestId:request_id,
                tensorPath:parsedBody.data.tensorPath
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

        const model = await  client.model.findFirst({
            where:{
                id:parsedBody.data.modelId
            }
        })

        if(!model || !model.tensorPath){
            res.json({  
                msg:"Model Not Found"
            })
            return
        }


    // API logic to generate imges with prompt for specific model
        const {request_id,response_url} = await falAiClient.genearateImage(parsedBody.data.prompt,model.tensorPath)

        const response = await client.outputImages.create({
            data:{
                imageUrl:parsedBody.data.imageUrl,
                userId:userId,
                modelId:parsedBody.data.modelId,
                prompt:parsedBody.data.prompt,
                requestId:request_id
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