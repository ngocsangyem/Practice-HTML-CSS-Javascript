(function() {
    let timer;
    const jsAudioEl = document.getElementsByClassName('js-audio');
    const jsAudioArray = nodeListToArray(jsAudioEl);
    const chapterContainer = document.querySelectorAll('.sh-chapter-container');

    function nodeListToArray(dom) {
        return Array.from(dom);
    }

    jsAudioArray.forEach(element => {
        const audio = element.querySelector('.audio');

        element.addEventListener('click', function(event) {
            const currentAudio = event.target.querySelector('.audio');

            if (!currentAudio.paused) {
                swapClass(element, 'audio-active', 'audio-pause');
                pauseAudio(currentAudio);
            } else {
                element.classList.remove('audio-init');
                swapClass(element, 'audio-pause', 'audio-active');
                pauseAllAudio();
                playAudio(currentAudio);
            }
        });

        audio.addEventListener('playing', function(event) {
            let duration = event.target.duration;
            audioProgress(duration, audio, element);
        });

        audio.addEventListener('pause', function(event) {
            clearTimeout(timer);
            swapClass(element, 'audio-active', 'audio-pause');
        });

        audio.addEventListener('ended', function() {
            swapClass(element, 'audio-pause', 'audio-init');
        });

        getDuration(audio.src, element);

        window.addEventListener('scroll', function() {
            if (!isInView(element) && !audio.paused) {
                pauseAudio(audio);
            }
        });
    });

    function swapClass(element, oldClass, newClass) {
        element.classList.remove(oldClass);
        element.classList.add(newClass);
    }

    function isInView(el) {
        const scroll = window.scrollY || window.pageYOffset;
        const boundsTop = el.getBoundingClientRect().top + scroll;

        const viewport = {
            top: scroll,
            bottom: scroll + window.innerHeight
        };

        const bounds = {
            top: boundsTop,
            bottom: boundsTop + el.clientHeight
        };

        return (
            (bounds.bottom >= viewport.top &&
                bounds.bottom <= viewport.bottom) ||
            (bounds.top <= viewport.bottom && bounds.top >= viewport.top)
        );
    }

    function pauseAllAudio() {
        jsAudioArray.forEach(element => {
            element.querySelector('.audio').pause();
        });
    }

    function audioProgress(duration, audio, element) {
        let progress = element.querySelector('.audio-progress');

        if (!!progress) {
            increment = 10 / duration;
            percent = Math.min(increment * audio.currentTime * 10, 100);
            progress.style.width = percent + '%';
            startTimer(duration, audio, element);
        }
    }

    function startTimer(duration, audio, element) {
        const percent = 0;
        if (percent < 100) {
            timer = setTimeout(function() {
                audioProgress(duration, audio, element);
            }, 100);
        }
    }

    function getDuration(src, element) {
        const audio = new Audio();
        const audioDurationDestination = element.querySelector(
            '.audio-duration'
        );

        if (!!audioDurationDestination) {
            audio.addEventListener('loadedmetadata', function() {
                const minutes = parseInt(audio.duration / 60, 10);
                const seconds = parseInt(audio.duration % 60);
                audioDurationDestination.textContent =
                    seconds > 9
                        ? `${minutes}:${seconds}`
                        : `${minutes}:0${seconds}`;
            });
            audio.src = src;
        }
    }

    function playAudio(audio) {
        audio.play();
    }

    function pauseAudio(audio) {
        audio.pause();
    }
})();
