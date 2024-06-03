const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherBoxDetails = document.querySelector('.weather-details');
const error = document.querySelector('.not-found');

search.addEventListener('click', () =>{

    const apiKey = 'adcb74b24af1c98e7c1eea8a429a1566';
    const city = document.querySelector('.search-box input').value;

    if(city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`).then(Response => Response.json()) .then(json => {

        if(json.cod === '404'){
            container.style.height = '800px';
            weatherBox.style.display = 'none';
            weatherBoxDetails.style.display = 'none';
            error.style.display = 'block';
            error.classList.add('fadeIn');
            return;
        }
        

            error.style.display = 'none';
            error.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            // Obter a hora atual
            var currentTime = new Date().getHours();

            // Determinar se é dia ou noite
            var isNight = (currentTime >= 19 || currentTime < 6); // A noite é das 19h às 6h

            // Mostrar a imagem apropriada com base no período do dia
            if (isNight) {
                // É noite, mostra a lua
                image.src = 'assets/clear-gif.gif';
            } else {
                // É dia, mostra o sol
                image.src = 'assets/clear-gif.gif';
            }

            switch (json.weather[0].main){

                case 'Rain':
                    image.src = 'assets/rain.png'
                    break;
                case 'Clouds':
                    image.src = 'assets/clouds.png'
                    break;
                case 'Mist':
                    image.src = 'assets/thunder.png'
                    break;
                case 'Clear':
                                if (isNight) {
                // É noite, mostra a lua
                image.src = 'assets/clear-gif.gif';
                } else {
                // É dia, mostra o sol
                image.src = 'assets/clear-gif.gif';
                }
                    break;
                case 'Snow':
                    image.src = 'assets/snow.png'
                    break;
                    
                default:
                    image.src = '';

            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${json.wind.speed}km/h`

            weatherBox.style.display = '';
            weatherBoxDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherBoxDetails.classList.add('fadeIn');
            container.style.height = '700px';



    });

});