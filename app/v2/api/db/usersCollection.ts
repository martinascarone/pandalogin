/* eslint-disable @typescript-eslint/no-explicit-any */

import { Filter, Db, ObjectId } from "mongodb";
import clientPromise from "@/app/lib/mongodb";
import { UserCreation } from "@/app/models/user";

export  class UsersCollection {

    private readonly COLLECTION = 'users';

    constructor() { }
    
    async list(filter:Filter<any>){
        const client = clientPromise;
        const db = new Db(await client,"dev") as Db;
        return db.collection(this.COLLECTION).find(filter).toArray();
    }
    async get(id: string){
        const client = clientPromise;
        const db = new Db(await client,"dev") as Db;
        return db.collection(this.COLLECTION).findOne({
            _id: new ObjectId(id)
        
        });
    }

    async create(user: UserCreation){
        const client = clientPromise;
        const db = new Db(await client,"dev") as Db;
        const businessWithObjectId = { ...user, _id: new ObjectId(user._id) };
        return db.collection(this.COLLECTION).insertOne(businessWithObjectId);
    }

    async delete(id: string){
        const client = clientPromise;
        const db = new Db(await client,"dev") as Db;
        return db.collection(this.COLLECTION).deleteOne({
            _id: new ObjectId(id)
        });
    }

}

