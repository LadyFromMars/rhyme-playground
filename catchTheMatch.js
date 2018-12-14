document.addEventListener("DOMContentLoaded", function() {

  // Global Variables
  const inputSent = document.getElementById("input-form");
  const InputSentGet = document.querySelector("#input-form input");
  let relatedWord = " ";
  const newVerseLine = document.getElementById("verse");
  const proxyURL = "https://cors.io/?"; // This is in order to bypass the 'Access-Control-Allow-Origin' error
  const maxRelatedWordDistance = 10; // Index for related words
  const newAdjective = document.getElementById("adjective");
  const newVerb = document.getElementById("verb");
  const newTriggered = document.getElementById("triggered");
  const newInputSentence = document.getElementById("inputSentence");



  // Event Listeners
  enter.addEventListener("click", inputSentSubmit);
  inputSent.addEventListener("submit", inputSentSubmit);


var newInputSentGet = "";


//Input Event

  function inputSentSubmit(event) {
    event.preventDefault();

    //selecting the last word in an array (rhyme)

    const initialWordInput1 = InputSentGet.value.split(" ");
    const inputLength = initialWordInput1.length -1;
    const input = initialWordInput1[inputLength];

    //
     newInputSentGet = input.trim().toLowerCase();
    if(newInputSentGet) {
      relatedWord.text = newInputSentGet;
      newInputSentence.innerHTML = `${InputSentGet.value}`;
    }
 return newInputSentGet;
  }
  //console.log(relatedWord);





  submit.addEventListener("click", addNewLine);


// Add a line event

  function addNewLine (event) {

    event.preventDefault();

//fetch noun
    fetch(proxyURL + "https://api.datamuse.com/words?rel_rhy=" + newInputSentGet)
    .then(res => res.json())
    .then(data => {
      const relatedWordIndex = Math.floor(Math.random()*Math.min(data.length,maxRelatedWordDistance));

      if(data[relatedWordIndex]) {
        relatedWord = data[relatedWordIndex].word;
        //lastArray += " " + data[relatedWordIndex].word;
        newVerseLine.innerHTML += `</br> <span>${data[relatedWordIndex].word}</span> `;


//fetch adjective

      fetch(proxyURL + "https://api.datamuse.com/words?rel_jjb=" + relatedWord)
      .then(res => res.json())
      .then(data => {
        const WordIndex = Math.floor(Math.random()*Math.min(data.length,maxRelatedWordDistance));
        if(data[WordIndex]) {
          const relatedWord = "";
          relatedWord.text = data[WordIndex].word;
        //  adjArray = data[WordIndex].word;
          newAdjective.innerHTML += `</br> <span>${data[WordIndex].word}</span> `;

        } else { //if there is no adjectives assocciated with "word" (err handling)

          const adjToChoose = ["hipster", "funny", "spooky", "sticky", "glowy", "dark", "crazy"];
          const random = Math.floor(Math.random() * Math.floor(adjToChoose.length));
          newAdjective.innerHTML += `</br> <span>${adjToChoose[random]}`;

        }
      //  return adjArray;
    })

//triggered word (strongly assocciated)

    fetch(proxyURL + "https://api.datamuse.com/words?rel_trg=" + relatedWord)
    .then(res => res.json())
    .then(data => {
    const WordIndex = Math.floor(Math.random()*Math.min(data.length,maxRelatedWordDistance));
    if(data[WordIndex]) {
    const relatedWord = "";
    relatedWord.text = data[WordIndex].word;
    //verbArray = data[WordIndex].word;
    newTriggered.innerHTML += `</br> <span>${data[WordIndex].word}</span> `;


  } else { //if there is no "triggered words" in API (error handling)
    const triggeredToChoose = ["nerd", "gnom", "dinosaur", "toy", "bird", "puppy", "kitty"];
    const random = Math.floor(Math.random() * Math.floor(triggeredToChoose.length));
    newTriggered.innerHTML += `</br> <span> ${triggeredToChoose[random]} </span> `;
  }
  //return verbArray;
})

//verb (random)

    const verbsToChoose = ["saw", "opened", "poisoned", "killed", "loved", "liked", "hugged", "licked",
    "suck in", "trapped ", "explode", "snoop", "challenge", "fight", "fly over", "run over",
    "care about", "failed in", "wait for", "burned the", "exploded", "sit on", "played with", "took over",
    "cry over", "use", "ashamed of ", "married to", "satisfied with", "showed", "beried", "belived in", "followed", "created", "won", "sold"];

    const random = Math.floor(Math.random() * Math.floor(verbsToChoose.length));
    newVerb.innerHTML += `</br> <span>${verbsToChoose[random]}`;


//error handling for unknown input

} else {
  newInputSentence.innerHTML += `</br> <span> I've never heard word like this. </br> Please, try another one  </span> `;
}

  })
    .catch(err => {
      console.log(err);
      relatedWord.classList.toggle("disabled");
    });

  }

});
