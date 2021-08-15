<!-- Initialize Swiper -->
let swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    // centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

// loading
window.addEventListener('load',function (){
    const loading = document.querySelector('.loading');
    loading.classList.add('hidden')
})

const covidRow = document.querySelector('.covidRow');
const volunteers = document.querySelector('.volunteers');
const latestUpdate = document.querySelector('.latestUpdate');
const dataD = document.getElementById('data');
const dataFetch = _ => {
    fetch('api/data.json')
        .then(res => res.json())
        .then(data => {
            exportAPI(data)
        })
}
dataFetch();

const exportAPI = (data) => {
    console.log(data)

    // latest date
    latestUpdate.innerHTML +=`${data.Global.LatestDate}`

    // status
    covidRow.innerHTML +=`
            <div class="col-6 col-lg-3 col-xl-2">
                <div class="card text-warning rounded-4 shadow">
                    <div class="card-body">
                        <i class="fas fa-virus"></i>
                        <h2 class="mb-0 fw-bold">${data.Global.TotalConfirmed}</h2>
                        <p class="card-text">Total Confirmed</p>
                    </div>
                </div>
            </div>
        `
    covidRow.innerHTML +=`
            <div class="col-6 col-lg-3 col-xl-2">
                <div class="card rounded-4 shadow">
                    <div class="card-body">
                        <i class="fas fa-virus"></i>
                        <h2 class="mb-0 fw-bold">${data.Global.NewConfirmed}</h2>
                        <p class="card-text">New Confirmed</p>
                    </div>
                </div>
            </div>
        `
    covidRow.innerHTML +=`
            <div class="col-6 col-lg-3 col-xl-2">
                <div class="card text-success rounded-4 shadow">
                    <div class="card-body">
                        <i class="fas fa-virus"></i>
                        <h2 class="mb-0 fw-bold">${data.Global.TotalRecovered}</h2>
                        <p class="card-text">Total Recovered</p>
                    </div>
                </div>
            </div>
        `
    covidRow.innerHTML +=`
            <div class="col-6 col-lg-3 col-xl-2">
                <div class="card rounded-4 shadow">
                    <div class="card-body">
                        <i class="fas fa-virus"></i>
                        <h2 class="mb-0 fw-bold">${data.Global.NewRecovered}</h2>
                        <p class="card-text">NewRecovered</p>
                    </div>
                </div>
            </div>
        `
    covidRow.innerHTML +=`
            <div class="col-6 col-lg-3 col-xl-2">
                <div class="card text-danger rounded-4 shadow">
                    <div class="card-body">
                        <i class="fas fa-virus"></i>
                        <h2 class="mb-0 fw-bold">${data.Global.TotalDeaths}</h2>
                        <p class="card-text">Total Death${data.Global.TotalDeaths > 1 ? 's' : ''}</p>
                    </div>
                </div>
            </div>
        `
    covidRow.innerHTML +=`
            <div class="col-6 col-lg-3 col-xl-2">
                <div class="card rounded-4 shadow">
                    <div class="card-body">
                        <i class="fas fa-virus"></i>
                        <h2 class="mb-0 fw-bold">${data.Global.NewDeaths}</h2>
                        <p class="card-text">New Death${data.Global.NewDeaths > 1 ? 's' : ''}</p>
                    </div>
                </div>
            </div>
        `

    // donation volunteers
    data.Donations.map(list => {
        volunteers.innerHTML +=`
            <div class="col-lg-6 col-xl-4">
                <div class="card rounded-4 shadow-sm">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-4">
                                <img src="${list.image}" class="img-fluid rounded-4 shadow" alt="...">
                            </div>
                            <div class="col-8">
                                <div class="card-body p-0">
                                    <h5 class="card-title fw-bold">${list.name}</h5>
                                    <a href="tel:${list.phone}" class="link-primary text-decoration-none">${list.phone}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
    })

    // duty volunteers
    data.Volunteers.map(list => {
        dataD.innerHTML +=`
                <tr>
                    <td>${list.id}</td>
                    <td>${list.name}</td>
                    <td><a class="text-decoration-none text-black-50" href="${list.phone}">${list.phone}</a></td>
                    <td>${list.duty}</td>
                </tr>
            `
    })

}

