'use strict';

(() => {
    /**
     * @param {Event} event
     */
    const resetKey = (event) => {
        event.target.classList.remove('playing');
    };

    /**
     * @param {HTMLDivElement} div
     */
    const addPlaying = (div) => {
        div.classList.add('playing');
    };

    /**
     * @type {HTMLDivElement}
     */
    const keysContainer = document.querySelector('div.keys');
    keysContainer.addEventListener('transitionend', resetKey);

    var listenTo;
    if ('ontouchstart' in window) {
        listenTo = 'touchstart';
    } else {
        listenTo = 'click';
    }

    document.addEventListener(listenTo, (event) => {
        var target = event.target;

        while (!target.classList.contains('key')) {
            target = target.parentElement;
            if (!target) {
                return;
            }
        }

        var key = target.getAttribute('data-key');
        /**
         * @type {HTMLAudioElement}
         */
        var sound = document.querySelector(`audio[data-key="${key}"]`);
        const divPlaying = document.querySelector(`div[data-key="${key}"]`);


        if (!!sound) {
            addPlaying(divPlaying);
            sound.currentTime = 0;
            sound.play();
        }
    });

    document.addEventListener('keydown', (event) => {
        /**
         * @type {HTMLAudioElement}
         */
        var sound = document.querySelector(`audio[data-key="${event.keyCode}"]`);
        const divPlaying = document.querySelector(`div[data-key="${event.keyCode}"]`);

        if (!!sound) {
            addPlaying(divPlaying);
            sound.currentTime = 0;
            sound.play();
        }
    });
})();