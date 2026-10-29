// =============================================================================
// Web Developers — Award-Caliber Scrollytelling Choreography Engine
// Tech: GSAP + ScrollTrigger + Lenis smooth scroll + Split-Text reveals + Tilt
// =============================================================================

document.addEventListener("DOMContentLoaded", () => {
  const config = window.SITE_CONFIG || {};

  // 1. Initialize Lenis Smooth Scroll (Optimized for 60-120fps; Native Momentum on Mobile)
  let lenis = null;
  const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches || ('ontouchstart' in window);

  // On touch devices, use native hardware momentum scrolling for zero lag
  if (typeof Lenis !== "undefined" && !isReduced) {
    lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.95,
      smoothWheel: !isTouchDevice,
      smoothTouch: false,
    });
    window.lenis = lenis;

    // Synchronize Lenis cleanly with GSAP ScrollTrigger ticker (single RAF loop)
    if (typeof ScrollTrigger !== "undefined") {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(500, 33);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  // 2. Preloader Animation (Under 1.4s)
  const preloader = document.getElementById("preloader");
  const preloaderCount = document.getElementById("preloader-count");
  if (preloader && preloaderCount) {
    let count = 0;
    const interval = setInterval(() => {
      count += 7;
      if (count > 100) count = 100;
      preloaderCount.textContent = count + "%";
      if (count === 100) {
        clearInterval(interval);
        setTimeout(() => {
          preloader.classList.add("hide");
          triggerHeroEntrance();
        }, 300);
      }
    }, 45);
  } else {
    triggerHeroEntrance();
  }

  // 3. Hero Masked Entrance Reveal
  function triggerHeroEntrance() {
    if (typeof gsap === "undefined") return;

    gsap.from(".hero-line-mask .hero-headline span", {
      y: "115%",
      duration: 1.1,
      ease: "power3.out",
      stagger: 0.12,
      delay: 0.2
    });

    gsap.from(".hero-subheadline", {
      opacity: 0,
      y: 20,
      duration: 0.9,
      ease: "power3.out",
      delay: 0.6
    });

    gsap.from(".hero-cta-row", {
      opacity: 0,
      y: 18,
      duration: 0.9,
      ease: "power3.out",
      delay: 0.8
    });

    gsap.from("#peeking-phone", {
      y: 120,
      opacity: 0.4,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.5
    });
  }

  // 4. Custom Desktop Magnetic Micro-Halo Cursor
  const cursor = document.getElementById("custom-cursor");
  if (cursor && window.matchMedia("(pointer: fine)").matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX = mouseX;
    let curY = mouseY;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    window.addEventListener("mousedown", () => {
      cursor.classList.add("cursor-clicking");
    });
    window.addEventListener("mouseup", () => {
      cursor.classList.remove("cursor-clicking");
    });

    function renderCursor() {
      curX += (mouseX - curX) * 0.22;
      curY += (mouseY - curY) * 0.22;
      cursor.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    document.addEventListener("mouseleave", () => {
      cursor.style.opacity = "0";
    });
    document.addEventListener("mouseenter", () => {
      cursor.style.opacity = "1";
    });

    // Smooth halo hover states — Never covers or obscures button text
    document.querySelectorAll("a, button, .interactive-hover").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        if (el.classList.contains("btn-wa-pill") || el.classList.contains("btn-huge-wa") || el.dataset.cursor === "whatsapp") {
          cursor.classList.add("cursor-hover-wa");
        } else {
          cursor.classList.add("cursor-hover");
        }
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("cursor-hover-wa");
        cursor.classList.remove("cursor-hover");
      });
    });
  }

  // Clean Smooth Fast Glide for Internal Anchors (High-Speed Inertia & Feather Landing)
  window.smoothGlideTo = function(target, offset = -60, duration = 1.0) {
    if (!target) return;
    if (window.lenis && typeof window.lenis.scrollTo === "function") {
      window.lenis.scrollTo(target, {
        offset: offset,
        duration: duration,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
      return;
    }
    const startY = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = target.getBoundingClientRect().top + startY + offset;
    const distance = targetY - startY;
    if (Math.abs(distance) < 4) return;
    const durationMs = duration * 1000;
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      window.scrollTo(0, Math.round(startY + distance * ease));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  };

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function(e) {
      const href = this.getAttribute("href");
      if (!href) return;
      if (href === "#") {
        e.preventDefault();
        window.smoothGlideTo(document.body, 0, 0.8);
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        window.smoothGlideTo(target, -60, 1.0);
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, null, window.location.pathname + window.location.search);
        }
      }
    });
  });

  // 5. Reading Progress Bar & Minimal Sticky Nav (Robust Hysteresis — No Jitter / Glitch)
  const progressBar = document.getElementById("reading-progress");
  const siteHeader = document.getElementById("site-header");
  let lastAnchorY = window.scrollY || 0;
  let isNavHidden = false;
  const SCROLL_DEADBAND = 16; // Minimum pixels moved before toggling state

  function handleScrollUpdate(scrollY) {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0 && progressBar) {
      const pct = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
      progressBar.style.width = pct + "%";
    }

    if (!siteHeader) return;

    // Always keep visible when near the top
    if (scrollY <= 120) {
      if (isNavHidden) {
        siteHeader.classList.remove("nav-hidden");
        isNavHidden = false;
      }
      lastAnchorY = scrollY;
      return;
    }

    const delta = scrollY - lastAnchorY;

    // Ignore tiny scroll variations / deceleration oscillations when stopped
    if (Math.abs(delta) < SCROLL_DEADBAND) {
      return;
    }

    if (delta > 0 && scrollY > 160) {
      // Affirmative scroll DOWN
      if (!isNavHidden) {
        siteHeader.classList.add("nav-hidden");
        isNavHidden = true;
      }
      lastAnchorY = scrollY;
    } else if (delta < 0) {
      // Affirmative scroll UP
      if (isNavHidden) {
        siteHeader.classList.remove("nav-hidden");
        isNavHidden = false;
      }
      lastAnchorY = scrollY;
    }
  }

  // Hook into Lenis scroll event if active, fallback to native window scroll
  if (lenis) {
    lenis.on("scroll", (e) => {
      handleScrollUpdate(e.scroll);
    });
  } else {
    window.addEventListener("scroll", () => {
      handleScrollUpdate(window.scrollY);
    }, { passive: true });
  }

  // 6. GSAP SCENE PINNING & SCRUBBING
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined" && !isReduced) {
    gsap.registerPlugin(ScrollTrigger);

    // SCENE 1: Typing Simulation on Scroll
    const queryTarget = "Your Business Name Gokak";
    const googleTextElem = document.getElementById("google-typing-text");

    ScrollTrigger.create({
      trigger: "#scene-1",
      start: "top 75%",
      end: "top 35%",
      scrub: 0.5,
      onUpdate: (self) => {
        if (!googleTextElem) return;
        const charCount = Math.floor(self.progress * queryTarget.length);
        googleTextElem.textContent = queryTarget.substring(0, charCount);
      }
    });

    // SCENE 2: The Middleman Cut Counter (Finishes in 1s right in front of user's eyes)
    const commMeterNum = document.getElementById("commission-meter-num");
    const commMeterSlice = document.getElementById("bill-cut-slice");
    let commCounter = { val: 0 };
    let commTween = null;

    ScrollTrigger.create({
      trigger: "#scene-2",
      start: "top 65%",
      onEnter: () => {
        if (commTween) commTween.kill();
        commCounter.val = 0;
        commTween = gsap.to(commCounter, {
          val: 280,
          duration: 1.0,
          ease: "power2.out",
          onUpdate: () => {
            if (commMeterNum) {
              commMeterNum.textContent = "₹" + Math.floor(commCounter.val);
            }
          }
        });
        if (commMeterSlice) {
          gsap.to(commMeterSlice, {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power2.out"
          });
        }
      },
      onLeaveBack: () => {
        if (commTween) commTween.kill();
        commCounter.val = 0;
        if (commMeterNum) commMeterNum.textContent = "₹0";
      }
    });

    // SCENE 3: The Switch (Red to Green transition)
    const switchPhoneScreen = document.getElementById("switch-phone-screen");
    const switchCaption = document.getElementById("switch-caption-badge");

    ScrollTrigger.create({
      trigger: "#scene-3",
      start: "top center",
      end: "bottom center",
      scrub: 0.5,
      onEnter: () => {
        if (switchPhoneScreen) {
          switchPhoneScreen.style.backgroundColor = "#FAF7F2";
          switchPhoneScreen.classList.add("direct-active");
        }
        if (switchCaption) {
          switchCaption.className = "scene-badge-pill good";
          switchCaption.textContent = "100% DIRECT TO YOUR UPI";
        }
      },
      onLeaveBack: () => {
        if (switchPhoneScreen) {
          switchPhoneScreen.style.backgroundColor = "#FFFFFF";
          switchPhoneScreen.classList.remove("direct-active");
        }
        if (switchCaption) {
          switchCaption.className = "scene-badge-pill bad";
          switchCaption.textContent = "THE AGGREGATOR CUT";
        }
      }
    });

    // SCENE 4: WhatsApp Messages Stacking in
    const scene4 = document.getElementById("scene-4");
    if (scene4) {
      ScrollTrigger.create({
        trigger: "#scene-4",
        start: "top 75%",
        onEnter: () => {
          gsap.fromTo(".scene-4-bubble",
            { opacity: 0, y: 20, scale: 0.94 },
            { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.1, ease: "back.out(1.2)", overwrite: "auto" }
          );
        },
        onLeaveBack: () => {
          gsap.to(".scene-4-bubble", {
            opacity: 0,
            y: 16,
            scale: 0.94,
            duration: 0.25,
            stagger: 0.04,
            overwrite: "auto"
          });
        },
        onRefresh: (self) => {
          if (self.isActive || self.progress > 0) {
            gsap.set(".scene-4-bubble", { opacity: 1, y: 0, scale: 1 });
          }
        }
      });
    }

    // SCENE 5: Horizontal Scroll Work Gallery
    // SCENE 5: 3D Cylindrical Flux Wave Gallery Engine (HorizonX / Fold Architecture)
    const fluxContainer = document.getElementById("flux-wave-container");
    const fluxTrack = document.getElementById("flux-wave-track");
    const fluxCards = Array.from(document.querySelectorAll(".flux-card"));
    const fluxDots = Array.from(document.querySelectorAll(".flux-dot"));
    const btnPrev = document.getElementById("flux-btn-prev");
    const btnNext = document.getElementById("flux-btn-next");

    if (fluxTrack && fluxCards.length > 0) {
      let currentProgress = 0;
      let targetProgress = 0;
      let isDragging = false;
      let startX = 0;
      let dragStartProgress = 0;
      const totalCards = fluxCards.length;

      function updateFluxStage(prog) {
        const isMobile = window.innerWidth < 640;
        const cardWidth = isMobile ? 310 : 370;
        const spacing = cardWidth * 0.95;
        const depthFactor = isMobile ? 120 : 180;
        const maxAngle = isMobile ? 35 : 42;

        fluxCards.forEach((card, idx) => {
          const delta = idx - prog;
          const absDelta = Math.abs(delta);

          const x = delta * spacing;
          const zForward = Math.max(0, 1 - absDelta) * 36;
          const z = zForward - Math.pow(absDelta, 1.35) * depthFactor;
          const rotateY = Math.max(-maxAngle, Math.min(maxAngle, delta * -22));
          const scale = Math.max(0.72, 1 - absDelta * 0.12);
          const opacity = Math.max(0.18, 1 - absDelta * 0.28);
          const zIndex = Math.round(100 - absDelta * 10);

          card.style.transform = `translate3d(${x}px, 0, ${z}px) rotateY(${rotateY}deg) scale(${scale})`;
          card.style.opacity = opacity;
          card.style.zIndex = zIndex;

          if (absDelta < 0.5) {
            card.classList.add("active");
          } else {
            card.classList.remove("active");
          }
        });

        const activeIdx = Math.max(0, Math.min(totalCards - 1, Math.round(prog)));
        fluxDots.forEach((dot, i) => {
          if (i === activeIdx) {
            dot.classList.add("active");
          } else {
            dot.classList.remove("active");
          }
        });
      }

      function renderLoop() {
        currentProgress += (targetProgress - currentProgress) * 0.12;
        updateFluxStage(currentProgress);
        requestAnimationFrame(renderLoop);
      }
      requestAnimationFrame(renderLoop);

      if (btnPrev) {
        btnPrev.addEventListener("click", () => {
          targetProgress = Math.max(0, Math.round(targetProgress) - 1);
        });
      }
      if (btnNext) {
        btnNext.addEventListener("click", () => {
          targetProgress = Math.min(totalCards - 1, Math.round(targetProgress) + 1);
        });
      }

      fluxDots.forEach((dot) => {
        dot.addEventListener("click", () => {
          const idx = parseInt(dot.getAttribute("data-index"), 10);
          targetProgress = idx;
        });
      });

      fluxCards.forEach((card) => {
        card.addEventListener("click", (e) => {
          if (e.target.closest("a")) return;
          const idx = parseInt(card.getAttribute("data-index"), 10);
          if (Math.abs(idx - targetProgress) > 0.1) {
            targetProgress = idx;
          }
        });
      });

      if (fluxTrack) {
        const onPointerDown = (e) => {
          isDragging = true;
          startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
          dragStartProgress = targetProgress;
        };

        const onPointerMove = (e) => {
          if (!isDragging) return;
          const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
          const diff = currentX - startX;
          const sensitivity = window.innerWidth < 640 ? 240 : 340;
          targetProgress = Math.max(-0.2, Math.min(totalCards - 0.8, dragStartProgress - diff / sensitivity));
        };

        const onPointerUp = () => {
          if (!isDragging) return;
          isDragging = false;
          targetProgress = Math.max(0, Math.min(totalCards - 1, Math.round(targetProgress)));
        };

        fluxTrack.addEventListener("mousedown", onPointerDown);
        window.addEventListener("mousemove", onPointerMove);
        window.addEventListener("mouseup", onPointerUp);

        fluxTrack.addEventListener("touchstart", onPointerDown, { passive: true });
        window.addEventListener("touchmove", onPointerMove, { passive: true });
        window.addEventListener("touchend", onPointerUp);
      }

      if (typeof ScrollTrigger !== "undefined" && !isReduced) {
        ScrollTrigger.create({
          id: "flux-work-trigger",
          trigger: "#scene-work",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          start: "top top",
          end: () => "+=" + Math.round(window.innerHeight * 2.8),
          scrub: 1,
          onUpdate: (self) => {
            if (!isDragging) {
              targetProgress = self.progress * (totalCards - 1);
            }
          }
        });
      }
    }

    // 7. 3D Card Tilt Physics (M16 Recipe)
    document.querySelectorAll(".tilt-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
      });
    });

    // 7b. Interactive Fan Deck (Tri-Cards Splay with Opposing Magnetic Hover)
    const fanDeckStage = document.getElementById("fan-deck-stage");
    const fanLeft = document.getElementById("fan-card-left");
    const fanCenter = document.getElementById("fan-card-center");
    const fanRight = document.getElementById("fan-card-right");

    if (fanDeckStage && fanLeft && fanCenter && fanRight) {
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;
      let isHovering = false;
      let fanRafId = null;

      function renderFanDeck() {
        // Fluid spring lerp
        currentX += (targetX - currentX) * 0.15;
        currentY += (targetY - currentY) * 0.15;

        // "where mouse and fingel hover that side cards littel move the opposite direction littel"
        const oppX = -currentX;
        const oppY = -currentY;

        const isNarrow = window.innerWidth <= 600;
        const baseSpread = isNarrow ? 22 : 28;
        const baseRot = isNarrow ? 15 : 18;
        const maxShift = isNarrow ? 10 : 18;
        const maxTilt = isNarrow ? 8 : 12;

        // Left card reacts:
        const leftRot = -baseRot + oppX * maxTilt;
        const leftX = -baseSpread + oppX * maxShift;
        const leftY = (isNarrow ? 10 : 12) + oppY * 6;
        fanLeft.style.transform = `rotate(${leftRot}deg) translate(${leftX}px, ${leftY}px)`;

        // Center card tilts gently:
        const centerRot = oppX * (isNarrow ? 4 : 6);
        const centerX = oppX * (isNarrow ? 6 : 8);
        const centerY = (isNarrow ? -4 : -6) + oppY * 5;
        fanCenter.style.transform = `rotate(${centerRot}deg) translate(${centerX}px, ${centerY}px)`;

        // Right card reacts:
        const rightRot = baseRot + oppX * maxTilt;
        const rightX = baseSpread + oppX * maxShift;
        const rightY = (isNarrow ? 10 : 12) + oppY * 6;
        fanRight.style.transform = `rotate(${rightRot}deg) translate(${rightX}px, ${rightY}px)`;

        if (isHovering || Math.abs(targetX - currentX) > 0.005) {
          fanRafId = requestAnimationFrame(renderFanDeck);
        }
      }

      function onPointerMove(e) {
        // Only trigger fan deck interaction when Card 5 is the active card in view
        const parentCard = fanDeckStage.closest(".flux-card");
        if (parentCard && !parentCard.classList.contains("active")) return;

        const rect = fanDeckStage.getBoundingClientRect();
        const clientX = e.touches && e.touches.length ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches && e.touches.length ? e.touches[0].clientY : e.clientY;

        const normX = (clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const normY = (clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

        targetX = Math.max(-1, Math.min(1, normX));
        targetY = Math.max(-1, Math.min(1, normY));

        if (!isHovering) {
          isHovering = true;
          cancelAnimationFrame(fanRafId);
          fanRafId = requestAnimationFrame(renderFanDeck);
        }
      }

      function onPointerLeave() {
        isHovering = false;
        targetX = 0;
        targetY = 0;
        cancelAnimationFrame(fanRafId);
        fanRafId = requestAnimationFrame(renderFanDeck);
      }

      // Listen to mouse, pointer, and touch events
      fanDeckStage.addEventListener("mousemove", onPointerMove, { passive: true });
      fanDeckStage.addEventListener("mouseleave", onPointerLeave, { passive: true });
      fanDeckStage.addEventListener("pointermove", onPointerMove, { passive: true });
      fanDeckStage.addEventListener("pointerleave", onPointerLeave, { passive: true });
      fanDeckStage.addEventListener("touchstart", onPointerMove, { passive: true });
      fanDeckStage.addEventListener("touchmove", onPointerMove, { passive: true });
      fanDeckStage.addEventListener("touchend", onPointerLeave, { passive: true });
    }
  }

  // 7c. Pure Organic Soft Balloon & Bouncy Elastic Physics (Desktop Magnetic / Mobile Instant Touch)
  function initBalloonButtons() {
    const hugeButton = document.querySelector(".btn-huge-wa");
    if (!hugeButton) return;

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    let isHovered = false;

    if (isFinePointer) {
      // Desktop: Magnetic fluid cursor tracking and soft rubber squash
      hugeButton.addEventListener("mousemove", (e) => {
        isHovered = true;
        const rect = hugeButton.getBoundingClientRect();
        const localX = e.clientX - rect.left;
        const localY = e.clientY - rect.top;

        const nx = (localX / rect.width) * 2 - 1;
        const ny = (localY / rect.height) * 2 - 1;

        const pullX = nx * 14;
        const pullY = ny * 8;
        const scaleX = 1.03 + Math.abs(nx) * 0.02;
        const scaleY = 1.03 - Math.abs(ny) * 0.02;
        const rot = nx * 2.5;

        if (window.gsap) {
          gsap.to(hugeButton, {
            x: pullX,
            y: pullY,
            rotation: rot,
            scaleX: scaleX,
            scaleY: scaleY,
            duration: 0.28,
            ease: "power2.out",
            overwrite: "auto"
          });

          const span = hugeButton.querySelector("span");
          if (span) {
            gsap.to(span, {
              x: nx * 6,
              y: ny * 3,
              duration: 0.22,
              ease: "power2.out",
              overwrite: "auto"
            });
          }
        }
      });

      hugeButton.addEventListener("mouseleave", () => {
        isHovered = false;
        if (window.gsap) {
          gsap.to(hugeButton, {
            x: 0,
            y: 0,
            rotation: 0,
            scaleX: 1,
            scaleY: 1,
            duration: 1.4,
            ease: "elastic.out(1.7, 0.25)",
            overwrite: "auto"
          });

          const span = hugeButton.querySelector("span");
          if (span) {
            gsap.to(span, {
              x: 0,
              y: 0,
              duration: 1.0,
              ease: "elastic.out(1.5, 0.28)",
              overwrite: "auto"
            });
          }
        }
      });

      hugeButton.addEventListener("mousedown", () => {
        if (window.gsap) {
          gsap.to(hugeButton, {
            scaleX: 1.08,
            scaleY: 0.90,
            y: "+=3",
            duration: 0.12,
            ease: "power2.out",
            overwrite: "auto"
          });
        }
      });

      hugeButton.addEventListener("mouseup", () => {
        if (window.gsap) {
          gsap.to(hugeButton, {
            scaleX: isHovered ? 1.04 : 1,
            scaleY: isHovered ? 1.04 : 1,
            duration: 0.9,
            ease: "elastic.out(2.2, 0.22)",
            overwrite: "auto"
          });
        }
      });
    } else {
      // Mobile / Touchscreen: Zero main-thread lag, immediate responsive touch squash & bounce
      hugeButton.addEventListener("touchstart", () => {
        if (window.gsap) {
          gsap.to(hugeButton, {
            scale: 0.96,
            duration: 0.1,
            ease: "power2.out",
            overwrite: "auto"
          });
        }
      }, { passive: true });

      hugeButton.addEventListener("touchend", () => {
        if (window.gsap) {
          gsap.to(hugeButton, {
            scale: 1,
            duration: 0.55,
            ease: "elastic.out(2, 0.28)",
            overwrite: "auto"
          });
        }
      }, { passive: true });
    }

    // Organic bounce for pills (.btn-wa-pill)
    const pills = document.querySelectorAll(".btn-wa-pill");
    pills.forEach((pill) => {
      if (isFinePointer) {
        pill.addEventListener("mouseenter", () => {
          if (window.gsap) {
            gsap.to(pill, {
              scale: 1.05,
              duration: 0.35,
              ease: "back.out(2.5)",
              overwrite: "auto"
            });
          }
        });
        pill.addEventListener("mouseleave", () => {
          if (window.gsap) {
            gsap.to(pill, {
              scale: 1,
              duration: 0.7,
              ease: "elastic.out(1.6, 0.3)",
              overwrite: "auto"
            });
          }
        });
        pill.addEventListener("mousedown", () => {
          if (window.gsap) {
            gsap.to(pill, {
              scale: 0.94,
              duration: 0.1,
              ease: "power2.out",
              overwrite: "auto"
            });
          }
        });
        pill.addEventListener("mouseup", () => {
          if (window.gsap) {
            gsap.to(pill, {
              scale: 1.05,
              duration: 0.6,
              ease: "elastic.out(2, 0.25)",
              overwrite: "auto"
            });
          }
        });
      } else {
        // Mobile touch response
        pill.addEventListener("touchstart", () => {
          if (window.gsap) {
            gsap.to(pill, {
              scale: 0.95,
              duration: 0.1,
              ease: "power2.out",
              overwrite: "auto"
            });
          }
        }, { passive: true });

        pill.addEventListener("touchend", () => {
          if (window.gsap) {
            gsap.to(pill, {
              scale: 1,
              duration: 0.45,
              ease: "back.out(2)",
              overwrite: "auto"
            });
          }
        }, { passive: true });
      }
    });
  }

  initBalloonButtons();

  // 8. Package WhatsApp CTA Helper
  window.selectPackageWhatsApp = function(packageName, price) {
    const text = encodeURIComponent(
      `Hi, I want to discuss the ${packageName} (${price}).`
    );
    window.open(`https://wa.me/919860389030?text=${text}`, "_blank");
  };

  // 9. General WhatsApp CTA Helper
  window.openGeneralWhatsApp = function(topic) {
    const text = encodeURIComponent(
      topic ? `Hi Web Developers, I want to discuss ${topic}.` : `Hi Web Developers, I need a website for my business in Gokak.`
    );
    window.open(`https://wa.me/919860389030?text=${text}`, "_blank");
  };

  // 10. Legal Terms & Compliance Dialog Modal Controller
  const legalModal = document.getElementById("legal-modal");

  window.openLegalModal = function(tabName) {
    if (!legalModal) return;
    document.documentElement.classList.add("modal-open");
    document.body.classList.add("modal-open");
    legalModal.setAttribute("open", "true");
    if (tabName) window.switchLegalTab(tabName);
  };

  window.closeLegalModal = function() {
    if (!legalModal) return;
    document.documentElement.classList.remove("modal-open");
    document.body.classList.remove("modal-open");
    legalModal.removeAttribute("open");
  };

  window.switchLegalTab = function(tabId) {
    document.querySelectorAll(".legal-tab-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    const targetBtn = document.getElementById("tab-btn-" + tabId);
    if (targetBtn) targetBtn.classList.add("active");

    document.querySelectorAll(".legal-pane").forEach((pane) => {
      pane.classList.remove("active");
    });
    const targetPane = document.getElementById("pane-" + tabId);
    if (targetPane) targetPane.classList.add("active");
  };

  if (legalModal) {
    legalModal.addEventListener("click", (e) => {
      if (e.target === legalModal) {
        window.closeLegalModal();
      }
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && legalModal.hasAttribute("open")) {
        window.closeLegalModal();
      }
    });
  }

  // Refresh ScrollTrigger once all fonts, stylesheets, and assets settle
  window.addEventListener("load", () => {
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }
  });
});
