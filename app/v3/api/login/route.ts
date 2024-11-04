import { NextRequest, NextResponse } from "next/server";
import { UsersCollection } from "../db/usersCollection";
import { HTTP_STATUS } from "@/app/models/http";

enum MESSAGE {
    CREATION_ERROR = 'An error occurred while creating the reward',
}

export async function GET(req: NextRequest) {

    try {
        const username = req.nextUrl.searchParams.get("username");
        const password = req.nextUrl.searchParams.get("password");
        const usersCollection: UsersCollection = new UsersCollection();
        // if(!email || !password) return NextResponse.json(
        //     {
        //         message: "Missing email or password",
        //     }, 
        //     { status: HTTP_STATUS.BAD_REQUEST }
        // );
        console.log("username",username);
        console.log("password",password);   
        
        if (!username || !password) {
            return NextResponse.json(
                {
                    message: "Missing username or password",
                }, 
                { status: HTTP_STATUS.BAD_REQUEST }
            );
        }

        const filter: {
            username: string
            password: string
        } = { 
            username: username,
            password: password
        }
        const result = await usersCollection.list(
            filter
        );
        console.log("result",result);
        
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error(MESSAGE.CREATION_ERROR, error);
        return NextResponse.json(
            {
                message: MESSAGE.CREATION_ERROR,
                error: error,
            }, 
            { status: HTTP_STATUS.SERVER_ERROR }
        );
    }

}