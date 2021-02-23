
function saveValue(text) {
    savedvalue = text;
    hiddenInput = document.getElementsByName('staffName');
    hiddenInput.forEach(element => {
        element.value = text;
    });
    filtered = text.split(",");
    const name = filtered[0].charAt(0).toUpperCase() + filtered[0].slice(1);
    const day = filtered[1].charAt(0).toUpperCase() + filtered[1].slice(1);
    title = document.getElementById('modalTitle');
    title.textContent = day + " | " + name;
}


function sendEmail(node) {
    var messageError = "";
    domtoimage.toPng(node).then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        var emailSubject = (document.getElementById('week-title').textContent).toString();
        emailList = document.getElementById('emailList').value;
        emailList = emailList.split(",")
        delete emailList[emailList.length - 1]
        emailList.forEach(function (recipientEmail) {
            Email.send({
                SecureToken: "6057518e-51be-47c4-8f4e-1ca615030a02",
                To: recipientEmail,
                From: emailList[0],
                Subject: emailSubject,
                Body: "<h2>Roster for " + emailSubject + "</h2>",
                Attachments: [
                    {
                        "type": "image/jpg",
                        "name": emailSubject + ".jpg",
                        "data": dataUrl
                    }]
            })
                .then(function (message) {
                    if (!message.includes("OK")) {
                        messageError = message + " -> " + recipientEmail;
                        alert(messageError);
                    }
                    else {
                        console.log("Sent!")
                        messageError = "Done!"
                    }
                });
        })
    }).catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
}

function formatTime(inputSrc) {
    input = document.getElementById(inputSrc);
    value = input.value;

    if (!value.match('[0-9:]+')) {
        input.value = "";
    }else{
    if (value.length == 2) {
        input.value = value + ":00"
        hour = value.substring(0, 2);
        if (parseInt(hour) > 23) {
            input.value = "";
        } else {
            document.getElementById("alert").hidden = true;
            if (inputSrc == "startInput") {
                document.getElementById("endInput").focus();
            }
            if (inputSrc == "endInput") {
                start = parseInt(document.getElementById("startInput").value.substring(0,2));
                if (start > hour) {
                    document.getElementById("alert").hidden = false;
                    document.getElementById("alert").innerHTML = "Shift can't end before the start!"
                }
            }
        }
    }
    }
    if(value.length > 2){
        input.value = value.substring(0, 2);
    }
}

function calculateHours(){
    nodes = document.getElementsByName("hoursHolder");
    nodes.forEach(function (node){
        count = 0;
        hours = node.textContent.split(',');
        hours.forEach(function (hour){       
            if(hour.length == 5){
                start = parseInt(hour.split(' ')[0]);
                finish = parseInt(hour.split(' ')[1]);
                count = count + (finish - start);
            }
        })
        node.textContent = count.toString();
    })
    modal = document.getElementById("modalHours").getAttribute("aria-expanded");
    if(modal == "false"){
        document.location.reload();
    }
}