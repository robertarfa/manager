//abrir o modal quando clica em cada card
var onOffModal = document.querySelector('.opacity-modal')
var cards = document.querySelectorAll('.card')
 

for (let card of cards) {
    card.addEventListener("click", function(){
        const videoId = card.getAttribute('id');
       window.location.href = `/video?id=${videoId}`
    })
}



