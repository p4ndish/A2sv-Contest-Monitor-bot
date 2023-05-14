var Codeforces = require('codeforces-api');
const { exit } = require('process');
 require('dotenv').config();

//ES2015
const key = process.env.CODE_KEY;
const s_key = process.env.SECRET_KEY;
//set API keys for authentication
Codeforces.setApis(key, s_key);

const GetRank =  (id, callback) => {
    let rank = [];    
    const title = {};

    Codeforces.contest.standings({ contestId: id } , function (err, data) {
    
        if (err) {
            console.log("Found error!");
            callback(err, null)
            return; 
        }

        // console.log(data.rows[0].party.members[0].handle);
        for(var i=0; i < 5; i++){
            let user = data.rows[i].party.members[0].handle
            // console.log(i, user);
            rank.push(user)
            // console.log(rank)

        }
        title['name'] = data.contest.name 
        callback(null, { rank, title });
});
}
    // console.log(rank)

// console.log("done",GetRank(430578))
exports.GetRank = GetRank