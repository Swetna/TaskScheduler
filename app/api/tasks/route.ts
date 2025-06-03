
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/app/utils/connect";

export async function POST(req:Request){

    try{
        const {userId} = await auth();

        if(!userId){
            return NextResponse.json({error: "Unauthorized" , status : 401})
        }

        const {title,description,date,completed,important} = await req.json();

        if (!title || !description || !date){
            return NextResponse.json({
                error:"Missing required feilds",
                status:400,
            });
        }

        if (title.length < 3){
            return NextResponse.json({
                error:"Title must be atleast 3 characters long.",
                status:400,
            });
        }


        const task = await prisma.task.create({
            data: {
                title,
                description,
                isCompleted: completed,
                isImportant : important,
                userId,
            }
        });

        return NextResponse.json(task);
        

    }
    catch(error){
        console.log("Error Creating Task:" , error);
        return  NextResponse.json({error : "Error creating task" , status:500});
    }
}




export async function GET(req:Request){

    try{

    }
    catch(error){
        console.log("Error Getting Task:" , error);
        return  NextResponse.json({error : "Error creating task" , status:500});
    }
}


export async function PUT(req:Request){

    try{

    }
    catch(error){
        console.log("Error UpdatingTask:" , error);
        return  NextResponse.json({error : "Error creating task" , status:500});
    }
}


export async function DELETE(req:Request){

    try{

    }
    catch(error){
        console.log("Error Deleting Task:" , error);
        return  NextResponse.json({error : "Error creating task" , status:500});
    }
}