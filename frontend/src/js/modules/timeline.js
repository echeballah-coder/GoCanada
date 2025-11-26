/**
 * @file modules/timeline.js
 * @description Gestion de l'animation de la timeline au scroll.
 * Révèle progressivement les étapes et anime la ligne de progression.
 */

/**
 * Initialise la timeline avec animations au scroll.
 */
export function initTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineProgress = document.querySelector('.timeline-progress');
  const timeline = document.querySelector('.timeline');

  if (!timeline || timelineItems.length === 0) {
    console.log('Timeline: No timeline elements found');
    return;
  }

  /**
   * Observer pour détecter quand un item entre dans le viewport.
   */
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          updateProgressBar();
        }
      });
    },
    {
      threshold: 0.3, // 30% visible
      rootMargin: '0px 0px -100px 0px',
    }
  );

  // Observer chaque timeline item
  timelineItems.forEach(item => observer.observe(item));

  /**
   * Met à jour la barre de progression basée sur les items révélés.
   */
  function updateProgressBar() {
    if (!timelineProgress) return;

    const revealedItems = document.querySelectorAll('.timeline-item.revealed');
    const totalItems = timelineItems.length;
    const progressPercent = (revealedItems.length / totalItems) * 100;

    timelineProgress.style.height = `${progressPercent}%`;
  }

  /**
   * Scroll smooth vers une étape spécifique.
   * @param {number} stepNumber - Numéro de l'étape (1-8).
   */
  function scrollToStep(stepNumber) {
    const step = document.querySelector(`[data-timeline-step="${stepNumber}"]`);
    if (step) {
      step.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }

  // Exposer la fonction pour usage externe si nécessaire
  window.scrollToTimelineStep = scrollToStep;

  console.log(`✅ Timeline initialized: ${timelineItems.length} steps`);
}
