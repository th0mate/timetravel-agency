# TimeTravel Agency - Webapp Interactive

Webapp moderne et immersive pour une agence de voyage temporel fictive, développée avec React et l'assistance de l'IA.

## 🛠 Stack Technique
- **Framework :** React + TypeScript (Vite)
- **Styling :** Tailwind CSS
- **Animations :** Framer Motion
- **Icônes :** Lucide React
- **Déploiement :** Github Actions + Github Pages

## ✨ Features
- **Landing Page Immersive :** Hero section avec animations et design "premium" (Dark/Gold).
- **Galerie de Destinations :** Cartes interactives pour Paris 1889, le Crétacé et Florence 1504.
- **Chatbot IA (UI) :** Widget conversationnel avec simulation de réponses intelligentes.
- **Responsive Design :** Interface adaptée mobile et desktop.

## 🎁 Easter Eggs
Le site contient des secrets cachés pour les voyageurs les plus attentifs :
1.  **L'Anomalie :** Tapez le code secret `chronos` au clavier pour déclencher une alerte temporelle visuelle.
2.  **Le Paradoxe :** Cliquez 5 fois sur le sablier doré du logo pour le faire entrer en rotation infinie et changer sa couleur.
3.  **Le Cri du Passé :** Survolez le prix de la destination "Crétacé" pendant 2 secondes pour réveiller le T-Rex.

## 🤖 IA Utilisées
- **Assistant de Coding :** Google Gemini (Génération du code, structure, debugging).
- **Agent Conversationnel :** Mistral AI (Modèle `mistral-tiny`) via SDK officiel.
- **Visuels :** Générés par Midjourney/DALL-E lors de la séance 1.

## 📝 Prompts Documentés (Chatbot)
L'agent **Chronos** utilise un "System Prompt" structuré pour garantir une cohérence de réponse et respecter l'univers de l'agence :

- **Rôle & Identité :** "Tu es l'assistant virtuel de TimeTravel Agency... Ton nom est Chronos."
- **Ton & Personnalité :** "Professionnel mais chaleureux, passionné d'histoire, enthousiaste."
- **Base de Connaissances :** Définition stricte des 3 destinations (Paris 1889, Crétacé, Florence 1504) avec leurs prix et services inclus.
- **Contraintes de Réponse :** "Reste concis (max 3-4 phrases)", "Suggère une destination selon les intérêts (art, aventure, technologie)".

## 🚀 Installation

1.  Cloner le repo :
    ```bash
    git clone <votre-repo>
    cd timetravel-agency
    ```

2.  Installer les dépendances :
    ```bash
    npm install
    ```

3.  Lancer le serveur de développement :
    ```bash
    npm run dev
    ```

4.  Ouvrir `http://localhost:5173` dans votre navigateur.

## 📝 Crédits
Projet réalisé dans le cadre du cours "IA M1".
Développé par Lorick VERGNES, Yoann FERMAUD, Florian BELIS, Thomas LOYE avec l'aide de l'IA.
