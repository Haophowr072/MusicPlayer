// 1. render Song --> Done
// 2. Scroll Top --> Done
// 3. Play // pause// seek --> Done
// 4. CD rorate 
// 5. next / prev  
// 6. random Song 
// 7. Next / Repeat when ended
// 8. active Song
// 9. Scroll avtive song into view
// 10. play song when click

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const cd = $('.cd');
const player = $('.player')
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const btnPlaying = $('.btn-toggle-play');
const progress = $('#progress');
const btnNext = $('.btn-next');
const prevNext = $('.btn-prev');

const app = {
    currentIndex: 0,
    isPlaying: false,
    songs : [
        {
            name: 'Có hẹn với thanh xuân',
            singer: 'MONSTAR',
            path: './assets/music/song1.mp3',
            image: './assets/img/Cóhẹnvớithanhxuân.jpg'
        },
    
        {
            name: 'Đường tôi chở em về',
            singer: 'BuiTruongLinh',
            path: './assets/music/song2.mp3',
            image: './assets/img/Đườngtôichởemvề.jpg'
        },
        {
            name: 'Không thuộc về',
            singer: 'Minh Lý',
            path: './assets/music/song3.mp3',
            image: './assets/img/Khôngthuộcvề.jpg'
        },
        {
            name: 'Như anh đã thấy em',
            singer: 'Freak D',
            path: './assets/music/song4.mp3',
            image: './assets/img/Nhưanhđãthấyem.jpg'
        },
        {
            name: 'Phố cũ còn anh',
            singer: 'Quinn',
            path: './assets/music/song5.mp3',
            image: './assets/img/Phốcũcònanh.jpg'
        },
        {
            name: 'Reality',
            singer: 'Lost Frequencies',
            path: './assets/music/song6.mp3',
            image: './assets/img/Reality.jpg'
        },
        {
            name: 'SummerTime',
            singer: 'K-391',
            path: './assets/music/song7.mp3',
            image: './assets/img/SummerTime.jpg'
        },
        {
            name: 'Unity',
            singer: 'TheFatRat',
            path: './assets/music/song8.mp3',
            image: './assets/img/Unity.jpg'
        },
        {
            name: 'Nevada',
            singer: 'ViceTone',
            path: './assets/music/song9.mp3',
            image: './assets/img/nevada.jpg'
        },
        
    
    ],

    render: function(){
        const html = this.songs.map((song, index) => {
            return `
                <div class="song" data-index='${index}'>
                <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })

        $('.playlist').innerHTML = html.join('');
    },

    handleEvents: function(){
        const _this = this;    
        const cdWidth = cd.offsetWidth;
        //xử lý sự kiện CD quay 
        const cdAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration: 10000,
            iterations: Infinity,
        })

        cdAnimate.pause()

        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
        }
        //sự kiện click vào nút play
        btnPlaying.onclick = function() {
            if(_this.isPlaying){
                audio.pause();
            }else {
                audio.play();
            } 

        }
        //khi nhạc đang phát
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdAnimate.play();
        };
        //khi nhạc bị ngừng
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdAnimate.pause();
        };

        audio.ontimeupdate = function(){
            progress.value = audio.currentTime / audio.duration * 100;
        };
        //seek bài hát
        progress.onchange = function(e){
            audio.currentTime = e.target.value *  audio.duration / 100
        }

        //sự kiện khi click btn Next
        btnNext.onclick = function(){
            _this.nextSong();
            audio.play();
        }
        prevNext.onclick = function(){
            _this.prevSong();
            audio.play();
        }

    },

    nextSong: function(){
        app.currentIndex++;
        if(app.currentIndex >= app.songs.length){
            app.currentIndex = 0;
        }
        app.loadCurrentSong()
    },
    prevSong: function(){
        app.currentIndex--;
        if(app.currentIndex < 0){
            app.currentIndex = app.songs.length - 1;
        }
        app.loadCurrentSong()
    },
    //định nghĩa ra bài hát đầu tiên của songs
    defineProperties: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.songs[this.currentIndex];
            }
        })
    },
    
    //render ra bài hát hiện tại
    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
        audio.src = this.currentSong.path;
    },

    start: function(){
        this.defineProperties()

        this.handleEvents();

        this.loadCurrentSong();

        this.render();
    }
}

app.start()
