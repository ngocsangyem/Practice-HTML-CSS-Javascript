(function() {
  let timer;
  const jsAudioEl = document.getElementsByClassName("js-audio");
  const jsAudioArray = nodeToArray(jsAudioEl);
  const socialButton = document.getElementsByClassName("Theme-SocialButton");
  const socialButtonArray = nodeToArray(socialButton);
  let currentLogo =
    "https://media.shorthand.com/media/organisations/M0QNnc1ojf/OHsJF0t7DG/obw-logo-hz-white-230x104.png";
  let smallLogo = document.querySelector(
    ".Theme-Logos .Theme-Logo .Theme-SmallLogo"
  );
  let smallLogoNewSrc =
    "https://forum.ourbetterworld.org/assets/uploads/system/site-logo.svg?v=635e7hji5sd";

  window.onload = function() {
    changeLogoSrc(smallLogo, smallLogoNewSrc, "max-width: 320px");
  };

  window.onresize = function() {
    changeLogoSrc(smallLogo, smallLogoNewSrc, "max-width: 320px");
  };

  jsAudioArray.forEach(element => {
    const audio = element.querySelector(".audio");

    element.addEventListener("click", function(event) {
      const currentAudio = event.target.querySelector(".audio");

      if (!currentAudio.paused) {
        swapClass(element, "audio-active", "audio-pause");
        pauseAudio(currentAudio);
      } else {
        element.classList.remove("audio-init");
        swapClass(element, "audio-pause", "audio-active");
        pauseAllAudio();
        playAudio(currentAudio);
        trackingPlayAudio(currentAudio);
      }
    });

    audio.addEventListener("playing", function(event) {
      let duration = event.target.duration;
      audioProgress(duration, audio, element);
    });

    audio.addEventListener("pause", function(event) {
      clearTimeout(timer);
      swapClass(element, "audio-active", "audio-pause");
    });

    audio.addEventListener("ended", function() {
      swapClass(element, "audio-pause", "audio-init");
    });

    getDuration(audio.src, element);

    window.addEventListener("scroll", function() {
      if (!isInView(element) && !audio.paused) {
        pauseAudio(audio);
      }
    });
  });

  socialButtonArray.forEach(element => {
    const socialChildTag = element.querySelector("a");

    if (!socialChildTag.hasAttribute("data-social-share")) {
      setAttibuteEl(
        element,
        ".Theme-WhatsAppButton",
        "data-social-share",
        "whatsapp"
      );
      setAttibuteEl(
        element,
        ".Theme-EmailButton",
        "data-social-share",
        "email"
      );
    }
    socialChildTag.addEventListener("click", function() {
      const socialName = socialChildTag.getAttribute("data-social-share");
      dataLayer.push({
        event: "content_participate",
        eventCategory: "Stories",
        contentParticipates: 1,
        eventAction: "Shares",
        eventLabel: socialName,
        socialMediaPlatform: socialName,
        socialShares: 1,
        timestamp: Date.now()
      });
    });
  });

  function changeLogoSrc(element, newSrc, breakpoint) {
    const mediaScreen = window.matchMedia("(" + breakpoint + ")").matches;
    if (!!element) {
      if (mediaScreen) {
        element.setAttribute("src", newSrc);
      } else {
        element.setAttribute("src", currentLogo);
      }
    }
  }

  function setAttibuteEl(element, className, attributeName, attributeValue) {
    const childEl = element.querySelector(className);
    if (!!childEl) {
      childEl.setAttribute(attributeName, attributeValue);
    }
  }

  function nodeToArray(dom) {
    return Array.from(dom);
  }
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
      (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom) ||
      (bounds.top <= viewport.bottom && bounds.top >= viewport.top)
    );
  }

  function trackingPlayAudio(audio) {
    console.log(audio);

    dataLayer.push({
      event: "audio_listen",
      eventCategory: "Audio Consumption",
      contentParticipates: 1,
      eventAction: "Audio Play",
      eventLabel: getAudioFileName(audio.src),
      timestamp: Date.now()
    });
  }

  function getAudioFileName(audioSrc) {
    let audioSrcMetrics = audioSrc.split("/");
    return decodeURI(audioSrcMetrics[audioSrcMetrics.length - 1]).replace(
      /(\.[^/.]+)+$/,
      ""
    );
  }

  function pauseAllAudio() {
    jsAudioArray.forEach(element => {
      element.querySelector(".audio").pause();
    });
  }

  function audioProgress(duration, audio, element) {
    let progress = element.querySelector(".audio-progress");

    if (!!progress) {
      increment = 10 / duration;
      percent = Math.min(increment * audio.currentTime * 10, 100);
      progress.style.width = percent + "%";
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
    const audioDurationDestination = element.querySelector(".audio-duration");

    if (!!audioDurationDestination) {
      audio.addEventListener("loadedmetadata", function() {
        const minutes = parseInt(audio.duration / 60, 10);
        const seconds = parseInt(audio.duration % 60);
        audioDurationDestination.textContent =
          seconds > 9 ? `${minutes}:${seconds}` : `${minutes}:0${seconds}`;
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
