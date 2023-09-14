var start = {
    header: "Simple Quiz"
}
var Q1 = {
    header: "Question One",
    Q1: "Q1",
    Q2: "Q2",
    Ans: 1,
}
var Q2 = {
    header: "Question Two",
    Q1: "Q3",
    Q2: "Q4",
    Ans: 2,
}
var enter = {
    header: "Enter your name"
}
var highscores = {
    header: "Highscores"
}

var objList = [start, Q1, Q2, enter, highscores]


// variable initialization
var main__container = $('.main__container');
var main__header = $(".main__header");
var main__content = $(".main__content");

var clock_container = $(".clock_container");
var clock_value = $(".clock_value");
clock_value.text("clock")
var startClock;


//timer variables
var clockValue = "clock";

var currentScore = 0;

if (localStorage.getItem("list"))
{var highscoresList  = JSON.parse(localStorage.getItem("list"));}
else
{var highscoresList = [];}

var f = 0;
var values = null;

function timer() {
    if(clockValue === -1){
        clock_value.text("0")
        clockValue = "clock"
        f = 3;
        clearInterval(startClock)
        init()
    } else {
        currentScore = clockValue;
        console.log(currentScore)
        clock_value.text(clockValue)
        clockValue--;
    }
}

function init() {

    if (f === 3) {
        clearInterval(startClock)
    } else if (f === 1){
        clockValue = 10;
        startClock = setInterval(timer, 1000)
    }

    clear()

    values = Object.values(objList[f]);

    main__header.text(objList[f].header) // set header based on page we are on (objList[i])
    
    createEl()

    if (f < objList.length-1) f++
    else f = 0;
}

function checkAns(event) {

    if (f == 1){
        console.log("beginning")
    } else if (f == 2){
        if (event.target.id == "option__1"){
            correctAns()
        } else {
            incorrectAns()
        }
    } else if (f == 3){
        if (event.target.id == "option__2"){
            correctAns()
        } else {
            incorrectAns()
        }
    }


    init()
}
function correctAns() {
    //create element to display correct or incorrect
    var result = $('<span>')
    result.attr('id', 'result')
    result.text("Correct!")

    main__container.append(result) // add to document (body)

    // use a setTimeout function to have it dissapear after '1 second'
    setTimeout(function() {
        result.addClass('opacityZero')

        setTimeout(() => result.hide(), 1000)
        
    }, 400);
}
function incorrectAns() {
    //create element to display correct or incorrect
    var result = $('<span>')
    result.attr('id', 'result')
    result.text("Incorrect!")

    main__container.append(result) // add to document (body)

    // use a setTimeout function to have it dissapear after '1 second'
    setTimeout(function() {
        result.addClass('opacityZero')

        setTimeout(() => result.hide(), 1000)
        
    }, 400);
}

function clear(){
    if (f !== 0) {main__content.html("")}
    else if (f === 0){
        main__content.html("")
        var startBtn = $('<button>')
        startBtn.text("start")
        startBtn.on('click', init)

        main__content.append(startBtn)
    }
}

function hsSetup() {

    var val = $('.scoreName').val()

    clear()

    var user = {
        name: val,
        score: currentScore
    }

    // console.log(highscoresList)

    highscoresList.push(user);
    localStorage.setItem("list",JSON.stringify(highscoresList))

    var userString = JSON.stringify(user)

    localStorage.setItem("user", userString)
    highscoreInit()
}

function highscoreInit() {

    if (f !== 0) {main__content.html("")}

    values = Object.values(objList[f]);

    main__header.text(objList[f].header) // set header based on page we are on (objList[i])
    
    createEl()

    var list = JSON.parse(localStorage.getItem("list"));

    let counter = 0;
    for (i=0; i< list.length; i++){

        localStorage.removeItem("user")

        var user = $('<span>')
        user.addClass('highscore_container')
        user.data("number", counter)
        counter++;

        var name = $('<div>')
        name.text(list[i].name)

        var score = $('<div>')
        score.text(list[i].score)

        var btn = $('<button>')
        btn.text("delete")
        btn.on('click', remove_highscore)

        user.append(name)
        user.append(score)
        user.append(btn)
        main__content.append(user)
    }

    var submitBtn = $('<button>')
    submitBtn.text("restart")
    submitBtn.on('click', init)
    main__content.append(submitBtn)

    f= 0;
}


function remove_highscore(e){
    // get list from storage
    var list = JSON.parse(localStorage.getItem("list"))

    // get index
    var index = $(e.target).parent().index()
    

    if (list.length < 2) {
        list = []
        localStorage.clear()
        highscoresList = list
    } else {
        // remove item at that index
        list.splice(index, 1)
        // update local storage
        localStorage.setItem("list", JSON.stringify(list))
        highscoresList = list
    }
    

    $(e.target).parent().remove() // remove parent element of delete btn (highscore_container)from DOM
}

function createEl() {
    for (i = 1; i < values.length - 1; i++){

        var option = $('<button>')
        option.addClass("option")
        option.on('click', checkAns)
        option.attr("id", "option__" + i)

        option.text(values[i])

        main__content.append(option)
    }

    if (f === 3){
        var form = $('<input>')
        form.addClass("scoreName")
        form.placeholder = "enter your initials here"

        var submitBtn = $('<button>')
        submitBtn.text("Submit")
        submitBtn.on('click', hsSetup)

        main__content.append(form)
        main__content.append(submitBtn)
    }
}

init()
