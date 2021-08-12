const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var date = new Date();
document.getElementById("form").addEventListener("submit", (e) =>
{
    e.preventDefault();
    $( "#img").load("index.html #img");
    document.getElementById("table").style.display = "none";
    document.getElementById("error").style.display = "none";
    var city = document.getElementById("city").value;
    console.log(city);
    (async() =>
    {
        try
        {
            var data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6864edabf7def8fd425e20837e423292`).then(response => response.json());
            console.log(data);
            var img = document.createElement('img');
            img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            document.getElementById("img").appendChild(img);
           document.getElementById("date").innerText = days[date.getDay()] + " " + date.getDate() + " "+ months[date.getMonth()];
           document.getElementById("location").innerText = data.name + ", " + data.sys.country;
           var tem = KtoC(data.main.temp);
           document.getElementById("tem").innerText = tem + "°C";
           document.getElementById("cloud").innerText = data.weather[0].main;
           tem = KtoC(data.main.feels_like);
           document.getElementById("feels").innerText = tem + "°C";
           tem = KtoC(data.main.temp_max);
           document.getElementById("max").innerText = tem + "°C" + " ";
           tem = KtoC(data.main.temp_min);
           document.getElementById("min").innerText = tem + "°C";
           document.getElementById("table").style.display = "";
        }
        catch(error)
        {
            document.getElementById("error").style.display = "";
            document.getElementById("error").innerText = " Not found!";
        }
    })();
})

function KtoC(K) {
    return Math.floor(K - 273.15);
}