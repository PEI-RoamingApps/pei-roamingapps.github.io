import { useMemo } from 'react';
import Particles, { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine, ISourceOptions } from '@tsparticles/engine';

const initParticles = async (engine: Engine) => loadSlim(engine);

export default function LineAtmosphere() {
  const options = useMemo<ISourceOptions>(() => ({
    background: { color: { value: 'transparent' } },
    fullScreen: { enable: false },
    fpsLimit: 40,
    detectRetina: true,
    particles: {
      number: { value: 56, density: { enable: true, width: 1200, height: 900 } },
      color: { value: '#0b4f4a' },
      opacity: { value: 0 },
      size: { value: 0 },
      links: {
        enable: true,
        color: '#168c80',
        distance: 205,
        opacity: 0.3,
        width: 1.15,
      },
      move: {
        enable: true,
        speed: 0.2,
        direction: 'none',
        random: true,
        straight: false,
        outModes: { default: 'out' },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' },
        resize: { enable: true },
      },
      modes: { grab: { distance: 180, links: { opacity: 0.42 } } },
    },
  }), []);

  return (
    <div className="line-atmosphere" aria-hidden="true">
      <div className="gradient-blur gradient-blur--primary" />
      <div className="gradient-blur gradient-blur--secondary" />
      <div className="gradient-blur gradient-blur--accent" />
      <div className="gradient-blur gradient-blur--small" />
      <ParticlesProvider init={initParticles}>
        <Particles id="line-particles" className="line-particles" options={options} />
      </ParticlesProvider>
    </div>
  );
}
