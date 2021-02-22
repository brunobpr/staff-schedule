
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

