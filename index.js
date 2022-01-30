
//to handle data
class Friends {
    constructor(handle, problem_name, rating, purl) {
        this.handle = handle;
        this.problem_name = problem_name;
        this.rating = rating;
        this.purl = purl;
    }
}
//to display
class Display {
    add(inp) {
        let show = document.getElementById('show');
        let inpstr;
        if (inp.purl.length != 0) {
            inpstr = `<tr>
            <td>${inp.handle}</td>
            <td><a href="${inp.purl}">${inp.problem_name}</a></td>
            <td>${inp.rating}</td>
        </tr>`
        }
        else {
            inpstr = `<tr>
            <td>${inp.handle}</td>
            <td>${inp.problem_name}</td>
            <td>${inp.rating}</td>
        </tr>`
        }
        show.innerHTML += inpstr;
    }

    show() {
        var message = document.getElementById('msgaman');
        message.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Alert: </strong>API key or Secret is invalid.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;
        setTimeout(() => {
            message.innerHTML = '';
        }, 4000);
    }
    show1() {
        var message = document.getElementById('msgaman');
        message.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Alert: </strong>API key and Secret submitted successfully. Results are being fetched.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;
        setTimeout(() => {
            message.innerHTML = '';
        }, 4000);
    }
}


function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

var submit_time;
function epoch(date) {
    return Date.parse(date)
}
var dateToday = new Date();
var time = epoch(dateToday) / 1000;

Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});
document.getElementById('todaydate').value = new Date().toDateInputValue();

var probnum;
function submission(arr, i) {
    var url = "https://codeforces.com/api/user.status?handle=" + arr[i] + "&from=1&count=" + probnum;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var ar = data.result;
            var pName = [];
            var pid = [];
            var pindex = [];
            for (var j = 0; j < ar.length; j++) {
                if (ar[j].creationTimeSeconds >= submit_time) {
                    pName.push(ar[j].problem.name);
                    pid.push(ar[j].contestId + "/problem/" + ar[j].problem.index);
                    console.log(j + ar[j].problem.rating);
                    pindex.push(ar[j].problem.rating);
                }
            }
            if (pid.length == 0) {
                let inp = new Friends(arr[i], "No submissions for this user in the selected date range.", "Not_Valid", "");
                let display = new Display();
                display.add(inp);
            }
            else {
                pName = pName.filter(onlyUnique);
                pid = pid.filter(onlyUnique);
                pindex = pindex.filter(onlyUnique);
                for (var j = 0; j < pid.length; j++) {
                    var purl = "https://codeforces.com/contest/" + pid[j];
                    var rate = pindex[j];
                    if (pindex[j] == undefined)
                        rate = "API didn't responded for rating of this problem.";
                    let inp = new Friends(arr[i], pName[j], rate, purl);
                    let display = new Display();
                    display.add(inp);
                }
            }
        })
}


import { SHA512 } from "./sha512_hash.js"


let yo = document.getElementById('friends');
yo.addEventListener('submit', calling);
var number;

function calling(e) {
    var APIkey = document.getElementById("ak").value;
    var secret = document.getElementById("skey").value;
    var code = "936854/user.friends?apiKey=" + APIkey + "&onlyOnline=false&time=" + time + "#" + secret;
    code = SHA512(code);
    var base_url = "https://codeforces.com/api/user.friends?apiKey=" + APIkey + "&onlyOnline=false&time=" + time + "&apiSig=936854" + code;
    number = document.getElementById("num").value;
    probnum = document.getElementById("probnum").value;
    var x = document.getElementById("todaydate").value;
    var dd = x.substring(8, 10);
    var mm = x.substring(5, 7);
    var yyyy = x.substring(0, 4);
    var d = new Date(yyyy, mm - 1, dd, 0, 0, 0, 0);
    submit_time = d / 1000;
    getdata(base_url);
    e.preventDefault();
}
function callme(arr) {
    for (var i = 0; i < Math.min(arr.length, number); i++) {
        setTimeout(submission, 2005 * (i), arr, i);
    }
}


function getdata(base_url) {
    fetch(base_url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.status == "OK") {
                var display = new Display();
                display.show1();
                callme(data.result);
            }
            else {
                var display = new Display();
                display.show();
            }
        })
}

