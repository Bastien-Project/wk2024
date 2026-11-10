const gridItems = document.querySelectorAll('.grid-item');

const emojiOptions = ['-','💀','🙋‍♂️','🥳','😀','😢','😐','🥱','🍑🍆💦'];

function createEmojiSelector() {
    const select = document.createElement('select');
    select.classList.add('emoji-selector');
    
    // Ajoute les options d'emoji
    emojiOptions.forEach(emoji => {
        const option = document.createElement('option');
        option.value = emoji;
        option.textContent = emoji;
        select.appendChild(option);
    });
    
    return select;
}

function getCurrentDate() {
    const today = new Date();
    return today.getDate();
}

const currentDate = getCurrentDate();

gridItems.forEach(item => {
    if (parseInt(item.id) > currentDate) {
        item.style.pointerEvents = 'none';
    } else {
        const emojiSelector = createEmojiSelector();
        item.appendChild(emojiSelector);
        
        item.addEventListener('click', function() {
            emojiSelector.addEventListener('change', function() {
                console.log(`Emoji sélectionné pour la case ${item.id} : ${this.value}`);
                this.disabled = true;
                this.style.opacity = '0.5';
            });

            if (this.dataset.fullText) {
                alert(this.dataset.fullText);
            } else {
                const newText = prompt("Entrez du texte pour cette case : \n (juste - si rien de spécial à dire)" );
                if (newText) {
                    this.dataset.fullText = newText;

                    let displayText;
                    if (newText.length > 10 || newText.includes(' ')) {
                        displayText = newText.substring(0, 10) + '...';
                    } else {
                        displayText = newText;
                    }

                    const textSpan = document.createElement('span');
                    textSpan.textContent = displayText;
                    textSpan.classList.add('text-filled'); 

                    this.innerHTML = '';
                    this.appendChild(textSpan);
                    this.appendChild(emojiSelector);
                } else {
                    this.innerHTML = '';
                    this.appendChild(emojiSelector);
                }
            }
        });
    }
});
