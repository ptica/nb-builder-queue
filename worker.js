var redis = require("redis"),
    client = redis.createClient();
const build = require("nb-builder");

client.on("error", function (err) {
    console.log("Error " + err);
});


function waitForPush () {
    client.blpop("builds", 0, function (err, reply) {
        let args = JSON.parse(reply[1]);
        build(args);
        waitForPush();
    });
}

waitForPush();

console.log('Listening for jobs on local redis instance for the "builds" key.');
