document.getElementById('submitbtn').addEventListener('click', async () =>{
    const text = document.getElementById('text').value;
    const status = document.getElementById('status');

    if(!text.trim()){
    status.textContent = 'Please enter something. :)';
    return;
}

try{
    const res = await fetch('http://192.168.0.228:3000/submit',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({ text })
    });
    
    const data = await res.json();
    if(data.success){
        status.textContent = 'Submitted successfully!';
    }
    else{
        status.textContent = 'Error: ' + (data.error || 'Unknown error');
    }
}
    catch (err){
        status.textContent = 'Request failed: ' + err.message
    }
})





