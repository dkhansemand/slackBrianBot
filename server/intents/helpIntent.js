'use strict';

module.exports.process = function process(intentData, callback){
    if(intentData.keyword[0].value.toLowerCase() !== 'help'){
        return callback(true, new Error(`Expected php intent, got ${intentData.keyword[0].value}`));
    }
    console.log('Intent out: ',intentData.intent);
    switch(intentData.keyword[0].value.toLowerCase()){
        case intentData.keyword[1].value.toLowerCase() === 'php':
            return callback(false, "PHP stands for Hypertext Preprocessor \n\n Link to documentaion: http://php.net/ :smile:");
        default:
            return callback(false, '```Help command syntax: php <function> \n\n Example: help php $_POST```');
       
    }
    
}