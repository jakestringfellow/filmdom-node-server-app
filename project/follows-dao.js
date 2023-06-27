import followsModel from "./follows-schema.js";

export const findAllFollows = () => followsModel.find();
export const findFollowById = (id) => followsModel.findById(id);

export const findFollowsByFollower = (follower) => followsModel.find({ follower }).populate("followed").exec();

export const findFollowsByFollowed = (followed) => followsModel.find({ followed }).populate("follower").exec();

export const createFollow = ({follower, followed}) => followsModel.create({follower, followed});

export const deleteFollow = ({ follower, followed}) => followsModel.deleteOne({ follower, followed });