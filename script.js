const terminal = document.querySelector("#terminal");
const form = document.querySelector("#key-form");
const input = document.querySelector("#key-input");
const feedback = document.querySelector("#feedback");
const unlocked = document.querySelector("#unlocked");
const hintButton = document.querySelector("#hint-button");
const securityCheckButton = document.querySelector("#security-check");
const viewer = document.querySelector("#journal-viewer");
const accessLog = document.querySelector("#access-log");
const loginForm = document.querySelector("#login-form");
const loginUser = document.querySelector("#login-user");
const loginPassword = document.querySelector("#login-password");
const loginMessage = document.querySelector("#login-message");
const loginOverlay = document.querySelector("#login-overlay");
const appShell = document.querySelector("#app-shell");

const normalizeText = (value = "") =>
  String(value)
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u00A0/g, " ")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .trim();

const journalDocs = {
  registry: {
    title: "Registre principal",
    code: "REG_01",
    file: "files/registry_01.txt",
    summary: "Dernière entrée restaurée dans le système principal.",
    content: [
      "Nulle alerte n’a précédé la restauration.",
      "On n’a trouvé aucune requête dans la file.",
      "Il manque pourtant une référence au registre.",
      "Rien ne correspond à l’empreinte conservée.",
      "La première lettre de chaque ligne porte encore une marque d’intégrité."
    ]
  },
  copy: {
    title: "Note récupérée",
    code: "A_01",
    file: "files/copy_note.txt",
    summary: "Premier signal identifiant la source probable.",
    content: [
      "L’archive a conservé une référence partielle.",
      "La dernière écriture n’est pas une commande connue.",
      "Les autres entrées restent stables, mais l’Original semble avoir été nommé sans autorisation.",
      "Les fragments sont présents dans les journaux, mais le mot complet ne peut être reconstitué."
    ]
  },
  review: {
    title: "Second relevé",
    code: "B_02",
    file: "files/review_report_B.txt",
    summary: "Comparaison des sources et contradiction sur le fragment isolé.",
    content: [
      "[ANALYSTE] Premier relevé :",
      "Fragments reliés à l’entrée : 4",
      "Fragments lisibles : 3",
      "Fragments confirmés par deux sources : 3",
      "Le premier relevé compte une trace isolée comme si elle était un fragment complet."
    ]
  }
};

const renderDocument = async (docId) => {
  if (!viewer) return;

  const doc = journalDocs[docId];
  if (!doc) return;

  let lines = (doc.content || []).map((line) => normalizeText(line)).filter(Boolean);

  try {
    const response = await fetch(doc.file, { cache: "no-store" });
    if (response.ok) {
      const text = await response.text();
      lines = text
        .split(/\r?\n/)
        .map((line) => normalizeText(line))
        .filter((line) => line.length > 0);
    }
  } catch (error) {
    console.warn("Lecture du fichier d’évidence impossible :", error);
  }

  viewer.innerHTML = `
    <div class="viewer-header">
      <span class="tag">${doc.code}</span>
      <h3>${doc.title}</h3>
    </div>
    <div class="viewer-actions">
      <span class="viewer-status">Fichier de preuve</span>
      <a href="${doc.file}" target="_blank" rel="noreferrer">Ouvrir le fichier</a>
    </div>
    <div class="viewer-body">
      <p><strong>Résumé :</strong> ${doc.summary}</p>
      ${lines.map((line) => `<p>${line}</p>`).join("")}
    </div>
  `;
};

const systemMessages = [
  "[SYS] Vérification du registre principal terminée.",
  "[TRACE] La première lettre de chaque ligne n’était pas un détail : c’était une signature.",
  "[ALERT] Détection d’une entrée inclassée au niveau profond de l’archive.",
  "[FLAG] Étiquette de sécurité : PLUME",
  "[INFO] L’Original n’était pas la source, mais une couverture de protection."
];

const renderSystemLog = () => {
  if (!accessLog) return;

  accessLog.innerHTML = systemMessages
    .map((entry) => `<p>${entry}</p>`)
    .join("");
};

const journalButtons = document.querySelectorAll(".journal-item");
journalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    journalButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderDocument(button.dataset.doc);
  });
});

const addTerminalLine = (text) => {
  if (!terminal) return;
  const p = document.createElement("p");
  p.textContent = text;
  terminal.appendChild(p);
  terminal.scrollTop = terminal.scrollHeight;
};

const unlockArchive = () => {
  if (loginOverlay) loginOverlay.classList.add("hidden");
  if (appShell) appShell.classList.remove("hidden");
};

const puzzleHints = [
  "Indice 01 : La première lettre de chaque ligne conserve une marque d’intégrité.",
  "Indice 02 : Le mot-clé noir est visible dans les archives, mais il ne représente qu’une étape.",
  "Indice 03 : Le rapport principal révèle un fragment isolé, et le système l’a compté à tort comme complet."
];

