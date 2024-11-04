import { HTTP_STATUS } from "@/app/models/http";
import { UserCreation } from "@/app/models/user";
import { UsersCollection } from "../db/usersCollection";
import { NextRequest, NextResponse } from "next/server";

enum MESSAGE {
    CREATION  = 'User created successfully',
    CREATION_ERROR = 'An error occurred while creating the user',
    CREATION_MISSING_PARAMETERS = 'Missing email, password or username',
    INVALID_PARAMETERS = 'Invalid parameters'
} 

const areParametersValid = (newReward: UserCreation) => {
    if(!newReward.email || !newReward.password || !newReward.username) return false
    return true;
}

export async function POST(req: NextRequest) {
    try {
        let newUser: UserCreation  | null | undefined = null;
        try {
            newUser = await req.json();
            if(!areParametersValid(newUser as UserCreation)) throw new Error(MESSAGE.INVALID_PARAMETERS);
            
        } catch (error) {
            console.error(MESSAGE.CREATION_MISSING_PARAMETERS, error);
            return NextResponse.json(
                {
                    message: MESSAGE.CREATION_MISSING_PARAMETERS,
                    error: MESSAGE.INVALID_PARAMETERS,
                }, 
                { status: HTTP_STATUS.BAD_REQUEST }
            );
        }
        if(!newUser) throw new Error(MESSAGE.INVALID_PARAMETERS);

        
        newUser.createdAt = new Date();
        newUser.updatedAt = new Date();
        const rewardCollection: UsersCollection = new UsersCollection();
        const result = await rewardCollection.create(newUser);
        return NextResponse.json(result, { status: 201 });
   

    } catch (error) {
        console.error(MESSAGE.CREATION_ERROR, error);
        return NextResponse.json(
            {
                message: MESSAGE.CREATION_ERROR,
                error: error?.toString(),
            }, 
            { status: HTTP_STATUS.SERVER_ERROR }
        );
    }

}