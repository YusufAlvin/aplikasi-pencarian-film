// const angka = [-1, 8, 9, 1, 4, -5, -4, 3, 2, 9];

// mencari angka >= 3

// FOR
// const newAngka = [];
// for(let i = 0; i <= angka.length; i++){
//     if(angka[i] >= 3){
//         newAngka.push(angka[i]);
//     }
// }
// console.log(newAngka);

// FILTER
// const newAngka = angka.filter(a => a >= 3);
// console.log(newAngka);

// MAP
// const newAngka = angka.map(a => a * 2);
// console.log(newAngka);

// REDUCE
// jumlahkan seluruh elemen pada array
// const newAngka = angka.reduce((accumulator, currentValue) => accumulator + currentValue);
// console.log(newAngka);

// METHOD CHAINING
// cari angka 5 setelah itu kalikan 3 kemudian jumlahkan hasilnya
// const hasil = angka.filter(a => a > 5)
//     .map(a => a * 3 )
//     .reduce((accumulator, currentValue) => accumulator + currentValue);
// console.log(hasil);

// ALGORITMA
// ambil semua elemen video
// const videos = Array.from(document.querySelectorAll('[data-duration]'));

// ambil hanya yang 'JAVASCRIPT LANJUTAN'
// let jsLanjutan = videos.filter(video => video.textContent.includes('JAVASCRIPT LANJUTAN'))

// ambil masing - masing durasi video
    // .map(duration => duration.dataset.duration)

// ubah durasi menjadi float, ubah menit menjadi detik 
    // .map(time => {
    //     const parts = time.split(':').map(part => parseFloat(part));
    //     return (parts[0] * 60) + parts[1];
    // })

// jumlahkan semua detiknya
    // .reduce((total, second) => total + second);

// ubah format menjadi jam menit detik
// const hour = Math.floor(jsLanjutan / 3600);
// jsLanjutan = jsLanjutan - hour * 3600;

// const minute = Math.floor(jsLanjutan / 60);
// const second = jsLanjutan - minute * 60;

// simpan di dom
// const pDuration = document.querySelector('.total-durasi');
// pDuration.textContent = `${hour} Jam ${minute} Menit ${second} Detik`;

// const jmlVideos = videos.filter(video => video.textContent.includes('JAVASCRIPT LANJUTAN')).length;
// const pVideo = document.querySelector('.jumlah-video');
// pVideo.textContent = `${jmlVideos} Video`;

$('.search-button').on('click', function(){
    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=e40fd1f6&s=' + $('.input-keyword').val(),
        success: results => {
            const movies = results.Search;
            let cards = '';
            movies.forEach(movie => {
                cards += showCards(movie); 
            });
            $('.movie-container').html(cards);
    
            // ketika tombol detail diklik
            $('.modal-detail-button').on('click', function(){
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=e40fd1f6&i=' + $(this).data('imdbid'),
                    success: movie => {
                        const movieDetail = showMovieDetail(movie);
                    $('.modal-body').html(movieDetail);
                    },
                    error: e => console.log(e.responseText)
                });
            });
        },
        error: e => console.log(e.responseText)
    });
})



function showCards(movie){
    return `<div class="col-sm-3 my-3">
    <div class="card">
        <img src="${movie.Poster}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${movie.Title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
            <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${movie.imdbID}">Detail</a>
        </div>
    </div>
</div>`;
}

function showMovieDetail(movie){
    return `<div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
            <img src="${movie.Poster}" alt="" class="img-fluid">
        </div>
        <div class="col-md">
            <ul class="list-group">
                <li class="list-group-item">${movie.Title} (${movie.Year})</li>
                <li class="list-group-item">Director : <strong>${movie.Director}</strong></li>
                <li class="list-group-item">Actor : <strong>${movie.Actors}</strong></li>
                <li class="list-group-item">Writer : <strong>${movie.Writer}</strong></li>
                <li class="list-group-item">Plot : <strong>${movie.Plot}</strong></li>
            </ul>
        </div>
    </div>
</div>`
}