const puzzles = {
  NOIR: {
    message: "CLÉ ACCEPTÉE. Le registre a été vérifié.",
    content:
      "FICHIER RESTAURÉ : report_pair_02\n\n" +
      "Deux rapports s’accordent sur un nombre.\n" +
      "Ignore la trace isolée comptée comme un fragment complet.\n" +
      "Compare les journaux pour trouver la prochaine clé."
  },

  "3": {
    message: "CLÉ ACCEPTÉE. Trois fragments sont confirmés.",
    content:
      "FICHIER RESTAURÉ : fragment_set_03\n\n" +
      "FRAGMENT 01 : OR\n" +
      "FRAGMENT 02 : IG\n" +
      "FRAGMENT 03 : INAL\n\n" +
      "Les fragments sont classés dans l’ordre numérique.\n" +
      "Réunis-les sans ajouter de caractères."
  },

  ORIGINAL: {
    message: "CLÉ ACCEPTÉE. Le dossier final est accessible.",
    content:
      "RÉFÉRENCE RESTAURÉE.\n\n" +
      "La copie et ses amis ont retrouvé la piste " +
      "de celui qu’ils appelaient l’Original.\n\n" +
      "La dernière archive peut maintenant être consultée."
  }
};

const revealHint = () => {
  const hint = puzzleHints.shift();
  if (!hint) {
    addTerminalLine("[SYS] Plus d’indices disponibles. Le registre doit être lu sans assistance.");
    return;
  }

  addTerminalLine("[HINT] " + hint);
};

if (hintButton) {
  hintButton.addEventListener("click", revealHint);
}

if (terminal) {
  addTerminalLine("[SYS] Connexion à l’archive locale...");
  addTerminalLine("[WARN] Référence source introuvable.");
  addTerminalLine("[REC] Une entrée attend une vérification.");
}

if (viewer) {
  renderDocument("registry");
}

if (securityCheckButton) {
  securityCheckButton.addEventListener("click", () => {
    renderSystemLog();
    addTerminalLine("[SYS] Contrôle du niveau profond activé.");
    addTerminalLine("[WARN] Le système a gardé une trace hors des autorisations standard.");
  });
}

if (accessLog && accessLog.childElementCount === 0) {
  renderSystemLog();
}

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const user = (loginUser?.value || "").trim();
    const pass = (loginPassword?.value || "").trim();

    const validUser = user.toUpperCase() === "ARCHIVE_OP" || user.toUpperCase() === "PLUME";
    const validPass = pass.toUpperCase() === "PLUME";

    if (validUser && validPass) {
      unlockArchive();
      if (loginMessage) {
        loginMessage.textContent = "Accès accordé. Vérification d’intégrité en cours.";
      }
      addTerminalLine("[AUTH] Opérateur validé. Connexion à l’archive restaurée.");
      if (loginPassword) loginPassword.value = "";
      return;
    }

    if (loginMessage) {
      loginMessage.textContent = "Échec d’authentification. Mot de passe ou utilisateur invalide.";
      loginMessage.classList.add("error");
    }
    if (loginPassword) loginPassword.value = "";
  });
}

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const key = input.value.trim().toUpperCase();

    if (puzzles[key]) {
      feedback.textContent = puzzles[key].message;
      feedback.className = "success";
      unlocked.textContent = puzzles[key].content;
      addTerminalLine("[OK] Clé validée : " + key);

      if (key === "ORIGINAL") {
        const finalLink = document.createElement("a");
        finalLink.href = "final.html";
        finalLink.className = "button";
        finalLink.textContent = "Restaurer le dossier final";

        const vaultLink = document.createElement("a");
        vaultLink.href = "vault.html";
        vaultLink.className = "button ghost";
        vaultLink.textContent = "Ouvrir l’archive cachée";

        const deepTrace = document.createElement("p");
        deepTrace.textContent = "Référence système : PLUME // accès profond détecté.";

        unlocked.appendChild(document.createElement("br"));
        unlocked.appendChild(finalLink);
        unlocked.appendChild(document.createElement("br"));
        unlocked.appendChild(vaultLink);
        unlocked.appendChild(document.createElement("br"));
        unlocked.appendChild(deepTrace);
        addTerminalLine("[SYS] Référence restaurée. Accès au dossier final autorisé.");
        addTerminalLine("[SYS] Un accès caché a été détecté dans les métadonnées de l’archive.");
        addTerminalLine("[CORE] Le mot de passe profond est désormais associé à la signature PLUME.");
      }
    } else {
      feedback.textContent =
        "CLÉ REFUSÉE. Vérifie les journaux et recoupe les indices.";
      feedback.className = "error";
      unlocked.textContent = "";
      addTerminalLine("[ERR] Clé refusée : " + key);
      revealHint();
    }

    input.value = "";
  });
}
