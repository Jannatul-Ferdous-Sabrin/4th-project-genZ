
import { data } from "./constants/data.js";
import User from "./model/user-schema.js";

const DefaultData = async () => {
    try {
         await User.insertMany(data.users);

        console.log('Data imported successfully');

    } catch (error) {
        console.log('Error while inserting default data:', error.message);
    }
}

export default DefaultData;
