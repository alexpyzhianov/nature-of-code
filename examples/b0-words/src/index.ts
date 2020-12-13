import nlp from "compromise";
import wordsUrl from "../assets/dict.txt";
import syll from "compromise-syllables";
import "mvp.css";

nlp.extend(syll);
console.log();

fetch(wordsUrl)
    .then((stuff) => stuff.text())
    .then((text) => text.split(/(\r\n|\r|\n)+/))
    .then((list) => list.filter((word) => word.length >= 3))
    .then(main);

function main(dictionary: string[]) {
    const list = document.getElementById("phrases-container");
    const status = document.getElementById("status");
    const phraseInput = document.getElementById(
        "phrase-input",
    ) as HTMLInputElement | null;
    const fromWordInput = document.getElementById(
        "from-word-input",
    ) as HTMLInputElement | null;

    function updatePhrases() {
        const initialPhrase = phraseInput?.value;
        const fromWord = Number(fromWordInput?.value);
        if (!initialPhrase || !Number.isInteger(fromWord)) return;

        const wordsToMock = initialPhrase.split(" ").slice(fromWord - 1);

        const fitWords = wordsToMock.map((word) =>
            dictionary.filter((dictWord) => {
                const sameFirstLetter = dictWord[0] === word[0];
                const dictSyll = nlp(dictWord).terms().syllables()[0].syllables
                    .length;
                const wordSyll = nlp(dictWord).terms().syllables()[0].syllables
                    .length;
                return sameFirstLetter && dictSyll === wordSyll;
            }),
        );

        const phrases = [];
        let nextPhrase = "";

        do {
            nextPhrase = "";

            for (const list of fitWords) {
                const word = list[phrases.length];
                if (!word) {
                    nextPhrase = "";
                    break;
                } else {
                    nextPhrase += word + " ";
                }
            }

            if (nextPhrase) {
                phrases.push(nextPhrase);
            }
        } while (nextPhrase);

        phrases.forEach((phrase) => {
            const p = document.createElement("li");
            p.textContent = phrase;
            list?.appendChild(p);
        });
    }

    if (!list || !status || !phraseInput || !fromWordInput) {
        throw new Error("Some UI elements are missing");
    }

    list.removeChild(status);

    phraseInput.addEventListener("change", updatePhrases);
    fromWordInput.addEventListener("change", updatePhrases);

    updatePhrases();
}
