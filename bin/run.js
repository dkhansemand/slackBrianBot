'use strict';

const service = require('../server/service');
const http = require('http');
const slackClient = require('../server/slackClient');
const server = http.createServer(service);
const witToken = 'WIT_TOKEN_HERE';
const witClient = require('../server/witClient')(witToken);
const slackToken = 'SLACK_TOKEN_HERE';
const logLevel = 'verbose';



const rtm = slackClient.init(slackToken, logLevel, witClient);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => {
    server.listen(3000);
});


server.on('listening', () => {
    console.log(`BrianBot is listening on ${server.address().port} in ${service.get('env')}`);
});
