$(document).ready(() => {

    function regionResult(r) {
        Object.entries(r).forEach(([region, count]) => {
            $(`#tableTwo`).append(`<tr>
                                        <td>${region}</td>
                                        <td>${count}</td>
                                    </tr>`);
        });
    }


    function displayCountries(country) {
        $(`#tableOne`).append(
            `<tr>
                 <td>${country.name.common}</td>
                 <td>${country.population}</td>
            </tr>`
        );
    }

 
    $('#form1').submit(function (event) {
        event.preventDefault();
        let input = $('#searchInput').val();
        let url =
            input === ''
                ? 'https://restcountries.com/v3.1/all'
                : `https://restcountries.com/v3.1/name/${input}`;

        $.ajax({
            url: url,
            type: 'GET',
            success: function (data) {
                let totalPop = 0;
                $('#totalCountriesResult').html(`Total Countries Result: ${data.length}`);
                $('#tableOne').html('');
                let r = {};
                for (let i = 0; i < data.length; i++) {
                    let country = data[i];
                    totalPop += country.population;
                    displayCountries(data[i]);
                    console.log('Region ', data[i].region);
                    if (r[country.region]) {
                        r[country.region]++;
                    } else {
                        r[country.region] = 1;
                    }
                }
                regionResult(r);
                $('#totalCountriesPopulation').html(`Total Countries Population: ${totalPop}`);
                let average = totalPop / data.length;
                $('#averagePopulation').html(`Average Population: ${average}`);
            },
            error: function (data) {
                alert(data.status);
            },
        });
    });




});