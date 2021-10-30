const axios = require("axios");
module.exports = {
    producer: function async(event, context) {
        console.log(event);
        try {
            const imageUrl = event["data"];
            let res = await axios.post("http://checkface.default.svc:8080", imageUrl);

            return res.data;
        } catch (error) {
            console.log(error);
        }
    },
};
