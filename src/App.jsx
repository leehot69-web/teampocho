import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaWhatsapp, FaFacebookF, FaChevronRight } from 'react-icons/fa';
import './App.css';

// --- Configuration Data ---
const PROFILE = {
  name: "TEAM POCHO",
  bio: "Somos el mejor equipo de restaurantes de la ciudad de Maracaibo 🍕📍🍔",
  image: "/logos/profile-main.jpg",
  socials: [
    { icon: <FaInstagram />, url: "#", label: "Instagram" },
    { icon: <FaWhatsapp />, url: "#", label: "WhatsApp" },
    { icon: <FaFacebookF />, url: "#", label: "Facebook" }
  ]
};

const LINKS = [
  {
    id: 1,
    title: "PROMO CUMPLEAÑERA",
    subtitle: "¡Celebra con nosotros!",
    url: "/promo-cumple.png",
    image: "/logos/logo-promo.jpg",
    color: "#FFD700",
    isPromo: true
  },
  {
    id: 2,
    title: "PAQPOCHO",
    subtitle: "@paqpocho",
    url: "https://www.instagram.com/paqpocho?igsh=MXI0dDB0eHR5Y3hoaA%3D%3D&utm_source=qr",
    image: "/logos/logo-paqpocho.png",
    video: "/videos/paqpocho.mp4",
    color: "#FF5722"
  },
  {
    id: 3,
    title: "POCHO BISTRO",
    subtitle: "@pochobistro",
    url: "https://www.instagram.com/pochobistro?igsh=MWVmODh2dTd1Z2hmeA%3D%3D&utm_source=qr",
    image: "/logos/logo-pochobistro.jpg",
    video: "/videos/pochobistro.mp4",
    color: "#fff"
  },
  {
    id: 4,
    title: "POCHO MAR Y TIERRA",
    subtitle: "@pochomarytierra",
    url: "https://www.instagram.com/pochomarytierra?igsh=MTJ0NWE3NmxtY3JwYw%3D%3D&utm_source=qr",
    image: "/logos/logo-marytierra.jpg",
    video: "/videos/marytierra.mp4",
    color: "#00BCD4"
  },
  {
    id: 5,
    title: "MARGARITA",
    subtitle: "@margarita_mcbo",
    url: "https://www.instagram.com/margarita_mcbo?igsh=MWtqOHljODZoc2F5OQ%3D%3D&utm_source=qr",
    image: "/logos/logo-margarita.jpg",
    video: "/videos/margarita.mp4",
    color: "#E91E63"
  },
  {
    id: 6,
    title: "MI RANCHITO",
    subtitle: "@miranchito_maracaibo",
    url: "https://www.instagram.com/miranchito_maracaibo?igsh=MWZud2Q2OGo0dHRpag%3D%3D&utm_source=qr",
    image: "/logos/logo-miranchito.jpg",
    video: "/videos/miranchito.mp4",
    color: "#795548"
  }
];

// --- 3D Tilt Card Component ---
const TiltCard = ({ children, className }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      className={className}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};

