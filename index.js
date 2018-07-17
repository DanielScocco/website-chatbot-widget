"use strict";

var express = require('express');
var app = express(); 
var pg = require('pg');

//create synonyms array
var syns = [];
syns['new'] = ['recent','modern','current','latest'];
syns['classic'] = ['old'];
syns['sci-fi'] = ['science-fiction'];

app.use(express.static(__dirname + '/public'));
pg.defaults.ssl = true;

app.get('/',function(req,res) {
	if(req.query['callback']){
		var callback = req.query['callback'];
		var message = req.query['message'];
		var userId = req.query['id'];

		message = message.toLowerCase();

		//check if user in DB, if not add him
		pg.connect(process.env.DATABASE_URL, function(err,client,done){
			if(err) 
				throw err;
			else
				console.log('-----> Connected to DB');

            //function to log receive/sent messages on DB
            var logMessage = function(fromUser,userId, message){
                var d = new Date();
                var date = d.getMonth()+"/"+(d.getDate()+1)+"/"+d.getFullYear();
                var time = d.getHours()+":"+d.getMinutes();

                client.query("INSERT INTO T_MESSAGES (user_cookie,from_user,date,time,message) values($1,$2,$3,$4,$5)",[userId,fromUser,date,time,message],function(err,result){
                    if(err)
                       throw err;
                });
            };

			//function to update USER in DB
			var updateUser = function(state,fiction,classics,genre){
				client.query("UPDATE T_USERS SET state=$1,fiction=$2,classics=$3,genre=$4 WHERE cookie=$5",[state,fiction,classics,genre,userId],function(err,result){
					if(err)
						throw err;
				});
			};

            //function 
            var sendBook = function(fiction,classics,genre,state){
                var reply,queryText;

                if(state==2){
                    reply = "Here's a book you are going to love: <a href='";
                    queryText = "SELECT * from T_BOOKS WHERE fiction=$1 AND classics=$2 AND genre=$3 LIMIT 1";
                }
                else{
                    queryText = "SELECT * from T_BOOKS WHERE fiction=$1 AND classics=$2 AND genre=$3 ORDER BY id DESC LIMIT 1";
                    reply = "Here's another awesome book on this genre: <a href='";
                }
                client.query(queryText,[fiction,classics,genre],function(err,result){
                        if(err)
                            throw err;
                        reply += result.rows[0].link;
                        reply += "'>";
                        reply += result.rows[0].name;
                        reply += "</a> (Amazon link)";
                        if(state==2){
				        	res.send(req.query['callback'] + "({\"reply\":\"" + reply + "\"});"+req.query['callback'] + "({\"reply\":\"Would you like another recommendation on this genre, or would you like to start over?\"});");
                            logMessage(0,userId,reply);
                        }
                        else{
				        	res.send(req.query['callback'] + "({\"reply\":\"" + reply + "\"});");
                            logMessage(0,userId,reply);
                        }
                });
            };

			//function to add new user to db, to be nested as callback
			var addUser = function(){
				//check if user answered first question correctly
				var answer = whichOption(['fiction','non-fiction'],message);
				var state,fiction,reply;
				if(answer==0){
					state = 0;
					fiction = 0;
					reply = "Sorry, I didn't get that. Are you looking for fiction or non-fiction?";
				}
				else{
					state = 1;
					fiction = answer;
					reply = "Would you prefer a classic or a new book?";
				}

				client.query("INSERT INTO T_USERS (cookie,state,fiction) values($1,$2,$3)",[userId,state,fiction],function(err,result){
					if(err)
						throw err;
                    logMessage(1,userId,message);
                    logMessage(0,userId,reply);
				});
                    
					res.send(req.query['callback'] + "({\"reply\":\"" + reply + "\"})");
			};			

			client.query("SELECT * FROM T_USERS WHERE cookie=$1",[userId],function(err,result){
				if(err)
					throw err;
				else{
					//Found user
					if(result.rows.length > 0){
                        logMessage(1,userId,message);
						console.log('----->Found user');
						var state = result.rows[0].state;
						var fiction = result.rows[0].fiction;
						var classics = result.rows[0].classics;
						var genre = result.rows[0].genre;
						var reply;

						var options = [['fiction','non-fiction'],['classic','new'],[['teen','fantasy','suspense','sci-fi','romance'],['biography','self-help','business','success','history']],['another','start']];
						var askAgain = ["Sorry, I didn't get that. Are you looking for fiction or non-fiction?","Sorry, I didn't get that. Are you looking for a classic or new book?",["I didn't get that. Please pick a genre: Teen, Fantasy, Suspense, Sci-Fi, Romance","I didn't get that. Please pick a genre: Biography, Self-Help, Business, Success, History"],"I didn't get that. Would you like another recommendation or let's start over?"];
						var newQuestion = ["Would you prefer a classic or a new book?",["Pick a genre: Teen, Fantasy, Suspense, Sci-Fi, Romance","Pick a genre: Biography, Self-Help, Business, Success, History"],"Here's a book you are going to love!"];
						var answer;
						if(state!=2){
							answer = whichOption(options[state],message);
						}
						else{
							answer = whichOption(options[state][fiction-1],message);
						}

                        //incorrect answer
						if(answer==0){
							if(state!=2)
								reply = askAgain[state];
							else
								reply = askAgain[state][fiction-1];
					       	res.send(req.query['callback'] + "({\"reply\":\"" + reply + "\"})");
                            logMessage(0,userId,reply);
						}
                        //correct answer
						else{
							if(state==0)
								fiction = answer;
							else if(state==1)
								classics = answer;
							else if(state==2)
								genre = answer;

                            //ask about classic/new, or ask genre
                            if(state<2){
						    	reply = newQuestion[state];
						    	if(state==1)
							    	reply = reply[fiction-1];
					        	res.send(req.query['callback'] + "({\"reply\":\"" + reply + "\"})");
                                logMessage(0,userId,reply);
                            }
                           //send book recommendation
                            else if(state==2){
                                sendBook(fiction,classics,genre,state);           
                            }
                            else if(state==3){
                                if(answer==1)
                                    sendBook(fiction,classics,genre,state);
                                else{
                                    reply = "Are you looking for fiction or non-fiction?";
					            	res.send(req.query['callback'] + "({\"reply\":\"" + reply + "\"})");
                                    logMessage(0,userId,reply);
                                }        
                            }

							state++;
                            //restart
                            if(state==4)
                                state = 0;                    
							updateUser(state,fiction,classics,genre);
						}
					}
					//Didn't find user
					else{
						console.log('------>Adding user = '+userId);
						addUser();
					}
				}
			});

			done();
		});

	}
	else
		res.send('Error');
});

