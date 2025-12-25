import User, { IUser } from "../../models/user.model.js";

const getUserByEmail = async (email: string): Promise<IUser | null> => {
    const user = await User.findOne({ email });
    return user;
}

export default {
    getUserByEmail,
};
