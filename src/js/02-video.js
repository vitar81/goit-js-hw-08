import VimeoPlayer from '@vimeo/player/dist/player.es.js';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');

const keyStorage = 'videoplayer-current-time';
const player = new VimeoPlayer(iframe);

const saveTimeToLocalStorage = throttle(time => {
    localStorage.setItem(keyStorage, time);
}, 1000);

player.on('timeupdate', function (data) {
    const currentTime = data.seconds;
    saveTimeToLocalStorage(currentTime);
});

window.addEventListener('load', () => {
    const saveTime = localStorage.getItem(keyStorage);

    if (saveTime) {
    player.setCurrentTime(parseFloat(saveTime));
    }
});