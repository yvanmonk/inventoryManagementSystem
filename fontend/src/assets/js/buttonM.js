function setVisibility(id1,id2) {
    if(document.getElementById('bt1').value=='Hide Layer'){
        document.getElementById('bt1').value = 'Show Layer';
        document.getElementById(id1).style.display = 'none';
        document.getElementById(id2).style.display = 'none';
    }else{
        document.getElementById('bt1').value = 'Hide Layer';
        document.getElementById(id1).style.display = 'inline';
        document.getElementById(id2).style.display = 'inline';
    }
}