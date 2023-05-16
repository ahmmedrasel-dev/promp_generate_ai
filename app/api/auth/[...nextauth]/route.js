import User from "@models/user";
import connectToDB from "@utils/database";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";


 
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    async session({session}){
        const sessionUser = await User.findOne({
            email: session.user.email, 
        })
    },
    async signIn({profile}){
        try{
            await connectToDB();
            // Check User Already Exists;
            const userExists = await User.findOne({
                email: profile.email,
            })

            // If Not Create New User;
            if(!userExists){
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(" ", '').toLowerCase(),
                    image: profile.picture,
                })
            }
            return true;
        }
        catch(error){
            console.log(error);
        }
    }
})

export { handler as GET, handler as POST};