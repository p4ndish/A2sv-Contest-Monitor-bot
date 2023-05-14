var Codeforces = require('codeforces-api');
const { exit } = require('process');
 
//ES2015
const key = "5113018e97b9a6280a59efe5c6c9a7c23124da4c"
const s_key = "6c791731d921b9a4bf58552c5ae920027a53092a"
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