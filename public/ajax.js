import { index, setIndex, reset, hideDeckForms, hideForms } from "./script.js"

$(document).ready(function(){

    $('#delete-card-btn').on('click', async function(){
        const id = $('#delete-card-id').val();

        try{
            const method = "DELETE";
            const res = await fetch('/decks/delete', { 
                method: method, 
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ id }),
            });

            const data = await res.json();

            if(data.err){
                $('#success-message').text('').addClass('dn');
                $('#delete-deck-form .form-message').text(data.err).removeClass('dn');
                return;
            }

            if(!data.card){
                throw new Error(data.err) || 'An unexpected error occured.';
            }

            hideForms();

            $('#success-message').text(data.res).removeClass('dn');
            $('#delete-deck-form .form-message').text('').addClass('dn');
            $('#error-message').text('').addClass('dn');

            let deleteIndex = cards.findIndex(card => card.id == data.card.id);
            cards.splice(deleteIndex, 1);
            if(cards.length == deleteIndex){
                if(cards.length > 0){
                    setIndex(index - 1);
                }else{
                    setIndex(0);
                }
            }

            $('#card-option-' + data.card.id).remove();
            reset();
        }catch(err){
            $('#success-message').text('').addClass('dn');
            $('#error-message').text(err.message || 'An error occured.').removeClass('dn');
        }
    });

    $('#add-card-btn').on('click', async function(){
        const question = $('#add-card-question').val();
        const answer = $('#add-card-answer').val();
        const deckId = $('#add-deck-id').val();

        try{
            const method = "POST";
            const res = await fetch('/decks/add', { 
                method: method, 
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ question, answer, deckId }),
            });

            const data = await res.json();

            if(data.err){
                $('#success-message').text('').addClass('dn');
                $('#add-card-form #form-message').text(data.err).removeClass('dn');
                return;
            }

            if(!data.card){
                throw new Error(data.err) || 'An unexpected error occured.';
            }

            hideForms();

            $('#success-message').text(data.res).removeClass('dn');
            $('#add-card-form .form-message').text('').addClass('dn');
            $('#error-message').text('').addClass('dn');
            $('#card-question').val('');
            $('#card-answer').val('');

            cards.push(data.card);
            let newOption = `<li id="card-option-${data.card.id}" data-name="${data.card.question}" class="card-list"><p class="di">${data.card.question}</p><p class="di">${data.card.answer}</p></li>`
            $('#card-sidebar ul').append(newOption);

            setIndex(0);
            reset();
        }catch(err){
            $('#success-message').text('').addClass('dn');
            $('#error-message').text(err.message || 'An error occured.').removeClass('dn');
        }
    });

    $('#edit-card-btn').on('click', async function(){
        const question = $('#edit-card-question').val();
        const answer = $('#edit-card-answer').val();
        const id = $('#edit-card-id').val();

        try{
            const method = "PUT";
            const res = await fetch('/decks/edit', { 
                method: method, 
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ question, answer, id }),
            });

            const data = await res.json();

            if(data.err){
                $('#success-message').text('').addClass('dn');
                $('#edit-card-form .form-message').text(data.err).removeClass('dn');
                return;
            }

            if(!data.card){
                throw new Error(data.err) || 'An unexpected error occured.';
            }

            hideForms();

            $('#success-message').text(data.res).removeClass('dn');
            $('#edit-card-form .form-message').text('').addClass('dn');
            $('#error-message').text('').addClass('dn');
            $('#card-question').val('');
            $('#card-answer').val('');

            let editIndex = cards.findIndex(card => card.id == data.card.id);
            cards[editIndex].question = data.card.question;
            cards[editIndex].answer = data.card.answer;
            cards[editIndex].id = data.card.id;

            $('#card-option-' + data.card.id).replaceWith(`<li id="card-option-${data.card.id}" data-name="${data.card.question}" class="card-list"><p class="di">${data.card.question}</p><p class="di">${data.card.answer}</p></li>`);
            reset();
        }catch(err){
            $('#success-message').text('').addClass('dn');
            $('#error-message').text(err.message || 'An error occured.').removeClass('dn');
        }
    });

    $('#delete-deck-btn').on('click', async function(){
        const id = $('#delete-deck-id').val();

        try{
            const method = "DELETE";
            const res = await fetch('/delete', { 
                method: method, 
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ id }),
            });

            const data = await res.json();

            if(data.err){
                $('#success-message').text('').addClass('dn');
                $('#delete-deck-form .form-message').text(data.err).removeClass('dn');
                return;
            }

            if(!data.deck){
                throw new Error(data.err) || 'An unexpected error occured.';
            }

            hideDeckForms();

            $('#success-message').text(data.res).removeClass('dn');
            $('#delete-deck-form .form-message').text('').addClass('dn');
            $('#error-message').text('').addClass('dn');

            $('#deck-' + data.deck.id).remove();
            $('#deck-option-' + data.deck.id).remove();

            reset();
        }catch(err){
            $('#success-message').text('').addClass('dn');
            $('#error-message').text(err.message || 'An error occured.').removeClass('dn');
        }
    });

    $('#add-deck-btn').on('click', async function(){
        const name = $('#add-deck-name').val();

        try{
            const method = "POST";
            const res = await fetch('/add', { 
                method: method, 
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ name }),
            });

            const data = await res.json();

            if(data.err){
                $('#success-message').text('').addClass('dn');
                $('#add-deck-form .form-message').text(data.err).removeClass('dn');
                return;
            }

            if(!data.deck){
                throw new Error(data.err) || 'An unexpected error occured.';
            }

            hideDeckForms();

            $('#success-message').text(data.res).removeClass('dn');
            $('#add-deck-form .form-message').text('').addClass('dn');
            $('#error-message').text('').addClass('dn');
            $('#add-deck-name').val('');

            newDeck = `<li class="p1">
                            <a href="/decks/${data.deck.id}">
                                <div class="deck">
                                    <p>${data.deck.name}</p>
                                </div>
                            </a>
                        </li>`;
            newOption = `<option id="deck-option-${data.deck.id}" value="${data.deck.id}">${data.deck.name}</option>`
            $('#deck-block-list').append(newDeck);
            $('#delete-deck-id').append(newOption);
        }catch(err){
            $('#success-message').text('').addClass('dn');
            $('#error-message').text(err.message || 'An error occured.').removeClass('dn');
        }
    });
});