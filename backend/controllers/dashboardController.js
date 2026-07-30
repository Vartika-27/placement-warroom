const Goal = require("../models/Goal");
const User = require("../models/User");
const SolvedQuestion = require("../models/SolvedQuestion");

const getDashboard = async (req, res) => {

    try {

        const userId = req.user.userId;


        // Get user details
        const user = await User.findById(userId)
            .select("-password");


        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        // Get goals
        const totalGoals = await Goal.countDocuments({
            user: userId
        });


        const completedGoals = await Goal.countDocuments({
            user: userId,
            completed: true
        });

        const dsaSolved = await SolvedQuestion.countDocuments({
            user: userId
        });

        res.json({
            user: {
                username: user.username,
                email: user.email
            },
            stats: {
                dsaSolved: dsaSolved,
                studyHours: 0,
                streak: 0
            },
            goals: {
                total: totalGoals,
                completed: completedGoals
            }
        });


    } catch(error){

        console.error(error);

        res.status(500).json({
            message:"Dashboard error"
        });

    }

};


module.exports = {
    getDashboard
};