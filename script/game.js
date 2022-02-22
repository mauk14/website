let stability =  JSON.parse(localStorage.getItem('stability'));

if(stability == null || stability == undefined || stability == "") {
    let regDates = [];
    let id = 0;
    stability = [false];
    let comDates = [];
    localStorage.setItem('comDates', JSON.stringify(comDates));
    localStorage.setItem('regDates', JSON.stringify(regDates));
    localStorage.setItem('id', id);
    localStorage.setItem('stability', JSON.stringify(stability));
    localStorage.setItem('isDiv', JSON.stringify(false));
}

if(JSON.parse(localStorage.getItem('isDiv'))) {
    $("#mainCon").append("<div class='comments'>")
    $(".comments").css({
        "display" : "grid",
        "grid-column" : "1fr",
        "grid-gap":"1em"
    })
    let comDates = JSON.parse(localStorage.getItem('comDates'));
    for(let i = 0; i<comDates.length; i++) {
        $(".comments").prepend(comDates[i])
        $(".nickname").css({
            "margin-left" : "50px",
            "font-size" : "20px"
        })
        $(".com").css({
            "margin-left" : "20px"
        })
        
    }
}

if(stability[0]) {
    let date = localStorage.getItem('regDates');
    date = JSON.parse(date);
    $("#regG").hide();
    $("#logG").hide();
    $("#logG").after("<span class='logg'>" + date[stability[1]].login);
    $(".logg").css({
        "position": "absolute",
        "bottom" : "28px",
        "left" : "250px"
    });
    $(".logg").after("<button class='btn btn-danger quit'>Quit")
    $(".quit").css({
        "position":"absolute",
        "bottom" : "23px",
        "left" : "330px"    
    })
    $(".quit").click(function(){
        $(".logg").hide();
        $(".quit").hide();
        $("#regG").show();
        $("#logG").show();
        stability = [false];
        localStorage.setItem('stability', JSON.stringify(stability))
    })
}

$("#send").click(function(){
    let dates = localStorage.getItem('regDates');
    dates = JSON.parse(dates);
    let a = $("#textAr").val();
    if (a.length > 0) {
        if(stability[0]) {
            let b = JSON.parse(localStorage.getItem('isDiv'));
            if (!b) {
                $("#mainCon").append("<div class='comments'>")
                $(".comments").css({
                    "display" : "grid",
                    "grid-column" : "1fr",
                    "grid-gap":"1em"
                })
                b = true;
                localStorage.setItem("isDiv", b)
            }
            $(".comments").prepend("<div class = 'struct reviews'>" + "<span class = 'nickname'>" + dates[stability[1]].login + "</span>" + "<br>"+ "<span class = 'com'>" + a + "</span>" +"</div>")
            $(".nickname").css({
                "margin-left" : "50px",
                "font-size" : "20px"
            })
            $(".com").css({
                "margin-left" : "20px"
            })

            let comDates = JSON.parse(localStorage.getItem('comDates'));
            comDates.push("<div class = 'struct reviews'>" + "<span class = 'nickname'>" + dates[stability[1]].login + "</span>" + "<br>"+ "<span class = 'com'>" + a + "</span>" +"</div>")
            dates[stability[1]].comments.push("<div class = 'struct reviews'>" + "<span class = 'nickname'>" + dates[stability[1]].login + "</span>" + "<br>"+ "<span class = 'com'>" + a + "</span>" +"</div>")
            localStorage.setItem('comDates', JSON.stringify(comDates));
            localStorage.setItem('regDates', JSON.stringify(dates));
        } else {
            alert("You are not login")
        }     
    }
})

$("#cancel").click(function(){
    $("#textAr").val("");
});


