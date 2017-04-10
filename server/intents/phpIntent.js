'use strict';
const docSearch = require('../php/docSearch');
module.exports.process = function process(intentData, callback){
    if(intentData.intent[0].value.toLowerCase() !== 'php'){
        return callback(true, new Error(`Expected php intent, got ${intentData.intent[0].value}`));
    }
   // console.log('Intent out: ',intentData);
    switch(intentData.intent[0].value.toLowerCase()){
        case 'php':
            if(typeof(intentData.keyword[0].value) !== 'undefined'){
                docSearch.search(intentData.keyword[0].value.toLowerCase(), (err, res)=> {
                    if(err){
                       return callback(false, res);
                    }else{
                        return callback(false, res);
                    }
                })
            }else{
                return callback(false, "PHP stands for Hypertext Preprocessor \n\n Link to documentaion: http://php.net/ :smile:");
            }
            break;
        default:
            return callback(false, 'No information found!');
            break;
       
    }
    
}