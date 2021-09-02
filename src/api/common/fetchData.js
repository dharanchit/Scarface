const mongoose = require('mongoose');
const orderSchema = require('../../schema/orderSchema');
const userSchema = require('../../schema/userSchema');

//Common function to fetch the desired data
const fetchDataFromDb = async() => {
    const userModal = mongoose.model('Users',userSchema);
    const orderModal = mongoose.model('Orders', orderSchema);
    const userData = await userModal.find({});
    const orderData = await orderModal.find({});
    let resultObj = {};
    userData.forEach((user) => {
        orderData.forEach((order) => {
            if(user._id === order.userId){
                if(user._id in resultObj){
                    resultObj[user._id] = {userId: user._id,name: user.name, noOfOrders: resultObj[user._id]["noOfOrders"]+=1, totalPrice: resultObj[user._id]["totalPrice"] += order.subTotal}
                } else {
                    resultObj[user._id] = {userId: user._id, name: user.name, noOfOrders: 1,totalPrice: order.subTotal}
                }
            }
        })
    });
    return resultObj;
}

const fetchAllData = async(req,res) => {
    try{
        const consolidatedDataObj = await fetchDataFromDb();
        // Appending the avg calculated value to object
        const finalObj =  Object.values(consolidatedDataObj).map((item) => ({
            ...item, "averageBillValue": parseInt(item["totalPrice"] / item["noOfOrders"])
        }));
        finalObj.forEach((item) => delete item["totalPrice"]);
        return res.status(200).send(finalObj);
    } catch(err){
        console.log(err);
        return res.status(500).send({msg: `${err}`})
    }
};

const updateUsersDB = async(req,res) => {
    try{
        const consolidatedDataObj = await fetchDataFromDb();
        const finalObj = Object.values(consolidatedDataObj);
        const userDataModal = mongoose.model('Users',userSchema);
        finalObj.forEach(async(item) => {
            await userDataModal.findByIdAndUpdate(item.userId,{noOfOrders: item["noOfOrders"]});
        })
        return res.status(200).send({success: true, message : "Successfully updated"});
    } catch(err){
        console.log(err);
        return res.status(500).send({success: false, message: `${err}`})
    }
};

module.exports = {
    fetchAllData,
    updateUsersDB
};


