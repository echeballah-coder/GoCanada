/**
 * @file modules/pwa.js
 * @description Enregistrement du Service Worker et gestion PWA.
 */

/**
 * Initialise la PWA (Service Worker + Manifest).
 */
export function initPWA() {
  // Vérifier le support du Service Worker
  if (!('serviceWorker' in navigator)) {
    console.log('ℹ️ Service Worker non supporté par ce navigateur');
    return;
  }

  // Enregistrer le Service Worker
  registerServiceWorker();

  // Gérer les événements PWA
  handlePWAEvents();
}

/**
 * Enregistre le Service Worker.
 */
async function registerServiceWorker() {
  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    console.log('✅ Service Worker enregistré:', registration.scope);

    // Vérifier les mises à jour
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      console.log("🔄 Nouvelle version du Service Worker en cours d'installation...");

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // Une nouvelle version est disponible
          showUpdateNotification();
        }
      });
    });
  } catch (error) {
    console.error("❌ Erreur lors de l'enregistrement du Service Worker:", error);
  }
}

/**
 * Affiche une notification de mise à jour disponible.
 */
function showUpdateNotification() {
  // Créer une alerte simple
  const notification = document.createElement('div');
  notification.className = 'pwa-update-notification';
  notification.innerHTML = `
    <div style="
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--color-primary);
      color: white;
      padding: 1rem 2rem;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      z-index: 10000;
      display: flex;
      align-items: center;
      gap: 1rem;
    ">
      <span>Une nouvelle version est disponible !</span>
      <button onclick="window.location.reload()" style="
        background: white;
        color: var(--color-primary);
        border: none;
        padding: 0.5rem 1rem;
        border-radius: var(--radius-md);
        cursor: pointer;
        font-weight: 600;
      ">Mettre à jour</button>
    </div>
  `;

  document.body.appendChild(notification);
}

/**
 * Gère les événements PWA (installation, etc.).
 */
function handlePWAEvents() {
  let deferredPrompt;

  // Événement avant installation
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;

    // Afficher un bouton d'installation personnalisé
    showInstallButton(deferredPrompt);
  });

  // Événement après installation
  window.addEventListener('appinstalled', () => {
    console.log('✅ PWA installée avec succès');
    deferredPrompt = null;
  });
}

/**
 * Affiche un bouton pour installer la PWA.
 * @param {Event} deferredPrompt - L'événement d'installation différé.
 */
function showInstallButton(deferredPrompt) {
  const installButton = document.createElement('button');
  installButton.className = 'pwa-install-button';
  installButton.innerHTML = "📲 Installer l'application";
  installButton.style.cssText = `
    position: fixed;
    bottom: 80px;
    right: 20px;
    padding: 12px 24px;
    background: var(--color-accent);
    color: white;
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    box-shadow: var(--shadow-lg);
    font-weight: 600;
    z-index: 1000;
    transition: transform 0.3s ease;
  `;

  installButton.addEventListener('click', async () => {
    installButton.style.display = 'none';
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Installation ${outcome === 'accepted' ? 'acceptée' : 'refusée'}`);

    deferredPrompt = null;
  });

  installButton.addEventListener('mouseenter', () => {
    installButton.style.transform = 'translateY(-3px)';
  });

  installButton.addEventListener('mouseleave', () => {
    installButton.style.transform = 'translateY(0)';
  });

  document.body.appendChild(installButton);

  // Masquer après 10 secondes
  setTimeout(() => {
    if (installButton.parentElement) {
      installButton.style.opacity = '0';
      setTimeout(() => installButton.remove(), 300);
    }
  }, 10000);
}
