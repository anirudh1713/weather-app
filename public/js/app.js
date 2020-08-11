const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    message1.innerHTML = "Loading...";
    message2.innerHTML = "";
    if (search.value !== '') {
        fetch("/weather?address="+search.value)
            .then(response => {
                return response.json();
            }).then(data => {
                if (data.error) {
                    message1.innerHTML = data.error;
                    message2.innerHTML = "";
                    console.log(data.error);
                } else {
                    message1.innerHTML = data.location;
                    message2.innerHTML = `temp : ${data.temp}, max temp : ${data.temp_max}, min temp : ${data.temp_min}`;
                }
            }).catch(error => {
                message1.innerHTML = error;
                message2.innerHTML = "";
                console.log(error);
            });
    }
});