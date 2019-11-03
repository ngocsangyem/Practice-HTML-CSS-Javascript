(function() {
    let timer;
    const jsAudioEl = document.getElementsByClassName('js-audio');
    const audioHasAnimationEl = document.getElementsByClassName(
        'audio-has-animation'
    );
    const jsAudioArray = domToArray(jsAudioEl);
    const audioHasAnimationArray = domToArray(audioHasAnimationEl);

    function domToArray(dom) {
        return Array.from(dom);
    }

    jsAudioArray.forEach(element => {
        const doc = document.documentElement;
        const audioSrc = element.getAttribute('data-audio');
        const audio = new Audio(audioSrc);
        const viewportOffset = element.getBoundingClientRect();
        const elOffsetTop = viewportOffset.top;
        const elHeight = element.offsetHeight;
        const elementPosition = elOffsetTop + elHeight;

        let lastScrollTop = 0;

        element.addEventListener('click', function(event) {
            if (!audio.paused) {
                element.classList.remove('audio-active');
                element.classList.add('audio-pause');
                pauseAudio(audio);
            } else {
                element.classList.remove('audio-init');
                element.classList.remove('audio-pause');
                element.classList.add('audio-active');
                playAudio(audio);
            }
        });

        audio.addEventListener('playing', function(event) {
            let duration = event.target.duration;
            audioProgress(duration, audio, element);
        });

        audio.addEventListener('pause', function(event) {
            clearTimeout(timer);
            if (element.classList.contains('audio-image-container')) {
                element.classList.add('audio-init');
            }

            if (element.classList.contains('audio-has-animation')) {
                element.classList.remove('audio-active');
                element.classList.add('audio-pause');
            }
        });

        audio.addEventListener('ended', function() {
            element.classList.remove('audio-active');
            element.classList.add('audio-init');
        });

        getDuration(audioSrc, element);

        window.addEventListener(
            'scroll',
            function() {
                const windowScrollTop =
                    (window.pageYOffset || doc.scrollTop) -
                    (doc.clientTop || 0);
                const elOffsetTopOnScroll = viewportOffset.top;
                if (windowScrollTop > lastScrollTop) {
                    if (windowScrollTop >= elOffsetTopOnScroll + elHeight) {
                        audio.pause();
                    }
                } else {
                    if (windowScrollTop <= elOffsetTop + elHeight) {
                        audio.pause();
                    }
                }
                lastScrollTop = windowScrollTop <= 0 ? 0 : windowScrollTop; // For Mobile or negative scrolling
            },
            false
        );
    });

    audioHasAnimationArray.forEach(element => {
        const audioSrc = element.getAttribute('data-audio');
        const audio = new Audio(audioSrc);
    });

    function isInViewPort(elm) {
        const doc = document.documentElement;
        const viewportOffset = elm.getBoundingClientRect();
        const elmTop = viewportOffset.top;
        const elmBottom = elmTop + elm.offsetHeight;
        const viewportTop =
            (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        const viewportBottom = viewportTop + window.innerHeight;

        return elmTop >= viewportTop && elmBottom <= viewportBottom;
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
