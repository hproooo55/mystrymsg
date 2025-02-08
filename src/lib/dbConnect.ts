import mongoose from "mongoose"

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void>{
    if(connection.isConnected){
        console.log("Already connected to database")
        return
    }

    try{
        const db = await mongoose.connect("mongodb+srv://hproooo55:FNATIC12@cluster0.dc7wf.mongodb.net/mstrymsg", {})
        connection.isConnected = db.connections[0].readyState

        console.log("DB connected successfully");
    }catch (error){
        console.log('db connection failed', error)
        process.exit
    }
}

export default dbConnect;