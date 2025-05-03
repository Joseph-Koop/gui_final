//script.js

export var index = 0;

export function setIndex(index0){
    index = index0;
}

export function reset(){
    if(cards.length == 0 || index >= cards.length || index < 0){
        $('#main-card p').html('No cards available').css('border', '0px');    
        return;
    }
    $('#main-card p').html(`${cards[index].question}`).css('border', '0px');
}

export function hideDeckForms(){
    $('#deck-container').removeClass('dn');
    $('#add-deck-form').addClass('dn');
    $('#delete-deck-form').addClass('dn');
    
    $('#error-message').text('').addClass('dn');
    $('.form-message').text('').addClass('dn');

    reset();
}

export function hideForms(){
    $('#card-container').removeClass('dn');
    $('#add-card-form').addClass('dn');
    $('#edit-card-form').addClass('dn');
    $('#delete-card-form').addClass('dn');
    
    $('#error-message').text('').addClass('dn');
    $('.form-message').text('').addClass('dn');

    reset();
}

$(document).ready( function(){
    lucide.createIcons();
    
    let isRunning = false;

    function shuffle(){
        for(let i = cards.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
    }

    function toggleMenu(){
        $('#deck-sidebar').addClass('dn').removeClass('active');
        $('#expand-deck-btn').text('<<');

        $('#card-sidebar').toggleClass('dn').toggleClass('active');
        if($('#expand-btn').text() == '>>'){
            $('#expand-btn').text('<<');
        }else{
            $('#expand-btn').text('>>');
        }
    }

    function toggleDeckMenu(){
        $('#card-sidebar').addClass('dn').removeClass('active');
        $('#expand-btn').text('>>');

        $('#deck-sidebar').toggleClass('dn').toggleClass('active');
        if($('#expand-deck-btn').text() == '<<'){
            $('#expand-deck-btn').text('>>');
        }else{
            $('#expand-deck-btn').text('<<');
        }
    }

    function moveForward(){
        if(index < cards.length - 1){
            index++;
            reset();

            $('#main-card').removeClass('slide-right slide-left flip').find('p').removeClass('text-flip');
            void $('#main-card')[0].offsetWidth;
            $('#main-card').addClass('slide-right');

        }else if(window.location.pathname.includes('/quiz')){
            $('#answer-button').prop('disabled', true);
            $('#success-message').removeClass('dn').text('Quiz Complete!');
        }
        isRunning = false;

    }

    function flipCard(){
        if(cards.length == 0 || index >= cards.length || index < 0){
            $('#main-card p').html('No card to flip.').css('border', '0px');
            return;    
        }

        $('#main-card').removeClass('flip slide-left slide-right').find('p').removeClass('text-flip');
        void $('#main-card')[0].offsetWidth;
        $('#main-card').addClass('flip').find('p').addClass('text-flip');

        setTimeout(() => {
            console.log(cards[index].question, $('#main-card p').text().trim());
            if(cards[index].question == $('#main-card p').text().trim()){
                $('#main-card p').html(`${cards[index].answer}`).css('border', '5px solid yellow');
            }else if(cards[index].answer == $('#main-card p').text().trim()){
                reset();
            }else{
                console.log("Error occurred: match not found.");
            }
        }, 250);
    }

    function hideAllForms(){
        $('#card-container').addClass('dn');
        $('#add-card-form').addClass('dn');
        $('#edit-card-form').addClass('dn');
        $('#delete-card-form').addClass('dn');
        
        $('#error-message').text('').addClass('dn');
        $('.form-message').text('').addClass('dn');
    }

    $('#answer-button').on('click', function(){
        if($('#answer-attempt').val().trim() == ''){
            isRunning = false;
            return;
        }
        if(isRunning == true){
            return;
        }
        isRunning = true;

        flipCard();
        setTimeout(() => {
            if($('#answer-attempt').val().toLowerCase() == cards[index].answer.toLowerCase()){
                let current = parseInt($('#correct-score').text(), 10);
                $('#correct-score').text(current + 1);
            }
            let total = parseInt($('#total-score').text(), 10);
            $('#total-score').text(total + 1);
            $('#answer-attempt').val('');
            moveForward();                  //Rewrite function in here
        }, 1000);
    });

    $('#answer-attempt').on('keydown', function(event){
        if(event.key == 'Enter') {
            if($('#answer-button').prop('disabled')) return;
            $('#answer-button').click();
        }
    });

    $('.trigger').on('click', function(){
        flipCard();
    });

    $('#expand-btn').on('click', function(){
        toggleMenu();
    });

    $('#expand-deck-btn').on('click', function(){
        toggleDeckMenu();
    });
        
    $('#move-forward').on('click', function(){
        moveForward();
    });
        
    $('#move-back').on('click', function(){
        if((index - 1) >= 0){
            index--;
            reset();

            $('#main-card').removeClass('slide-right slide-left');
            void $('#main-card')[0].offsetWidth;
            $('#main-card').addClass('slide-left');
        }
    });
        
    $('#move-end').on('click', function(){
        if(index != cards.length - 1){
            index = cards.length - 1;
            reset();

            $('#main-card').removeClass('slide-right slide-left');
            void $('#main-card')[0].offsetWidth;
            $('#main-card').addClass('slide-right');
        }  
    });
        
    $('#move-start').on('click', function(){
        if(index != 0){
            index = 0;
            reset();

            $('#main-card').removeClass('slide-right slide-left');
            void $('#main-card')[0].offsetWidth;
            $('#main-card').addClass('slide-left');
        }
    });
        
    $('#restart').on('click', function(){
        $('#answer-attempt').val('');
        shuffle();
        index = 0;
        reset();
        $('#correct-score').text(0);
        $('#total-score').text(0);
        
        $('#answer-button').prop('disabled', false);
        $('#success-message').addClass('dn').text('');
    });
        
    $('#shuffle').on('click', function(){
        shuffle();
        index = 0;
        reset();
    });

    $('#card-sidebar ul').on('click', '.card-list', function(){
        index = cards.findIndex(card => card.question == $(this).data('name'));
        hideForms();
        toggleMenu();
        reset();
    });

    $('.deck-list').on('click', function(){
        let id = $(this).data('id');
        window.location.href = `/decks/${id}`;
    });

    $('#add-card').on('click', function(){
        hideAllForms();
        $('#add-card-form').removeClass('dn');
    });

    $('#edit-card').on('click', function(){
        hideAllForms();
        $('#edit-card-form').removeClass('dn');
        $('#edit-card-id').val(cards[index].id);
        $('#edit-card-question').val(cards[index].question);
        $('#edit-card-answer').val(cards[index].answer);
    });

    $('#delete-card').on('click', function(){
        hideAllForms();
        $('#delete-card-form').removeClass('dn');
        $('#delete-card-id').val(cards[index].id);
    });

    $('.cancel-btn').on('click', function(){
        hideForms();
    });

    $('#add-submit-btn').on('click', function(){
        hideForms();
    });

    $('#edit-submit-btn').on('click', function(){
        hideForms();
    });

    $('#delete-submit-btn').on('click', function(){
        hideForms();
    });

    $('.mode-option').on('click', function(){
        window.location.href = $(this).data('href');
    });



    



    function hideAllDeckForms(){
        $('#deck-container').addClass('dn');
        $('#add-deck-form').addClass('dn');
        $('#delete-deck-form').addClass('dn');
        
        $('#error-message').text('').addClass('dn');
    }

    $('.deck-cancel-btn').on('click', function(){
        hideDeckForms();
    });

    $('#add-deck').on('click', function(){
        hideAllDeckForms();
        $('#add-deck-form').removeClass('dn');
    });

    $('#delete-deck').on('click', function(){
        hideAllDeckForms();
        $('#delete-deck-form').removeClass('dn');
    });
});

