'use strict';
const API_KEY = 'trnsl.1.1.20200506T191845Z.dfa22dacec86436b.b9e2cf29a8c7259d38ee8b09640926328a1f6f62';
const textOriginal = document.querySelector('#textOriginal'),
    textTranslation = document.querySelector('#textTranslation');

const translate = () => {
    const text = textOriginal.value;
    if (text.length > 0) {
        fetch(`https://translate.yandex.net/api/v1.5/tr.json/detect?key=${API_KEY}&text=${textOriginal.value}&hint=en,ru`, {
            method: 'POST',
            mode: 'cors'
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('status network not 200');
                }
                return (response.json());
            })
            .then(data => data.lang)
            .then(detectedLang => {
                const lang = detectedLang === 'en' ? 'en-ru' : 'ru-en';
                fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${API_KEY}&text=${textOriginal.value}&lang=${lang}`, {
                    method: 'POST',
                    mode: 'cors'
                })
                    .then(response => {
                        if (response.status !== 200) {
                            throw new Error('status network not 200');
                        }
                        return (response.json());
                    })
                    .then(data => {
                        textTranslation.value = data.text[0];
                    })
                    .catch(error => console.error(error));
            })
            .catch(error => console.error(error));
    }
};

textOriginal.addEventListener('input', translate);