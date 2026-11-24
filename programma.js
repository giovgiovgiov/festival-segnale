const statoEventi = document.querySelector("#stato-eventi");
const grigliaEventi = document.querySelector("#event-grid");

function creaScheda(evento, sediPerId) {
  const scheda = document.createElement("article");
  scheda.className = "event-card";

  const immagine = document.createElement("img");
  immagine.src = evento.immagine;
  immagine.alt = evento.immagine_alt || "";
  immagine.width = 900;
  immagine.height = 600;

  const corpo = document.createElement("div");
  corpo.className = "event-body";

  const meta = document.createElement("p");
  meta.className = "event-meta";

  const data = new Date(`${evento.data}T12:00:00`);
  const dataFormattata = new Intl.DateTimeFormat("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(data);

  meta.textContent = `${dataFormattata} · ${evento.orario} · ${evento.categoria}`;

  const titolo = document.createElement("h3");
  titolo.textContent = evento.titolo;

  const descrizione = document.createElement("p");
  descrizione.textContent = evento.descrizione;

  const luogo = document.createElement("p");
  luogo.className = "event-place";

  const etichetta = document.createElement("strong");
  etichetta.textContent = "Sede: ";

  const sede = sediPerId.get(evento.sede_id);
  luogo.append(etichetta, sede ? sede.nome : "Sede da definire");

  corpo.append(meta, titolo, descrizione, luogo);
  scheda.append(immagine, corpo);

  return scheda;
}

async function caricaProgramma() {
  try {
    const [rispostaEventi, rispostaSedi] = await Promise.all([
      fetch("dati/eventi.json"),
      fetch("dati/sedi.json")
    ]);

    if (!rispostaEventi.ok || !rispostaSedi.ok) {
      throw new Error("Non è stato possibile leggere i file dei dati.");
    }

    const [eventi, sedi] = await Promise.all([
      rispostaEventi.json(),
      rispostaSedi.json()
    ]);

    if (!Array.isArray(eventi) || !Array.isArray(sedi)) {
      throw new Error("Il formato dei dati non è valido.");
    }

    if (eventi.length === 0) {
      statoEventi.textContent = "Al momento non ci sono eventi in programma.";
      return;
    }

    const sediPerId = new Map(sedi.map((sede) => [sede.id, sede]));

    grigliaEventi.replaceChildren(
      ...eventi.map((evento) => creaScheda(evento, sediPerId))
    );
    statoEventi.textContent = "";
  } catch (errore) {
    statoEventi.textContent =
      "Non è stato possibile caricare il programma. Riprova più tardi.";
  }
}

caricaProgramma();
