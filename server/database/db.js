
import mongoose from "mongoose";

export const Connection = async (username, password) => {
    // const URL = `mongodb://${username}:${password}@ac-i6oeydc-shard-00-00.yemyogm.mongodb.net:27017,ac-i6oeydc-shard-00-01.yemyogm.mongodb.net:27017,ac-i6oeydc-shard-00-02.yemyogm.mongodb.net:27017/4th-project-genZ?ssl=true&replicaSet=atlas-i70bk3-shard-0&authSource=admin&retryWrites=true&w=majority`;

    const URL = `mongodb://${username}:${password}@4th-project-genz.yemyogm.mongodb.net`;



    try{
        mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Database Connected Successfully');
    } catch (error) {
        console.log('Error while connection with database', error.message);
    }
}

export default Connection;