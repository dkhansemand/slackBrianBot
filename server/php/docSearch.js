'use strict';
const jsdom = require('jsdom');
const striptags = require('striptags');
let html = null;

function getElements(file, callback){
    jsdom.env({
        file: file,
        done: function (err, window) {
            if(err){
                console.log('Search Error: ',err);
                return callback(true, err);
            }
            global.window = window;
            global.document = window.document;
            var examples = document.getElementsByClassName("example");
            var data = [];
            Array.from(examples).forEach(function(element) {
                html = element.innerHTML.replace(/&nbsp;/g, ' ');
                data.push(striptags(html, '<br>', '').replace(/<br>/g, '\n'));
            }, this);
            /*var html = document.getElementsByClassName("example")[0].innerHTML.replace(/&nbsp;/g, ' ');
            var data = striptags(html, '<br>', '').replace(/<br>/g, '\n');*/
            return callback(false, data.join('\n'));
        }
    });
}

module.exports.search = function search(keyword, callback){
    switch(keyword){
        case 'pdo':
            return callback(false, 'PDO is awesome! :+1:');
            break;
        case 'pdo connection':
             getElements('./server/php/docs/pdo.connections.html', (err, elem) => {
                    if(err){
                       return callback(true, elem);
                    }
                     return callback(false, elem);
                });
        break;
        case 'mysqli':
            return callback(false, 'really? Try PDO instead of that function.');
            break;
        case 'array':
                getElements('./server/php/docs/function.array.html', (err, elem) => {
                    if(err){
                       return callback(true, elem);
                    }
                     return callback(false, elem);
                });
            break;
        default:
        console.log(keyword);
            return callback(true, 'I was not able to find any documentaion on that. \n Please try another keyword.');
            break;
    }
}
