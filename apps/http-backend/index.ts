import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { aiRouter } from "./router/aiRouter.js";
import { packRouter } from "./router/packRouter.js";
import { client } from "@repo/db/client";
import { S3Client } from "bun";

dotenv.config();
const app = express();

app.use(express.json())
app.use(cors())

app.use("/ai",aiRouter)
app.use("/pack",packRouter)

// S3 client generates presigned url by which u can send PUT Request with data to client
app.get("/pre-signed-url", async (req, res) => {
    const key = `models/${Date.now()}_${Math.random()}.zip`;
    const url = S3Client.presign(key, {
      method: "PUT",
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
      endpoint: process.env.ENDPOINT,
      bucket: process.env.BUCKET_NAME,
      expiresIn: 60 * 5,
      type: "application/zip",
    });
  
    res.json({
      url,
      key,
    });
  });

//  Prints all the genrated images 
app.get("/image/bulk",async (req,res)=>{
    try{
        const userId = req.body.userId

        const images = await client.outputImages.findMany({
            where:{
                userId:userId
            }
        })
        
        res.status(200).json({
            images    
        })
    }
    catch(error){
        res.status(500).json({
            msg:"Error Retrieving Images"
        })
    }
})

// this is Webhook endpoint
app.post("/fal-ai/train",async (req,res)=>{

    const requestId = req.body.request_id as string

    if(!requestId) return

    await client.model.updateMany({
        where:{
            RequestId:requestId
        },
        data:{
            status:"Generated",
            tensorPath:req.body.tensor_path
        }
    })

    // update status of image in DB 
    res.json({
        msg:"WebHook recieved"
    })

})

app.post("/fal-ai/generate",async (req,res)=>{
    const requestId = req.body.requestId

    await client.outputImages.updateMany({
        where:{
            requestId:requestId
        },
        data:{
            status:"Generated"
        }
    })
})

const PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(process.env.FAL_KEY)
    console.log(`Listening on PORT:${PORT}`)
})