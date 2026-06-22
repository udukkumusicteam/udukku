import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { VISION_MISSION } from '../data/mockData';

export const VisionMission = () => (
  <section
    data-testid="vision-mission-section"
    className="bg-orange text-white"
  >
    <div className="udukku-section py-16 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Image card */}
        <div className="relative">
          <div
            className="relative w-full overflow-hidden rounded-3xl bg-orange-dark"
            style={{ aspectRatio: '1 / 1' }}
            data-testid="vision-image-card"
          >
            <img
              src={VISION_MISSION.image}
              alt="What is udukku"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6 flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-white/15 border border-white/30 text-white text-xs uppercase tracking-widest">
                Est. {VISION_MISSION.est}
              </span>
            </div>
          </div>
        </div>

        {/* Text */}
        <div>
          <span className="uppercase tracking-[0.28em] text-xs text-white/80">
            Shaping musicians since {VISION_MISSION.est}
          </span>
          <h2 className="text-display mt-4 text-4xl sm:text-5xl lg:text-[56px] leading-[1.05]">
            A space that holds you{' '}
            <span className="text-italic-serif text-white">
              while you find your sound.
            </span>
          </h2>

          <div className="mt-8 space-y-8">
            <div data-testid="vision-block">
              <h3 className="text-italic-serif text-2xl mb-3">
                {VISION_MISSION.vision.title}
              </h3>
              <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-xl">
                {VISION_MISSION.vision.body}
              </p>
            </div>
            <div data-testid="mission-block">
              <h3 className="text-italic-serif text-2xl mb-3">
                {VISION_MISSION.mission.title}
              </h3>
              <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-xl">
                {VISION_MISSION.mission.body}
              </p>
            </div>
          </div>

          <Link
            to="/about"
            data-testid="vision-read-story"
            className="mt-8 inline-flex items-center gap-2 h-12 px-7 rounded-full bg-brown-dark text-white text-base font-medium hover:bg-black transition-colors"
          >
            Read Our Story <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default VisionMission;
