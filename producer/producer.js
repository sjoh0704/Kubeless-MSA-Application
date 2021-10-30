
module.exports = {
    producer: function async(event, context) {
        const axios = require("axios");
        console.log(event);
        try {
            const imageUrl = event["data"];
            axios.post("http://checkface.default.svc:8080", imageUrl)
            .then((res) => {
                console.log(res)
                return "ok"
            });

        } catch (error) {
            return 'fail'
        }

        return 'fail'
    },
};
