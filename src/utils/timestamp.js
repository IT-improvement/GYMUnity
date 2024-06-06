const Timestamp = {
    convertToDate: function(timestamp) {
        return this.getDate(timestamp) + " " + this.getTime(timestamp);
    },

    getDate: function(timestamp) {
        const dateInMilSec = Date.parse(timestamp);
        const date = new Date(dateInMilSec);

        return date.toLocaleDateString();
    },
    getTime: function(timestamp) {
        const dateInMilSec = Date.parse(timestamp);
        const date = new Date(dateInMilSec);

        return date.toLocaleTimeString();
    },
};

export default Timestamp;