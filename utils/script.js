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