$(document).ready(function(){
    
    function hideDeckForms(){
        $('#deck-container').removeClass('dn');
        $('#add-deck-form').addClass('dn');
        $('#delete-deck-form').addClass('dn');
    }

    function hideAllDeckForms(){
        $('#deck-container').addClass('dn');
        $('#add-deck-form').addClass('dn');
        $('#delete-deck-form').addClass('dn');
    }

    $('#add-deck-btn').on(click, async function(){
        name = $('#deck-name').val();

        try{
            method = "POST";
            await fetch('/add', name);
            if(success){
                hide
    });
















});