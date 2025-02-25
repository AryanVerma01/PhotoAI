import {z} from "zod"

export const trainModel = z.object({
    name:z.string(),
    type:z.enum(["Man","Woman","Other"]),
    age:z.number(),
    ethnicity:z.enum(["White","Black","AsianAmerican","EastAsian","SouthEastAsian","SouthAsian","MiddleEastern","Pacific","Hispanic"]),
    eyecolor:z.enum(["Brown","Blue","Hazel","Gray","Black"]),
    bald:z.boolean(),
    zipUrL:z.string(),
    tensorPath:z.string(),
    triggerWord:z.string()
})

// enum further restrictsstring datatype to some particular strings

export const outputImageModel = z.object({
    prompt:z.string(),
    userId:z.string(),
    modelId:z.string(),
    imageUrl:z.string(),
    status:z.enum(["Pending","Failed","Generated"]),
    num:z.number(), 
})


export const generateImagefromPackModel = z.object({
    modelId:z.string(),
    packId:z.string()
})