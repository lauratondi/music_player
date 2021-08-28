let tracks = [
  {
    url: './audio/Bang Bang (My Baby Shot Me Down) - Nancy Sinatra.mp3',
    cover: './cover/cover -1.jpeg',
    artist: 'Nancy Sinatra',
    title: 'Bang Bang (My Baby Shot Me Down)',
  },
  {
    url: './audio/Billie Jean - Michale Jackson.mp3',
    cover: './cover/cover -2.jpeg',
    artist: 'Michale Jackson',
    title: 'Billie Jean',
  },

  {
    url: './audio/Loving You, Baby - Charles Bradley.mp3',
    cover: './cover/cover -3.jpeg',
    artist: 'Charles Bradley',
    title: 'Lovin You, Baby',
  },

  {
    url: './audio/Tatranky - Offlaga Disco Pax.mp3',
    cover: './cover/cover -4.jpeg',
    artist: 'Offlaga Disco Pax',
    title: 'Tatranky',
  },

  {
    url: './audio/The Healer - Erykah Badu.mp3',
    cover: './cover/cover -5.jpeg',
    artist: 'Erykah Badu',
    title: 'The Healer',
  },

  {
    url: './audio/This - Brian Eno.mp3',
    cover: './cover/cover -6.jpeg',
    artist: 'Brian Eno',
    title: 'This',
  },
];

let track = document.querySelector('#track');
let playing = false;
let currentTrack = 0;

// AZIONI BOTTONI
let playBtn = document.querySelector('#play-btn');
let pauseBtn = document.querySelector('#pause-btn');
let nextBtn = document.querySelector('#next-btn');
let prevBtn = document.querySelector('#prev-btn');
let playlistToggler = document.querySelector('#playlist');

// DETTAGLI CANZONE
let trackArtist = document.querySelector('#track-artist');
let trackTitle = document.querySelector('#track-title');
let trackCover = document.querySelector('#track-cover');
let trackBg = document.querySelector('#track-bg');

let currentTime = document.querySelector('#current-time');
let totalTime = document.querySelector('#total-time');

// FUNZIONI
function play() {
  if (!playing) {
    playBtn.classList.add('d-none');
    pauseBtn.classList.remove('d-none');
    trackCover.classList.add('active');

    track.play();
    playing = true;
  } else {
    playBtn.classList.remove('d-none');
    pauseBtn.classList.add('d-none');
    trackCover.classList.remove('active');

    track.pause();
    playing = false;
  }
}

function next() {
  currentTrack++;

  if (currentTrack > tracks.length - 1) {
    currentTrack = 0;
  }

  changeTrackDetails();
  changeTracklistActive();

  // Controllo se la traccia e' in esecuzione
  // se la traccia e' in esecuzione e cambio traccia la musica si blocca
  // quindi devo reimpostare playing a false e farla ripartire
  if (playing) {
    playing = false;
    play();
  }

  // else {
  //   playing = true;
  //   play();
  // }
}

function prev() {
  currentTrack--;

  if (currentTrack < 0) {
    currentTrack = tracks.length - 1;
  }

  changeTrackDetails();
  changeTracklistActive();

  if (playing) {
    playing = false;
    play();
  }
}

function toggleSidebar() {
  let sidebar = document.querySelector('#sidebar');
  sidebar.classList.toggle('open');
}

function populateTracklist() {
  let wrapper = document.querySelector('#tracklist-wrapper');

  tracks.forEach((track, index) => {
    let card = document.createElement('div');

    card.classList.add('col-12');

    card.innerHTML = `
    <div
    class="
      d-flex
      align-items-center
      justify-content-between
      border-b
      trackcard
      px-3
      py-3
    "
  >
    <img class="thumbnail" src="${track.cover}" alt="" />
    <div>
      <h5 class="text-linear-purple text-center">${track.artist}</h5>
      <p class="text-white text-center">${track.title}</p>
    </div>
    
    <i data-track="${index}" class="fas fa-headphones fs-1 pointer text-linear-purple-inverse tracklist-play"></i>
  </div>
    `;

    wrapper.appendChild(card);
  });

  let headPhoneBtns = document.querySelectorAll('.tracklist-play');

  headPhoneBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      let selectedTrack = btn.getAttribute('data-track');

      currentTrack = selectedTrack;

      changeTrackDetails();
      changeTracklistActive();

      if (playing) {
        playing = false;
        play();
      }

      // let trackCard = document.querySelectorAll('.trackcard');

      // // prima rimuovo da tutte le card la classe active e poi la aggiungo su quella che clicco
      // trackCard.forEach((card) => {
      //   card.classList.remove('active');
      // });

      // btn.parentNode.classList.add('active');
    });
  });
}

function changeTrackDetails() {
  track.src = tracks[currentTrack].url;
  trackArtist.innerHTML = tracks[currentTrack].artist;
  trackTitle.innerHTML = tracks[currentTrack].title;
  trackCover.src = tracks[currentTrack].cover;
}

function changeTracklistActive() {
  let trackCard = document.querySelectorAll('.trackcard');

  // prima rimuovo da tutte le card la classe active e poi la aggiungo su quella che clicco
  trackCard.forEach((card, index) => {
    if (index == currentTrack) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  // btn.parentNode.classList.add('active');
}

setInterval(function () {
  currentTime.innerHTML = formatTime(track.currentTime);
  totalTime.innerHTML = formatTime(track.duration);
}, 500);

function formatTime(sec) {
  let minutes = Math.floor(sec / 60);
  let seconds = Math.floor(sec - minutes * 60);
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}.${seconds}`;
}

playBtn.addEventListener('click', play);
pauseBtn.addEventListener('click', play);
nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', prev);
track.addEventListener('ended', next);

playlistToggler.addEventListener('click', toggleSidebar);

// track.src = tracks[currentTrack].url;
// trackArtist.innerHTML = tracks[currentTrack].artist;
// trackTitle.innerHTML = tracks[currentTrack].title;
// trackCover.src = tracks[currentTrack].cover;
// trackBg.src = tracks[currentTrack].cover;

changeTrackDetails();
changeTracklistActive();
populateTracklist();

// CHANGE MAIN COLOR
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

function randomColor() {
  return (
    'rgb(' +
    random(0, 255) +
    ', ' +
    random(0, 255) +
    ', ' +
    random(0, 255) +
    ')'
  );
}
let colorChange = document.querySelector('#color-change');

colorChange.addEventListener('click', function () {
  const newBgColor = randomColor();
  document.documentElement.style.setProperty('--main-light', newBgColor);
});
