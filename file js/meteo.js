const statoMeteo = document.querySelector("#stato-meteo");
const datiMeteo = document.querySelector("#dati-meteo");

async function caricaMeteo() {
  const indirizzo =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=45.0703&longitude=7.6869" +
    "&current=temperature_2m,wind_speed_10m" +
    "&timezone=Europe%2FRome";

  try {
    const risposta = await fetch(indirizzo);

    if (!risposta.ok) {
      throw new Error("Richiesta meteo non riuscita.");
    }

    const dati = await risposta.json();
    const attuali = dati.current;
    const unita = dati.current_units;

    if (
      !attuali ||
      attuali.temperature_2m === undefined ||
      attuali.wind_speed_10m === undefined ||
      !attuali.time
    ) {
      throw new Error("Dati meteo incompleti.");
    }

    document.querySelector("#temperatura-meteo").textContent =
      `${attuali.temperature_2m} ${unita.temperature_2m}`;
    document.querySelector("#vento-meteo").textContent =
      `${attuali.wind_speed_10m} ${unita.wind_speed_10m}`;

    const ora = new Date(attuali.time);
    document.querySelector("#ora-meteo").textContent =
      new Intl.DateTimeFormat("it-IT", {
        dateStyle: "short",
        timeStyle: "short",
        timeZone: "Europe/Rome"
      }).format(ora);

    datiMeteo.hidden = false;
    statoMeteo.textContent = "";
  } catch (errore) {
    statoMeteo.textContent =
      "I dati meteo non sono al momento disponibili.";
  }
}

caricaMeteo();