$("#regG").click(function(){
    $(this).hide();
    $("#logG").hide();
    $("#logG").after("<div class = 'regDiv'>");
    $(".regDiv").append("<input type='text' placeholder='login' class='inp' id='login' required>");
    $(".regDiv").append("<input type='password' placeholder='password' class='inp abs' id='pass1' required><br>");
    $(".regDiv").append("<input type='email' placeholder='email' class='inp abs' id='mail' required>");
    $(".regDiv").append("<input type='password' placeholder='retry password' class='inp' id='pass2' required>");
    $(".regDiv").append("<button id='regBut' class='btn btn-success'> Register");
    $(".chert").css({
        "position" : "absolute",
        "width":"200px",
        "left": "688px",
        "bottom" : "46px"
    });
    $(".regDiv").css({
        "position" : "absolute",
        "left" : "250px",
        "bottom" : "10px"
    })
    $(".inp").css({
        "width" : "100px",
        "height" : "25px",
        "background-color": "#1B1C21",
        "color" : "#FFF",
        "border" : "1px solid #5C5D67",
        "outline" : "none"
    })
    $("#regBut").css({
        "position" : "relative",
        "bottom" : "15px",
        "width" : "200px",
        "left" : "20px",
    })
    $(".abs").css({
        "position" : "relative",
        // "background-color": "#1B1C21"
    })
    $("#regBut").click(function(){
        let date = localStorage.getItem('regDates');
        date = JSON.parse(date);
        let id = parseInt(localStorage.getItem('id'));
        let obj = {
            id : id,
            login: $("#login").val(),
            mail : $("#mail").val(),
            pass : $("#pass1").val(),
            comments : []
        };
        let isNewLog = true;
        let isNewMail = true;
        let isDogInMail = false;
        for (let i = 0; i < date.length; i++) {
            if(obj.login == date[i].login) {
                isNewLog = false;
                break;
            }
            if(obj.mail == date[i].mail) {
                isNewMail = false;
                break;
            }
        }

        for(let i = 0; i < obj.mail.length; i++) {
            if(obj.mail[i] == '@'){ 
                isDogInMail = true;
                break;
            }    
        }


        if($("#pass1").val() != $("#pass2").val()) {
            alert("Passwords aren't similar")
        }

        else if($("#login").val().length == 0 || $("#mail").val().length == 0 || $("#pass1").val().length == 0 || $("#pass2").val().length == 0) {
            alert("Not all fields are filled")
        }
        
        else if (!isDogInMail) {
            alert("Email is not correct")
        }

        else if (!isNewLog && !isNewMail) {
            alert("These login and email are using")
        }
        else if (!isNewLog) {
            alert("This login is using")
        }
        else if (!isNewMail) {
            alert("This mail is using")
        }
        
        else {
            date.push(obj);
            // alert(date[0]);
            localStorage.setItem('regDates', JSON.stringify(date))
            
            $(".regDiv").hide();
            $("#logG").after("<span class='logg'>" + date[id].login);
            $(".logg").css({
                "position": "absolute",
                "bottom" : "30px",
                "left" : "250px"
            });
            stability = [true, id];
            localStorage.setItem('stability', JSON.stringify(stability))
            id1 = id;
            localStorage.setItem('id', ++id);
            
            $(".logg").after("<button class='btn btn-danger quit'>Quit")
            $(".quit").css({
                "position":"absolute",
                "bottom" : "23px",
                "left" : "330px"    
            })
            $(".quit").click(function(){
                $(".logg").hide();
                $(".quit").hide();
                $("#regG").show();
                $("#logG").show();
                stability = [false];
                localStorage.setItem('stability', JSON.stringify(stability))
            })
        }
    });
    
});



$("#logG").click(function(){
    $("#regG").hide();
    $("#logG").hide();
    $("#logG").after("<div class = 'logDiv'>");
    $('.logDiv').append("<button class = 'btn btn-primary' id = 'logBut'> Log In");
    $('.logDiv').append("<input type = 'text' placeholder='login or email' class='inpL' id= 'logMail'><br>");
    $('.logDiv').append("<input type = 'password' placeholder='password' class='inpL' id ='pass'>");
    $('.logDiv').css({
        "position" : "absolute",
        "left" : "400px",
        "bottom" : "13px"
    });
    $(".chert").css({
        "position" : "absolute",
        "width":"300px",
        "left": "588px",
        "bottom" : "46px"
    });
    $(".inpL").css({
        "background-color": "#1B1C21",
        "color" : "#FFF",
        "border" : "1px solid #5C5D67",
        "outline" : "none"
    });
    $("#logBut").css({
        "position" : "absolute",
        "right" : "251px",
        "width" : "150px",
        "bottom" : "12px"
    })

    let date = localStorage.getItem('regDates');
    date = JSON.parse(date);
    
    $("#logBut").click(function(){
        let isLogMail = false;
        let id;
        for (let i = 0; i < date.length; i++) {
            if($("#logMail").val() == date[i].login) {
                isLogMail = true;
                id = i;
                break;
            } else if ($("#logMail").val() == date[i].mail) {
                isLogMail = true;
                id = i;  
                break;    
            }
        }
        if ($("#logMail").val().length == 0 || $("#pass").val() == 0) {
            alert("Not all fields are filled")
        }
        else if(!isLogMail) {
            alert("Wrong login or email")
        } 
        
        else{
            if($("#pass").val() != date[id].pass) {
                alert("Wrong password")
            }
            else {
                $(".logDiv").hide();
                $("#logG").after("<span class='logg'>" + date[id].login);
                $(".logg").css({
                    "position": "absolute",
                    "bottom" : "30px",
                    "left" : "250px"
                });

                stability = [true, id];
                localStorage.setItem('stability', JSON.stringify(stability))

                $(".logg").after("<button class='btn btn-danger quit'>Quit")
                $(".quit").css({
                    "position":"absolute",
                    "bottom" : "23px",
                    "left" : "330px"    
                })
                $(".quit").click(function(){
                    $(".logg").hide();
                    $(".quit").hide();
                    $("#regG").show();
                    $("#logG").show();
                    stability = [false];
                    localStorage.setItem('stability', JSON.stringify(stability))
                })
            }
        }

    })
});
