const form = document.getElementById("giftForm")
const giftsContainer = document.getElementById("gifts");
const giftsBody = document.getElementById("giftsBody");

async function loadGifts() {
    const response = await fetch('/gifts');
    const gifts = await response.json();
    
    giftsBody.innerHTML = '';
    gifts.forEach(gift => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${gift.name}</td><td>${gift.gift}</td>`;
        giftsBody.appendChild(row);
    });
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = form.elements.name.value;
    const gift = form.elements.gift.value;
    const password = form.elements.password.value;

    await fetch('/gifts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, gift, password })
    });

    form.reset();
    await loadGifts(); 
});

loadGifts();