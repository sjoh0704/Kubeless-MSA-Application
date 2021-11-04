module.exports = {
    producer: function async(event, context) {
        const axios = require("axios");
        console.log(event);
        try {
            userId = envent["userId"];
            const imageUrl = event["data"];
            data = {
                userId: userId,
                imageUrl: imageUrl,
            };
            axios.post("http://checkface.default.svc:8080", data).then((res) => {
                console.log(res);
                return "ok";
            });
        } catch (error) {
            return "fail";
        }

        return "fail";
    },
};
