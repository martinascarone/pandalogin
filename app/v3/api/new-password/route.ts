import { HTTP_STATUS } from "@/app/models/http";
import { PasswordUpdate} from "@/app/models/user";
import { UsersCollection } from "../db/usersCollection";
import { NextRequest, NextResponse } from "next/server";

enum MESSAGE {
    CREATION  = 'User created successfully',
    CREATION_ERROR = 'An error occurred while creating the user',
    CREATION_MISSING_PARAMETERS = 'Missing oldPassword, newPassword or newPasswordRepeat',
    INVALID_PARAMETERS = 'Invalid parameters'
} 

const areParametersValid = (newReward: PasswordUpdate) => {
    if(!newReward.oldPassword || !newReward.newPassword || !newReward.newPasswordRepeat) return false
    return true;
}



export async function PUT(req: NextRequest) {
    try {
        let newPass: PasswordUpdate  | null | undefined = null;
        try {
            newPass = await req.json();
            if(!areParametersValid(newPass as PasswordUpdate)) throw new Error(MESSAGE.INVALID_PARAMETERS);
            
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
        if(!newPass) throw new Error(MESSAGE.INVALID_PARAMETERS);
        const usersCollection: UsersCollection = new UsersCollection();
        const result = await usersCollection.updatePassword({
            _id: newPass._id,
            username: newPass.username,
            password: newPass.newPassword
        });
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