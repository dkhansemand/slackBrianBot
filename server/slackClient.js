'use strict';

const RtmClient = require('@slack/client').RtmClient;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
let rtm = null;
let nlp = null;


function handleOnAuthenticated(rtmStartData){
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}`);
}

function addAuthenticatedHandler(rtm, handler){
    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);
}

function handleOnMessage(message){
    //console.log(message);
    if(typeof(message.text) !== 'undefined'){
        if(message.text.toLowerCase().includes('brianbot')){
            if(message.text.toLowerCase().includes('help')){
                return rtm.sendMessage('```Help command syntax: php <function> \n\n Example: php $_POST```', message.channel);
            }
            nlp.ask(message.text, (err, res) => {
                if(err) {
                    console.log(err);
                    return;
                }
                //console.log('Error:',res);

                try{
                    if(!res.intent || !res.intent[0] || !res.intent[0].value){
                        return new Error('Could not extract intent.');
                    }

                    const intent = require('./intents/' + res.intent[0].value + 'Intent');

                    intent.process(res, (error, response) => {
                        if(error){
                            console.log(error.message);
                            return;
                        }
                        
                        return rtm.sendMessage(response, message.channel);

                    });
                }catch(err){
                    console.log(err);
                    //console.log('Error:',res.intent[0]);
                    
                    return rtm.sendMessage('Sorry, I do not know what you are talking about.', message.channel);
                }

                /*if(!res.intent){
                    return rtm.sendMessage('Sorry I do not know what you are talking about.', message.channel);
                }else if(res.intent[0].value == 'php'){
                    return rtm.sendMessage('PHP is what now?', message.channel);
                }else{
                    console.log(res);
                    return rtm.sendMessage('Sorry I do not know. Try the help command.', message.channel);
                }*/

                /*rtm.sendMessage('No results found!', message.channel, () => {
                    console.log('Message sent');
                });*/
            });
        }
    }
}

module.exports.init = (token, logLevel, nlpClient) => {
    rtm = new RtmClient(token, {logLevel: logLevel});
    nlp = nlpClient;
    addAuthenticatedHandler(rtm, handleOnAuthenticated);
    rtm.on(RTM_EVENTS.MESSAGE, handleOnMessage);
    return rtm;
}

module.exports.addAuthenticatedHandler = addAuthenticatedHandler;
