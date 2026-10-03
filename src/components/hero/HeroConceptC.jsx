import React from 'react';
import './HeroConceptC.css';

// CONCEPT C: ARCHITECTURAL ACCORDION
// Brutalist / UI-Driven Layout. Entire screen is sliced into flex panes that expand on hover.

export default function HeroConceptC() {
  return (
    <div className="hcc-wrapper">
      
      {/* Pane 1: Name (Dark) */}
      <div className="hcc-pane hcc-dark group">
        <div className="hcc-pane-content hcc-vertical-text">
          <span>P O N N A D A</span>
        </div>
      </div>

      {/* Pane 2: Bio (Light) */}
      <div className="hcc-pane hcc-light group">
        <div className="hcc-pane-content hcc-flex-center">
          <div className="hcc-bio">
            <div className="hcc-bio-tag">[ 01 ] THE RANGE</div>
            <p>I build across disciplines. Artificial Intelligence, Quantum Computing, Distributed Systems, and High-Performance Software Engineering.</p>
          </div>
        </div>
      </div>

      {/* Pane 3: Cinematic Image (Dark) */}
      <div className="hcc-pane hcc-dark hcc-image-pane group">
        <img src="/jagadish_cinematic_hero.jpg" alt="Jagadish" className="hcc-bg-image" />
        <div className="hcc-pane-overlay"></div>
        <div className="hcc-pane-content hcc-flex-bottom">
          <h2 className="hcc-image-title">JAGADISH</h2>
        </div>
      </div>

      {/* Pane 4: Stats (Light) */}
      <div className="hcc-pane hcc-light group">
        <div className="hcc-pane-content hcc-flex-center">
          <ul className="hcc-stats-list">
            <li><span>AMAZON ML CHALLENGE</span> <strong>'26</strong></li>
            <li><span>LEETCODE SOLVED</span> <strong>425+</strong></li>
            <li><span>BASE OF OPERATIONS</span> <strong>INDIA</strong></li>
          </ul>
        </div>
      </div>

      {/* Pane 5: Name (Dark) */}
      <div className="hcc-pane hcc-dark group">
        <div className="hcc-pane-content hcc-vertical-text">
          <span>J A G A D I S H</span>
        </div>
      </div>

    </div>
  );
}
