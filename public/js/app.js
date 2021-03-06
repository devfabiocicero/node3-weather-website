
const printMessage = message => {
    const p = document.createElement('p');
    
    p.textContent = message;

    messageArea.appendChild(p);
};

const clearMessage = () => {
    messageArea.textContent = "";
};

const getWeather = location => {
    clearMessage();

    printMessage('Looking for ' + location + '...');
    
    fetch(`/weather?address=${location}`)
        .then(res => {
            res.json().then(res => {
                if (res.error) {
                    const errorMsg = res.error.toString();

                    clearMessage();
            
                    return printMessage(errorMsg);
                }

                clearMessage();

                printMessage(res.location);
                printMessage(res.forecast);
            });
        });
};

const weatherForm = document.querySelector('form');
const searchField = document.querySelector('input');
const messageArea = document.querySelector('div#message-area');

weatherForm.addEventListener('submit', ev => {
    ev.preventDefault();

    getWeather(searchField.value);
});