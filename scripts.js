/*
*
*
*Logic:
* //1) extract 'start time' value from input
*
* //2) onclicking 'submit start time' button
* replace 'remaining time' with 'start time'
*
* //3) start count down function which:
* - decrements 'remaining time'
* - replaces html in 'remaining time'
* - stops if at 'remainging time' is zero
*
*
* Future features:
* //pause button
* //reward action
* //keep track of rewards received
* play sound
* circular progress bar
* better animations
*
*/

//use a div node to display the received rewards and a forEach loop
//to add images of height 360px
var buttons = document.getElementsByTagName('button');

var gtime = parseInt(document.getElementsByName("seconds")[0].value);
var startTime = gtime;
var countDown;
pomodoro = {
    rewards : [],
    setTime : function() {
        this.replaceRewardWithCards();

        hours = parseInt(document.getElementsByName("hours")[0].value)*60*60;
        minutes = parseInt(document.getElementsByName("minutes")[0].value)*60;
        seconds = parseInt(document.getElementsByName("seconds")[0].value);
        gtime = hours + minutes + seconds;
        startTime = gtime;
        this.countingDown();
    },

    decreaseTime : function() {
        gtime--;

        //this.setTime();
        var seconds = 0;
        var minutes = 0;
        var hours = 0;
        var time = gtime;

        if (time>=60*60) {
            hours = Math.floor(time/(3600));
            time -= hours*3600;
        }
        if (time>=60) {
            minutes = Math.floor(time/60);
            time -= minutes*60;
        }
        seconds = time;
        document.getElementsByName("seconds")[0].value = seconds;
        document.getElementsByName("minutes")[0].value = minutes;
        document.getElementsByName("hours")[0].value = hours;

        //drawCircle(time);

        if (gtime < 0) {
            //clearInterval(countDown);
            pomodoro.stopTime();
            //alert("Time's Up!");
            pomodoro.addReward();
            document.getElementsByName("seconds")[0].value = startTime;

        }

        //gtime--;
    },



    countingDown : function() {
        if (gtime > 0) {
            countDown = setInterval(pomodoro.decreaseTime, 1000);
        }

        //disable start & resume buttons
        buttons[0].disabled = true;
        //buttons[1].disabled = true;
        //enable pause
        buttons[1].disabled = false;
        //document.getElementsByName("seconds")[0].style.borderColor = "#000";
        Array.from(document.getElementsByTagName("input")).forEach(function(e) {
          e

          e.style.borderColor = "#000";
            e.style.fontSize = "4rem";
        })
    },
    stopTime : function() {
        clearInterval(countDown);

        var alarm = new Audio("https://www.dropbox.com/s/ly81dwe3ehvpwzk/gotAlarm.mp3");
        alarm.play();
        //enable start & resume buttons
        buttons[0].disabled = false;
        //buttons[1].disabled = false;
        //disable pause
        buttons[1].disabled = true;

        //document.getElementsByName("seconds")[0].
        //document.getElementsByName("seconds")[0].style.borderColor = "#1986d6";
        Array.from(document.getElementsByTagName("input")).forEach(function(e) {
            // e.style.borderColor = "#1986d6";
            e.style.fontSize = "2rem";

        })

    },
    addReward : function() {
        var houses = ['Targaryan', 'Stark', 'NightsWatch', 'Tyrell', 'Lannister', 'Baratheon', 'LordOfLight', 'Bolton', 'Martell', 'Greyjoy', 'Mormont'];
        // var pngs = ['Baratheon.jpeg', 'Lannister.png', 'Mormont.jpeg', 'Targaryan.png',
        //         'Bolton.jpeg', 'LordOfLight.png', 'NightsWatch.png', 'Tyrell.png',
        //         'Greyjoy.png', 'Martell.jpeg', 'Stark.png'];

        index = this.rewards.length % houses.length;
        var img = document.createElement("img");

        img.src = 'https://raw.githubusercontent.com/tennispro1213/pomodoro/master/images/rewards/' + houses[index] + '.jpg';
        //img.src = 'images/pngs/' + pngs[index];

        img.style = 'padding:0.5em';
        img.height = 480;
        // if (this.rewards.length > 2) {
        //     img.height = 300;
        // }
        this.rewards.push(img);

        rewardNode = document.getElementById("reward");
        rewardNode.appendChild(img);
        // if (rewardNode.hasChildNodes()) {
        //     rewardNode.appendChild(img);
        // }
        // else {
        //     rewardNode.appendChild(img);
        // }



        document.getElementById("cards").setAttribute("style", "display:none")
        // document.getElementById("cards").childNodes.forEach(function(element) {
        //     element.remove();
        // });


        var alarm = new Audio("https://github.com/tennispro1213/pomodoro/raw/master/audio/gotAlarm.mp3");
        alarm.play();
    },

    replaceRewardWithCards : function() {
        rewardNode = document.getElementById("reward");
        if (rewardNode.hasChildNodes()) {
            rewardNode.childNodes[0].remove();
            //rewardNode.appendChild(img);
        }
        document.getElementById("cards").setAttribute("style", "display:block")
        pomodoro.rewards.forEach(function(element) {
            element.setAttribute("height", "180")
            document.getElementById("cards").appendChild(element);
        })

        console.log("I work");

    }
}

// function drawCircle(timeLeft) {
//   var canvas = document.getElementById('canvas');
//     var ctx = canvas.getContext('2d');
//         ctx.beginPath();
//         var x = 25+50; // x coordinate
//         var y = 25+50; // y coordinate
//         var radius = 20; // Arc radius
//         var startAngle = 0; // Starting point on circle
//         var endAngle = timeLeft*Math.PI; // End point on circle
//         var anticlockwise = true; // clockwise or anticlockwise

//         ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
//         ctx.fill();
// }

// if (pomodoro.countingDown && gtime > 0) {
//     pomodoro.decreaseTime();
// }

