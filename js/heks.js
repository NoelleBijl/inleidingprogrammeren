const tekstwolk1 = document.querySelector(".tekstwolk1");
const tekstwolk2 = document.querySelector(".tekstwolk2");
const tekstwolk3 = document.querySelector(".tekstwolk3");
const juisteDrankjes = ["geelDrankje", "roodDrankje"];
const maxDrankjes = 2;
const ketel = document.querySelector(".ketel");
const drankjes = document.querySelectorAll("button img");
const jongenVliegt = document.querySelector(".jongen_vliegt");

let toegevoegdeDrankjes = [];

setTimeout(() => {
  tekstwolk1.classList.remove("hidden");
  tekstwolk1.addEventListener("click", vervangTekstwolk);
}, 1000);

function vervangTekstwolk() {
  tekstwolk1.classList.add("hidden");
  tekstwolk2.classList.remove("hidden");

  tekstwolk1.removeEventListener("click", vervangTekstwolk);
  tekstwolk2.addEventListener("click", vervangNaarDrie);
}

function vervangNaarDrie() {
  tekstwolk2.classList.add("hidden");
  tekstwolk3.classList.remove("hidden");

  tekstwolk2.removeEventListener("click", vervangNaarDrie);
  tekstwolk3.addEventListener("click", verbergAlles);
}

function verbergAlles() {
  tekstwolk3.classList.add("hidden");
  tekstwolk3.removeEventListener("click", verbergAlles);
}


//ChatGPT_______________________________________________________________________________________ 
// Promt: Maak alle drankjes dragbaar zodat je ze naar de ketel kan slepen. Als je ze naar de ketel hebt gesleept verdwijnen de drankjes. Welke drankjes er in de ketel worden gesleept moeten worden opgeslagen in js

drankjes.forEach((drankje) => {
  drankje.setAttribute("draggable", true); // Maakt het element versleepbaar

  drankje.addEventListener("dragstart", (event) => {
    // Bij het starten van het slepen: sla de ID op in de drag data
    event.dataTransfer.setData("text/plain", drankje.id);
  });
});

// Laat de ketel drankjes accepteren door dragover toe te staan
ketel.addEventListener("dragover", (event) => {
  event.preventDefault(); // Nodig om 'drop' toe te laten
});

// Behandel het droppen in de ketel
ketel.addEventListener("drop", (event) => {
  event.preventDefault();

  // Haal het ID van het gesleepte drankje op
  const drankjeId = event.dataTransfer.getData("text/plain");

  if (toegevoegdeDrankjes.length < maxDrankjes) {
    const drankje = document.getElementById(drankjeId);
    if (drankje) {
      drankje.parentElement.classList.add("hidden");
      toegevoegdeDrankjes.push(drankjeId);
    }
  }

  if (toegevoegdeDrankjes.length === maxDrankjes) {
    startRoeren();
  }
});

//____________________________________________________________________________________________

function startRoeren() {
  document.querySelector(".meisje").classList.add("hidden");
  document.querySelector(".ketel").classList.add("hidden");
  document.querySelector(".heks_roert").classList.remove("hidden");
  setTimeout(bepaalUitkomst, 2000);
}

function bepaalUitkomst() {
  document.querySelector(".heks_roert").classList.add("hidden");
  document.querySelector(".jongen").classList.add("hidden");

  document.querySelector(".ketel").classList.remove("hidden");

//ChatGPT_____________________________________________________________________________________________

  // Controleer of alle juiste drankjes zijn toegevoegd (volgorde maakt niet uit)
  const isCorrect = juisteDrankjes.every(d => toegevoegdeDrankjes.includes(d));

//_____________________________________________________________________________________________________

  if (isCorrect) {
    jongenVliegt.classList.remove("hidden");
    document.querySelector(".meisje").classList.remove("hidden");

  } else if (toegevoegdeDrankjes.includes("kikkerDrankje", "groenDrankje")) {
    document.querySelector(".jongen_groen").classList.remove("hidden");
    document.querySelector(".meisje_bezorgd").classList.remove("hidden");

  } else {
    document.querySelector(".jongen_ziek").classList.remove("hidden");
    document.querySelector(".meisje_bezorgd").classList.remove("hidden");
  }
}

//Anne van Mill heeft mij hierbij geholpen______________________________________________________________

document.addEventListener("click", () => {
  const audio = document.getElementById("geluidDrankje");
  audio.play();
});

//_______________________________________________________________________________________________________