// --- Main App Component ---
function App() {
  const [showPromo, setShowPromo] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const regularLinks = LINKS.filter(link => !link.isPromo);

  const handleStoreClick = (e, link) => {
    e.preventDefault();
    setSelectedStore(link);
  };

  const handleVisitStore = () => {
    if (selectedStore) {
      window.open(selectedStore.url, '_blank');
      // Optional: don't close modal to let them come back to video, or close it:
      // setSelectedStore(null); 
    }
  };

  return (
    <div className="app-container">
      <div className="background-gradient" />
      <div className="background-noise" />

      {/* Promo Trigger Button (New Hero) */}
      <motion.button
        className="promo-trigger"
        onClick={() => setShowPromo(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="promo-trigger-content">
          <h2>¡TU PLATO ES GRATIS!</h2>
          <p>Click para ver condiciones 🎁</p>
        </div>
        <div className="promo-icon">🎂</div>
      </motion.button>

      {/* Profile Section */}
      <motion.header
        className="profile-section"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <div className="avatar-container">
          <motion.img
            src={PROFILE.image}
            alt="Profile"
            className="avatar-image"
            whileHover={{ scale: 1.1, rotate: 5 }}
          />
          <div className="status-dot" />
        </div>

        <h1 className="profile-name">
          {PROFILE.name} <span style={{ fontSize: '1.5rem' }}>🍕</span>
        </h1>

      </motion.header>

      {/* Links Section */}
      <div className="links-grid">
        {regularLinks.map((link, idx) => (
          <TiltCard key={link.id} className="card-wrapper">
            <a
              href={link.url}
              onClick={(e) => handleStoreClick(e, link)}
              className="link-card"
            >
              <div className="link-image-wrapper">
                <img src={link.image} alt={link.title} className="link-image" />
              </div>

              <div className="link-content">
                <div className="link-title">{link.title}</div>
                {link.subtitle && <div className="link-subtitle">{link.subtitle}</div>}
              </div>

              <FaChevronRight className="link-arrow" />
            </a>
          </TiltCard>
        ))}
      </div>

      <footer className="footer">
        <p>© 2024 Team Pocho. Todos los derechos reservados.</p>
        <p style={{ marginTop: '0.5rem', opacity: 0.5 }}>Powered by PagoMatic</p>
      </footer>

      {/* Promo Modal Overlay */}
      <AnimatePresence>
        {showPromo && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPromo(false)}
          >
            <motion.div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <button className="close-modal-btn" onClick={() => setShowPromo(false)}>✕</button>

              <div style={{ transform: 'scale(1.2)', display: 'inline-block', marginBottom: '1rem' }}>🎉</div>
              <h2 className="modal-title-highlight">TU PLATO ES GRATIS</h2>
              <p className="modal-subtitle">Promo Cumpleañeros válida en:</p>

              <div className="modal-logos-grid">
                <div className="logos-track">
                  {/* Duplicate list for infinite scroll effect */}
                  {[...regularLinks, ...regularLinks, ...regularLinks].map((link, idx) => (
                    <img key={`${link.id}-${idx}`} src={link.image} alt={link.title} className="modal-logo" title={link.title} />
                  ))}
                </div>
              </div>

              <div className="requirements-box">
                <h3 className="req-title">📋 REQUISITOS:</h3>
                <ul className="req-list">
                  <li>Consumo mínimo de <strong>$50</strong> en la mesa.</li>
                  <li>Venir acompañado de <strong>5 personas</strong> o más.</li>
                  <li>Mostrar <strong>documento de identidad</strong> (Cédula/Pasaporte).</li>
                  <li><strong>Etiquetarnos</strong> en tu post de cumpleaños en Instagram.</li>
                </ul>
              </div>

              <p style={{ fontSize: '0.8rem', marginTop: '1.5rem', opacity: 0.6 }}>* Nos reservamos el derecho de admisión. Válido solo el día del cumpleaños.</p>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Store Video Modal */}
      <AnimatePresence>
        {selectedStore && (
          <motion.div
            className="modal-overlay video-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStore(null)}
          >
            <motion.div
              className="video-modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button className="close-modal-btn video-close-btn" onClick={() => setSelectedStore(null)}>✕</button>

              <div className="video-wrapper">
                <video
                  src={selectedStore.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="store-video"
                />
              </div>

              <div className="video-modal-footer">
                <div className="store-info">
                  <img src={selectedStore.image} alt="Easy" className="mini-logo" />
                  <div>
                    <h3>{selectedStore.title}</h3>
                    <span>{selectedStore.subtitle}</span>
                  </div>
                </div>
                <button className="visit-btn" onClick={handleVisitStore}>
                  Ver Perfil <FaChevronRight size={12} style={{ marginLeft: 5 }} />
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
