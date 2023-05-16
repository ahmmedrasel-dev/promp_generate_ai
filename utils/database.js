import mongoose from "mongoose";
let isConnect = false // Track the connection;
const connectToDB = async ( ) => {
    mongoose.set('strictQuery', true);
    if(isConnect){
        console.log('Mongodb is already connected!');
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'prompt_genai',
            useNewUrlParse: true,
            useUnifiedTopology: true,
        })

        isConnect = true;
        console.log('Mongodb Connected!');
    }
    catch(error){
        console.log(error.message);
    }
}

export default connectToDB;