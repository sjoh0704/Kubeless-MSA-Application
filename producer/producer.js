module.exports = {
    producer: function async(event, context) {
        const axios = require("axios");
        console.log(event);
        try {
            
            // const data = event["data"];
            const data = { userId: "1234123dsfadf", a: 0.1, b: 0.2 };
            axios.post("http://checkface.default.svc:8080", data).then((res) => {
                console.log(res);
                return "ok";
            });
        } catch (error) {
            console.log(error);
            return "fail";
        }

        return "fail";
    },
};
