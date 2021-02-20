
function saveValue(text){
    savedvalue = text;
    hiddenInput = document.getElementsByName('staffName');
    hiddenInput.forEach(element => {
        element.value = text;
    });
    filtered = text.split(",");
    const name = filtered[0].charAt(0).toUpperCase() + filtered[0].slice(1);
    const day = filtered[1].charAt(0).toUpperCase() + filtered[1].slice(1);
    title = document.getElementById('modalTitle');
    title.textContent = "Select " +name + "'s " + day + " shift.";
}


function sendEmail(node) { 
    
    domtoimage.toPng(node).then(function (dataUrl) {    
        var img = new Image();
        img.src = dataUrl;
        var emailSubject = (document.getElementById('week-title').textContent).toString(); 
        emailList = document.getElementById('emailList').value;
        console.log(emailList)
        Email.send({ 
              SecureToken: "6057518e-51be-47c4-8f4e-1ca615030a02",
              To: "bprweb@aol.com", 
              From: "brunopr.bpr@gmail.com", 
              Subject: emailSubject, 
              Body: "<h2>Roster for " + emailSubject + "</h2>", 
              Attachments : [
                {
                    "type": "image/jpg", 
                    "name": emailSubject +".jpg", 
                    "data": dataUrl
                }]
            }) 
              .then(function (message) { 
                alert(message) 
          }); 
    }).catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
} 


