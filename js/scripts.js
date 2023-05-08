/*!
 * Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
 */
//
// Scripts
// 
async function check() {

    // api url
    const flight_api_url_by_number = "https://airlabs.co/api/v9/flight?api_key=be75f74d-7350-4da6-ab07-47fab736c1e6&flight_iata=";
    const flight_api_url_by_destination = "https://airlabs.co/api/v9/schedules?api_key=be75f74d-7350-4da6-ab07-47fab736c1e6&dep_iata=JFK&arr_iata=";
    const names_changing = "https://airlabs.co/api/v9/suggest?api_key=be75f74d-7350-4da6-ab07-47fab736c1e6&q=";


    var destination = document.getElementById("destination").value;
    var number = document.getElementById("fl_number").value;
    if (destination) {
        console.log(destination);
        async function getapi_destination_to_flight_number(url) {
            async function getnames(url) {
                // Storing response
                const response = await fetch(url);
                if (response) {
                    // Storing data in form of JSON
                    var data = await response.json();
                    console.log(data.response.airports[0].name);
                    return data.response.airports[0].name;
                }
            }
            // Storing response
            const response = await fetch(url);
            if (response) {

                // Storing data in form of JSON
                var data = await response.json();
                console.log(data.response[0]);
                // numb_flight = data.response[0].flight_iata;
                dep_iata = data.response[0].dep_iata;
                arr_iata = data.response[0].arr_iata;
                let full_dep_name = await getnames(names_changing + dep_iata);
                let full_arr_name = await getnames(names_changing + arr_iata);
                dep_time_utc = data.response[0].dep_time_utc;
                arr_time_utc = data.response[0].arr_time_utc;
                if (data.response[0].aircraft_icao) {
                    plane_model = data.response[0].aircraft_icao;
                } else {
                    plane_model = "Coming soon..."
                }
                let tab =
                    `<thead style="
                    background-color: #ffc800;
                    color: #ffffff;
                    text-align: left;
                    padding: 12px 15px;
                    ">
                    <th>Departure Airport</th>
                    <th>Departure Time</th>
                    <th>Arrival Airport</th>
                    <th>Arrival Time</th>
                    <th>Plane Model</th>
                    </thead>`;


                tab += `<tr style=" border-bottom: 1px solid #dddddd;">
                        <td style="padding: 12px 15px;">${full_dep_name} </td>
                        <td style="padding: 12px 15px;">${dep_time_utc}</td>
                        <td style="padding: 12px 15px;">${full_arr_name}</td>
                        <td style="padding: 12px 15px;">${arr_time_utc}</td>
                        <td style="padding: 12px 15px;">${plane_model}</td>		
                        </tr>`;

                // Setting innerHTML as tab variable
                document.getElementById("flight_data").innerHTML = tab;
            }
        }
        getapi_destination_to_flight_number(flight_api_url_by_destination + destination);
    }
    if (number) {
        async function getapi(url) {
            // Storing response
            const response = await fetch(url);
            if (response) {
                var data = await response.json();
                console.log(data.response);
                let full_dep_name = data.response.dep_name;
                let full_arr_name = data.response.arr_name;
                dep_time_utc = data.response.dep_time_utc;
                arr_time_utc = data.response.arr_time_utc;
                if (data.response.aircraft_icao) {
                    plane_model = data.response.aircraft_icao;
                } else {
                    plane_model = "Coming soon..."
                }
                let tab =
                    `<thead style="
                    background-color: #ffc800;
                    color: #ffffff;
                    text-align: left;
                    padding: 12px 15px;
                ">
                <th>Departure Airport</th>
                <th>Departure Time</th>
                <th>Arrival Airport</th>
                <th>Arrival Time</th>
                <th>Plane Model</th>
                </thead>`;
                tab += `<tr style=" border-bottom: 1px solid #dddddd;">
                        <td style="padding: 12px 15px;">${full_dep_name} </td>
                        <td style="padding: 12px 15px;">${dep_time_utc}</td>
                        <td style="padding: 12px 15px;">${full_arr_name}</td>
                        <td style="padding: 12px 15px;">${arr_time_utc}</td>
                        <td style="padding: 12px 15px;">${plane_model}</td>		
                        </tr>`;
                // Setting innerHTML as tab variable
                document.getElementById("flight_data").innerHTML = tab;
            }
        }
        getapi(flight_api_url_by_number + number);
    }
}

async function calculate() {
    var days_number = document.getElementById("days_number").value;
    var terminal_letter = document.getElementById("terminal_letter").value;
    let price=0;
    if(terminal_letter =="A"){
        price = 50 * days_number+"$";
    }
    if(terminal_letter =="B"){
        price = 45 * days_number+"$";
    }
    if(terminal_letter =="C"){
        price = 40 * days_number+"$";
    }
    if(terminal_letter =="D"){
        price = 30 * days_number+"$";
    }


    let tab =
    `<thead style="
    background-color: #ffc800;
    color: #ffffff;
    text-align: left;
    padding: 12px 15px;
">
<th>Days of Parking</th>
<th>Terminal of Parking</th>
<th>Total Cost</th>
</thead>`;
tab += `<tr style=" border-bottom: 1px solid #dddddd;">
        <td style="padding: 12px 15px;">${days_number} </td>
        <td style="padding: 12px 15px;">${terminal_letter}</td>
        <td style="padding: 12px 15px;">${price}</td>	
        </tr>`;
// Setting innerHTML as tab variable
document.getElementById("parking_data").innerHTML = tab;
document.getElementById("book_park").innerHTML = `<button style="background-color: #ffc800;border: 2px;
border-radius: 25px;
width: 150px;
margin: auto;" onclick="book()">Book Parking!</button>`;
}

async function book() {
    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }
    id = makeid(6);
    document.getElementById("conf_park").innerHTML = `<div style="background-color: #ffc800;border: 2px;
    border-radius: 25px;
    width: 450px;
    margin: auto;" onclick="book()">Thanks for your booking! Please use next code in the airport to confirm your Parking: ${id}</div>`;
} 


window.addEventListener('DOMContentLoaded', event => {



    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});