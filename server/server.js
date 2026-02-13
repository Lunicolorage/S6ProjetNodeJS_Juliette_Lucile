// ============================================
// IMPORTATION DES MODULES
// ============================================

// Express : framework pour créer le serveur web
const express = require('express');

// fs (File System) : pour lire et écrire des fichiers
const fs = require('fs');

// path : pour gérer les chemins de fichiers de manière sûre
const path = require('path');

// cors : pour permettre à React (frontend) de communiquer avec Express (backend)
const cors = require('cors');


// ============================================
// CONFIGURATION DE L'APPLICATION
// ============================================

// Créer l'application Express
const app = express();

// Définir le port (comme un numéro de porte d'entrée)
const PORT = process.env.PORT || 5000;

// Chemin vers le fichier qui stockera nos événements
const eventsFilePath = path.join(__dirname, 'data', 'events.json');


// ============================================
// MIDDLEWARE (fonctions qui traitent les requêtes)
// ============================================

// Permet à React (port 3000) de communiquer avec notre serveur (port 5000)
app.use(cors());

// Permet de lire le JSON envoyé par le client
// Sans ça, req.body serait undefined
app.use(express.json());

// Logger simple pour voir les requêtes dans la console
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Passer à la fonction suivante
});


// ============================================
// FONCTIONS UTILITAIRES
// ============================================

/**
 * Lire les événements depuis le fichier JSON
 * @returns {Array} Liste des événements
 */
function readEvents() {
  try {
    // Vérifier si le fichier existe
    if (!fs.existsSync(eventsFilePath)) {
      return []; // Si pas de fichier, retourner un tableau vide
    }
    
    // Lire le contenu du fichier (en texte)
    const data = fs.readFileSync(eventsFilePath, 'utf8');
    
    // Convertir le texte JSON en objet JavaScript
    return JSON.parse(data);
    
  } catch (error) {
    console.error('Erreur lors de la lecture des événements:', error);
    return [];
  }
}

/**
 * Écrire les événements dans le fichier JSON
 * @param {Array} events - Liste des événements à sauvegarder
 */
function writeEvents(events) {
  try {
    // Créer le dossier 'data' s'il n'existe pas
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }
    
    // Convertir les événements en texte JSON (avec indentation de 2 espaces)
    // null, 2 = formatage pour rendre le fichier lisible
    const jsonData = JSON.stringify(events, null, 2);
    
    // Écrire dans le fichier
    fs.writeFileSync(eventsFilePath, jsonData, 'utf8');
    
  } catch (error) {
    console.error('Erreur lors de l\'écriture des événements:', error);
  }
}


// ============================================
// ROUTES API
// ============================================

// Route de test pour vérifier que le serveur fonctionne
app.get('/', (req, res) => {
  res.json({ 
    message: 'Serveur d\'événements actif !',
    endpoints: [
      'GET /api/events - Liste tous les événements',
      'GET /api/events/:id - Récupère un événement spécifique',
      'POST /api/events - Crée un nouvel événement',
      'POST /api/events/:id/vote - Vote pour un événement',
      'DELETE /api/events/:id - Supprime un événement'
    ]
  });
});


// ============================================
// ROUTES
// ============================================

// Route GET /api/events - Récupérer tous les événements
app.get('/api/events', (req, res) => {
    const events = readEvents()
    res.json({events})
})

// Route GET /api/events/:id - Récupérer un événement spécifique
app.get('/api/events/:id', (req, res) => {
  const id = req.params.id;
  const events = readEvents();
  const event = events.find(e => e.id == id);
  if (event) {
    res.json(event); 
  } else { 
    res.status(404).json({ error: 'Événement non trouvé' }); 
  } 
});

<<<<<<< create
// Route POST /api/events - Ajouter un nouvel événement
=======
// TODO: Route POST /api/events - Ajouter un nouvel événement
>>>>>>> affichage
app.post('/api/events', (req, res) => { // post dans action form
    const events = readEvents()
    
    // let newEvents = 
    //     {"titre": "tes2",
    //     "description": "azryio zertyui sdfg sdfghj rtyui sdfghj",
    //     "dateHeure": "2026-04-10T06:13:45.000Z",
    //     "lieu": "8 rue des petites écuries 44000 Nantes",
    //     "nbVotes": 3};

    let newEvent = req.body;
    newEvent.id = Date.now();
    if (typeof newEvent.nbVotes !== 'number') {
      newEvent.nbVotes = 0;
    }

    events.push(newEvent);
    // events = [...events, newEvents]

    writeEvents(events)
    res.status(201).json(newEvent);
})

// Route POST /api/events/:id/vote - Voter pour un événement
app.post('/api/events/:id/vote', (req, res) => {
  const id = req.params.id;
  const events = readEvents();
  const event = events.find(e => e.id == id);

  //changer le nombre de votes
  if (event) {
    event.nbVotes += 1;
  } else { 
    res.status(404).json({ error: 'Événement non trouvé' }); 
    return; 
  }    
  
  //remplacer l'event dans le tableau des events
  events.forEach((ev, index) => {
    if (ev.id == id){
      events[index] = event;
    }
  })

  writeEvents(events)
  res.json(event);
})

// TODO: Route DELETE /api/events/:id - Supprimer un événement

// ============================================
// FRONT REACT (build statique)
// ============================================

// Sert les fichiers statiques du build React
app.use(express.static(path.join(__dirname, 'front/dist'))); // 'dist' pour Vite, 'build' pour CRA

// Toutes les routes non-API renvoient index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../front/dist', 'index.html'));
});

// ============================================
// GESTION DES ERREURS
// ============================================

// Gestionnaire d'erreurs global
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err);
  res.status(500).json({ 
    error: 'Erreur interne du serveur',
    message: err.message 
  });
});


// ============================================
// DÉMARRAGE DU SERVEUR
// ============================================

app.listen(PORT, () => {
  console.log('════════════════════════════════════════');
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
  console.log('════════════════════════════════════════');
  console.log('Routes disponibles :');
  console.log(`  → http://localhost:${PORT}/`);
  console.log(`  → http://localhost:${PORT}/api/events`);
  console.log(`  → http://localhost:${PORT}/api/events/:id`);
  console.log(`  → http://localhost:${PORT}/api/events/:id/vote`);
  console.log('════════════════════════════════════════');
});