app.listen(process.env.PORT || 3000,function(){
	console.log('ChatServer Listening on 3000');
});

function minEditDistance(a, b){
  if(a.length == 0) return b.length;
  if(b.length == 0) return a.length;

  var matrix = [];

  // increment along the first column of each row
  var i;
  for(i = 0; i <= b.length; i++){
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for(j = 0; j <= a.length; j++){
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for(i = 1; i <= b.length; i++){
    for(j = 1; j <= a.length; j++){
      if(b.charAt(i-1) == a.charAt(j-1)){
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                Math.min(matrix[i][j-1] + 1, // insertion
                                         matrix[i-1][j] + 1)); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
}

//checks which option (all possibilities come in the array) the user meant with his sentence
function whichOption(arr,sentence){
		var n = arr.length;

        //no options provided
        if(n==0)
            return 0;

        sentence = sentence.replace("-","");
		var words = sentence.split(" ");	

		//special case with 2 options, one is substring of the other
		if(n==2){
            var isSubstring;
            if(arr[0].length<arr[1].length)
                isSubstring = arr[1].indexOf(arr[0]);
            else
                isSubstring = arr[0].indexOf(arr[1]);

            if(isSubstring!=-1){
       	    	var returnArray = [1,2];
		    	//if needed, move shorter word to first element
		    	if(arr[0].length>arr[1].length){
			    	var placeholder = arr[0];
			    	arr[0] = arr[1];
			    	arr[1] = placeholder;

			    	//changed order or words internally, but not externally, so return values must be adjusted
			    	returnArray = [2,1];
		    	}

	            var index = arr[1].indexOf(arr[0]);
                var difference;

                if(index==0)
                        difference = arr[1].substring(arr[0].length);
                else
                        difference = arr[1].substring(0,arr[1].length-arr[0].length);

                //search for longer word first
                for (let w of words){
                        if(minEditDistance(w,arr[1])<2)
                                return returnArray[1];
                }
                //search for 'difference' in sentence
                for(let w of words){
                        if(minEditDistance(w,difference)<2)
                                return returnArray[1];
                }
                //difference couldn't be found, so not word2, check for word1 now
                for(let w of words){
                        if(minEditDistance(w,arr[0])<2)
                                return returnArray[0];
                }
                //couldn't find either, return 0
                return 0;
       		 }
		}

		//general case, search word by word
		for(var i=0;i<n;i++){
            //create array with current word and its synonyms
            var stringsArray = [];
            var hadHyphen = [];
            //add main word
            if(arr[i].indexOf("-")!=-1){
                hadHyphen[0] = 1;
                stringsArray[0] = arr[i].replace("-","");
            }
            else{
                hadHyphen[0] = 0;
                stringsArray[0] = arr[i];
            }
            //add synonyms
			var synonyms = syns[arr[i]];
			if(synonyms!=null){
		        var nSyns = syns[arr[i]].length;
		        for(var k=0;k<nSyns;k++){
		            if(syns[arr[i]][k].indexOf("-")!=-1){
		                hadHyphen[k+1] = 1;
		                stringsArray[k+1] = syns[arr[i]][k].replace("-","");
		            }
		            else{
		                hadHyphen[k+1] = 0;
		                stringsArray[k+1] = syns[arr[i]][k];
		            }
		        }
			}

            //search each word
            var totalWords = stringsArray.length;
            for(var w=0;w<totalWords;w++){
    
                //if had hyphen, search for open compound
                if(hadHyphen[w]){
                    var nWords = words.length;
                    var combinedString;
                    //close each pair of words in sentence, and compare with target string
                    for(var j=0;j<(nWords-1);j++){
                        combinedString = words[j]+words[j+1];
                        if(minEditDistance(combinedString,stringsArray[w])<2)
                            return i+1;
                    }
                }
                //search normally on each word
		        for(let word of words){
			   	    if(minEditDistance(stringsArray[w],word)<2)
			    	    return i+1;
		        }
		    }
        }   

		//couldn't find a match
		return 0;
}



