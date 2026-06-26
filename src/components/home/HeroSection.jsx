// import React, { useEffect, useRef } from 'react';
// import { Box, Typography, Button, Container, Grid } from '@mui/material';
// import { useNavigate, useLocation } from 'react-router-dom';
// import gsap from 'gsap';

// export default function HeroSection() {
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const heroRef = useRef(null);
//   const overlayRef = useRef(null);
//   const contentRef = useRef(null);
//   const visualRef = useRef(null);
//   const decorativeRef = useRef(null);
//   const scrollRef = useRef(null);

//   // High-end interactive smooth scroll navigation handler
//   const handleNavigation = (targetId) => {
//     if (location.pathname === '/') {
//       const targetSection = document.getElementById(targetId);
//       if (targetSection) {
//         targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       } else {
//         navigate('/shop');
//       }
//     } else {
//       navigate('/shop');
//     }
//   };

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

//       // Clean elegant screen overlay fade-out sequence
//       tl.to(overlayRef.current, {
//         duration: 1.2,
//         opacity: 0,
//         ease: 'power2.inOut'
//       });

//       // Left-side typography staggered entrance setup
//       const contentChildren = contentRef.current?.children;
//       if (contentChildren) {
//         tl.fromTo(contentChildren,
//           { opacity: 0, y: 30 },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.8,
//             stagger: 0.12,
//             ease: 'power3.out'
//           },
//           '-=0.4'
//         );
//       }

//       // Right-side structural luxury graphic fade-in
//       if (visualRef.current) {
//         tl.fromTo(visualRef.current,
//           { opacity: 0, x: 50, scale: 0.95 },
//           { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: 'power2.out' },
//           '-=0.8'
//         );
        
//         // Premium breathing slow loop for the main mannequin graphic
//         gsap.to(visualRef.current.querySelector('.mannequin-frame'), {
//           y: -12,
//           duration: 4,
//           repeat: -1,
//           yoyo: true,
//           ease: 'sine.inOut'
//         });

//         // Inverse rotational slow loop for the background gold outline ring
//         gsap.to(visualRef.current.querySelector('.gold-ring'), {
//           rotation: 360,
//           duration: 25,
//           repeat: -1,
//           ease: 'linear'
//         });
//       }

//       // Micro-interactive scroll indicator dot loop sequence
//       if (scrollRef.current) {
//         tl.fromTo(scrollRef.current,
//           { opacity: 0, y: -10 },
//           { opacity: 1, y: 0, duration: 0.5 },
//           '-=0.2'
//         );

//         gsap.to(scrollRef.current.querySelector('.scroll-dot'), {
//           y: 16,
//           duration: 1.4,
//           repeat: -1,
//           yoyo: true,
//           ease: 'sine.inOut'
//         });
//       }
//     }, [heroRef]);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <Box
//       ref={heroRef}
//       sx={{
//         position: 'relative',
//         height: '100vh',
//         minHeight: { xs: 750, md: 800 },
//         display: 'flex',
//         alignItems: 'center',
//         overflow: 'hidden',
//         // LUXURY REMIX COLOR: Deep obsidian base running into dark burgundy wine accents
//         background: 'linear-gradient(135deg, #0D0507 0%, #170407 50%, #1F070C 100%)',
//         '&::before': {
//           content: '""',
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           // Premium high-contrast gold & deep crimson ambient light projections
//           background: `
//             radial-gradient(circle at 85% 40%, rgba(201,169,110,0.12) 0%, transparent 45%),
//             radial-gradient(circle at 15% 80%, rgba(10,59,36,0.35) 0%, transparent 50%)
//           `,
//           zIndex: 1
//         }
//       }}
//     >
//       {/* Structural Loading Shield Overlay */}
//       <Box
//         ref={overlayRef}
//         sx={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           bgcolor: '#0D0507',
//           zIndex: 10,
//           pointerEvents: 'none'
//         }}
//       />

//       {/* Luxury Geometric Fine Tailoring Blueprint Lines Grid */}
//       <Box
//         sx={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           opacity: 0.02,
//           backgroundImage: `
//             linear-gradient(45deg, #C9A96E 1px, transparent 1px),
//             linear-gradient(-45deg, #C9A96E 1px, transparent 1px)
//           `,
//           backgroundSize: '80px 80px',
//           zIndex: 1
//         }}
//       />

//       <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 3, px: { xs: 3, sm: 6, md: 8 } }}>
//         <Grid container spacing={4} alignItems="center" justifyContent="space-between">
          
//           {/* LEFT COLUMN: Core Typography Content Branding */}
//           <Grid item xs={12} md={6.5} lg={6}>
//             <Box ref={contentRef} sx={{ textAlign: 'left' }}>
//               <Typography
//                 variant="overline"
//                 sx={{
//                   color: '#C9A96E',
//                   fontSize: { xs: '0.65rem', sm: '0.75rem' },
//                   letterSpacing: '0.35em',
//                   mb: 2.5,
//                   display: 'block',
//                   fontFamily: '"Inter", sans-serif',
//                   fontWeight: 400,
//                   textTransform: 'uppercase'
//                 }}
//               >
//                 Established 1998 · Masters of Semi-Stitched Suits
//               </Typography>

//               <Typography
//                 variant="h1"
//                 sx={{
//                   fontFamily: '"Playfair Display", serif',
//                   fontWeight: 700,
//                   fontSize: { xs: '3rem', sm: '4rem', md: '4.8rem', lg: '5.6rem' },
//                   color: '#FFF8F0',
//                   letterSpacing: '-0.02em',
//                   lineHeight: 1.05,
//                   mb: 0.5
//                 }}
//               >
//                 The Elegance of
//               </Typography>
              
//               <Typography
//                 variant="h1"
//                 sx={{
//                   fontFamily: '"Playfair Display", serif',
//                   fontWeight: 700,
//                   fontSize: { xs: '3rem', sm: '4rem', md: '4.8rem', lg: '5.6rem' },
//                   color: '#C9A96E',
//                   letterSpacing: '-0.02em',
//                   lineHeight: 1.05,
//                   mb: 3.5
//                 }}
//               >
//                 Premium Suits
//               </Typography>

//               <Box sx={{ width: 70, height: '2px', bgcolor: '#C9A96E', mb: 4, borderRadius: '2px' }} />

//               <Typography
//                 variant="body1"
//                 sx={{
//                   color: 'rgba(255,248,240,0.65)',
//                   fontSize: { xs: '0.9rem', sm: '1rem' },
//                   maxWidth: 520,
//                   mb: 5.5,
//                   fontFamily: '"Inter", sans-serif',
//                   fontWeight: 300,
//                   lineHeight: 1.9,
//                   letterSpacing: '0.01em'
//                 }}
//               >
//                 Where heritage meets craftsmanship. Each semi-stitched suit is meticulously handcrafted
//                 by master artisans using the world's finest fabrics, delivering unparalleled
//                 elegance for the discerning woman.
//               </Typography>

//               <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap', alignItems: 'center' }}>
//                 <Button
//                   variant="contained"
//                   size="large"
//                   onClick={() => handleNavigation('collections-section')}
//                   sx={{
//                     bgcolor: '#C9A96E',
//                     color: '#1A1A1A',
//                     py: 2,
//                     px: 5,
//                     fontSize: '0.75rem',
//                     fontWeight: 600,
//                     letterSpacing: '0.15em',
//                     textTransform: 'uppercase',
//                     borderRadius: '0px',
//                     boxShadow: 'none',
//                     transition: 'all 0.4s ease',
//                     '&:hover': {
//                       bgcolor: '#DFC89A',
//                       boxShadow: '0 12px 32px rgba(201,169,110,0.25)',
//                       transform: 'translateY(-2px)'
//                     }
//                   }}
//                 >
//                   Explore Collection
//                 </Button>
                
//                 {/* <Button
//                   variant="outlined"
//                   size="large"
//                   onClick={() => handleNavigation('products-carousel-section')}
//                   sx={{
//                     borderColor: 'rgba(255,248,240,0.25)',
//                     color: '#FFF8F0',
//                     py: 2,
//                     px: 5,
//                     fontSize: '0.75rem',
//                     fontWeight: 600,
//                     letterSpacing: '0.15em',
//                     textTransform: 'uppercase',
//                     borderRadius: '0px',
//                     transition: 'all 0.4s ease',
//                     '&:hover': {
//                       borderColor: '#C9A96E',
//                       color: '#C9A96E',
//                       bgcolor: 'rgba(201,169,110,0.03)',
//                       transform: 'translateY(-2px)'
//                 }
//               }}
//             >
//               View Suits
//             </Button> */}
//           </Box>
//             </Box>
//           </Grid>

//           {/* RIGHT COLUMN: The Fixed Visual Solution (Bespoke Tailoring Silhouette Showcase) */}
//           <Grid item xs={12} md={5.5} lg={5} sx={{ display: { xs: 'none', md: 'block' } }}>
//             <Box 
//               ref={visualRef} 
//               sx={{ 
//                 position: 'relative', 
//                 width: '100%', 
//                 height: 500, 
//                 display: 'flex', 
//                 alignItems: 'center', 
//                 justifyContent: 'center' 
//               }}
//             >
//               {/* Rotating Architectural Luxury Background Ring Geometric */}
//               <Box 
//                 className="gold-ring"
//                 sx={{
//                   position: 'absolute',
//                   width: 380,
//                   height: 380,
//                   border: '1px dashed rgba(201,169,110,0.2)',
//                   borderRadius: '50%',
//                   zIndex: 1,
//                   pointerEvents: 'none',
//                   '&::before': {
//                     content: '""',
//                     position: 'absolute',
//                     top: -6,
//                     left: '50%',
//                     width: 12,
//                     height: 12,
//                     bgcolor: '#C9A96E',
//                     borderRadius: '50%',
//                     transform: 'translateX(-50%)'
//                   }
//                 }}
//               />

//               {/* Glowing Ambient Core Behind Mannequin Frame */}
//               <Box 
//                 sx={{
//                   position: 'absolute',
//                   width: 260,
//                   height: 260,
//                   borderRadius: '50%',
//                   background: 'radial-gradient(circle, rgba(10,59,36,0.4) 0%, transparent 70%)',
//                   zIndex: 1,
//                   filter: 'blur(10px)'
//                 }}
//               />

//               {/* Central Premium Tailoring Mannequin & Canvas Frame Layer */}
//               <Box
//                 className="mannequin-frame"
//                 sx={{
//                   position: 'relative',
//                   width: 240,
//                   height: 440,
//                   zIndex: 2,
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'center'
//                 }}
//               >
//                 {/* Custom Elegant SVG Canvas Silhouette Mannequin Drawing */}
//                 <svg width="180" height="400" viewBox="0 0 100 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.85 }}>
//                   {/* Neck block */}
//                   <path d="M44 35 H56 V45 H44 Z" fill="#C9A96E" opacity="0.4"/>
//                   {/* Torso/Suit Silhouette */}
//                   <path d="M30 55 C30 55 22 85 24 110 C26 135 34 165 34 165 H66 C66 165 74 135 76 110 C78 85 70 55 70 55 C70 55 64 48 50 48 C36 48 30 55 30 55 Z" fill="#1E0E12" stroke="#C9A96E" strokeWidth="1.5"/>
//                   {/* Tailoring Measurement Reference Line Markers */}
//                   <line x1="25" y1="80" x2="75" y2="80" stroke="rgba(201,169,110,0.3)" strokeWidth="1" strokeDasharray="2 2"/>
//                   <line x1="24" y1="110" x2="76" y2="110" stroke="rgba(201,169,110,0.4)" strokeWidth="1" strokeDasharray="2 2"/>
//                   <line x1="30" y1="140" x2="70" y2="140" stroke="rgba(201,169,110,0.3)" strokeWidth="1" strokeDasharray="2 2"/>
//                   {/* Stand Pole */}
//                   <line x1="50" y1="165" x2="50" y2="210" stroke="#C9A96E" strokeWidth="2.5"/>
//                   {/* Stand Cast Iron Base Legs */}
//                   <path d="M35 210 H65 L68 215 H32 Z" fill="#C9A96E"/>
//                 </svg>

//                 {/* Floating Micro-Interactive Luxury Badge Label */}
//                 <Box
//                   sx={{
//                     position: 'absolute',
//                     bottom: 80,
//                     right: -20,
//                     bgcolor: 'rgba(13,5,7,0.85)',
//                     border: '1px solid #C9A96E',
//                     backdropFilter: 'blur(12px)',
//                     py: 1.5,
//                     px: 2.5,
//                     borderRadius: '0px',
//                     boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
//                     pointerEvents: 'none'
//                   }}
//                 >
//                   <Typography sx={{ color: '#C9A96E', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, mb: 0.5 }}>
//                     Premium Fit
//                   </Typography>
//                   <Typography sx={{ color: '#FFF8F0', fontFamily: '"Playfair Display", serif', fontSize: '0.85rem', italic: true }}>
//                     Bespoke Atelier
//                   </Typography>
//                 </Box>
//               </Box>
//             </Box>
//           </Grid>

//         </Grid>
//       </Container>

//       {/* Balanced Right Edge Framing Layout Component Overlay */}
//       <Box
//         ref={decorativeRef}
//         sx={{
//           position: 'absolute',
//           right: '3%',
//           top: '50%',
//           transform: 'translateY(-50%)',
//           zIndex: 2,
//           display: { xs: 'none', lg: 'flex' },
//           flexDirection: 'column',
//           alignItems: 'flex-end',
//           gap: 2.5
//         }}
//       >
//         <Box className="deco-line" sx={{ width: '1px', height: 100, bgcolor: 'rgba(201,169,110,0.15)', transformOrigin: 'top center' }} />
//         <Typography
//           sx={{
//             writingMode: 'vertical-rl',
//             fontFamily: '"Inter", sans-serif',
//             fontSize: '0.55rem',
//             fontWeight: 400,
//             letterSpacing: '0.4em',
//             color: 'rgba(201,169,110,0.25)',
//             textTransform: 'uppercase',
//             userSelect: 'none'
//           }}
//         >
//           Heritage Craftsmanship
//         </Typography>
//       </Box>

//       {/* Perfectly Positioned Bottom Centered Scroll Down Anchor */}
//       <Box
//         ref={scrollRef}
//         sx={{
//           position: 'absolute',
//           bottom: 40,
//           left: '50%',
//           transform: 'translateX(-50%)',
//           zIndex: 3,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           gap: 1.5,
//           userSelect: 'none'
//         }}
//       >
//         <Typography
//           sx={{
//             color: 'rgba(255,248,240,0.3)',
//             fontSize: '0.55rem',
//             letterSpacing: '0.3em',
//             fontFamily: '"Inter", sans-serif',
//             textTransform: 'uppercase',
//             fontWeight: 400
//           }}
//         >
//           Scroll
//         </Typography>
//         <Box sx={{
//           width: '2px',
//           height: 36,
//           bgcolor: 'rgba(255,248,240,0.08)',
//           position: 'relative',
//           overflow: 'hidden',
//           borderRadius: '1px'
//         }}>
//           <Box className="scroll-dot" sx={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: 10,
//             bgcolor: '#C9A96E',
//             borderRadius: '1px'
//           }} />
//         </Box>
//       </Box>
//     </Box>
//   );
// }



import React, { useEffect, useRef } from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';

export default function HeroSection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  
  const heroRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const visualRef = useRef(null);
  const decorativeRef = useRef(null);
  const scrollRef = useRef(null);

  const handleNavigation = (targetId) => {
    if (location.pathname === '/') {
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        navigate('/shop');
      }
    } else {
      navigate('/shop');
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to(overlayRef.current, {
        duration: 1.2,
        opacity: 0,
        ease: 'power2.inOut'
      });

      const contentChildren = contentRef.current?.children;
      if (contentChildren) {
        tl.fromTo(contentChildren,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out'
          },
          '-=0.4'
        );
      }

      if (visualRef.current) {
        tl.fromTo(visualRef.current,
          { opacity: 0, x: 50, scale: 0.95 },
          { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: 'power2.out' },
          '-=0.8'
        );
        
        gsap.to(visualRef.current.querySelector('.mannequin-frame'), {
          y: -12,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });

        gsap.to(visualRef.current.querySelector('.gold-ring'), {
          rotation: 360,
          duration: 25,
          repeat: -1,
          ease: 'linear'
        });
      }

      if (scrollRef.current) {
        tl.fromTo(scrollRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.2'
        );

        gsap.to(scrollRef.current.querySelector('.scroll-dot'), {
          y: 16,
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
    }, [heroRef]);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={heroRef}
      sx={{
        position: 'relative',
        height: '100vh',
        minHeight: { xs: 750, md: 800 },
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        // ULTRA-LUXURY PALETTE OVERRIDE: Emerald Depth Gradient Line System
        background: 'linear-gradient(135deg, #050E0A 0%, #0A1E14 50%, #123322 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // Gold Ambient Shimmer Projections
          background: `
            radial-gradient(circle at 85% 40%, rgba(212,178,111,0.12) 0%, transparent 45%),
            radial-gradient(circle at 15% 80%, rgba(10,30,20,0.35) 0%, transparent 50%)
          `,
          zIndex: 1
        }
      }}
    >
      <Box
        ref={overlayRef}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: '#050E0A',
          zIndex: 10,
          pointerEvents: 'none'
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.02,
          backgroundImage: `
            linear-gradient(45deg, #D4B26F 1px, transparent 1px),
            linear-gradient(-45deg, #D4B26F 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          zIndex: 1
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 3, px: { xs: 3, sm: 6, md: 8 } }}>
        <Grid container spacing={4} alignItems="center" justifyContent="space-between">
          
          <Grid item xs={12} md={6.5} lg={6}>
            <Box ref={contentRef} sx={{ textAlign: 'left' }}>
              <Typography
                variant="overline"
                sx={{
                  color: '#D4B26F',
                  fontSize: { xs: '0.65rem', sm: '0.75rem' },
                  letterSpacing: '0.35em',
                  mb: 2.5,
                  display: 'block',
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 400,
                  textTransform: 'uppercase'
                }}
              >
                {t('subtitle', 'Established 1998 · Masters of Semi-Stitched Suits')}
              </Typography>

              <Typography
                variant="h1"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  fontSize: { xs: '3rem', sm: '4rem', md: '4.8rem', lg: '5.6rem' },
                  color: '#FFF8F0',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.05,
                  mb: 0.5
                }}
              >
                {t('heroTitle1', 'The Elegance of')}
              </Typography>
              
              <Typography
                variant="h1"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  fontSize: { xs: '3rem', sm: '4rem', md: '4.8rem', lg: '5.6rem' },
                  color: '#D4B26F',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.05,
                  mb: 3.5
                }}
              >
                {t('heroTitle2', 'Premium Suits')}
              </Typography>

              <Box sx={{ width: 70, height: '2px', bgcolor: '#D4B26F', mb: 4, borderRadius: '2px' }} />

              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255,248,240,0.65)',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  maxWidth: 520,
                  mb: 5.5,
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 300,
                  lineHeight: 1.9,
                  letterSpacing: '0.01em'
                }}
              >
                {t('description', "Where heritage meets craftsmanship. Each semi-stitched suit is meticulously handcrafted by master artisans using the world's finest fabrics, delivering unparalleled elegance for the discerning woman.")}
              </Typography>

              <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap', alignItems: 'center' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => handleNavigation('collections-section')}
                  sx={{
                    bgcolor: '#D4B26F',
                    color: '#050E0A',
                    py: 2,
                    px: 5,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    borderRadius: '0px',
                    boxShadow: 'none',
                    transition: 'all 0.4s ease',
                    '&:hover': {
                      bgcolor: '#EAD19E',
                      boxShadow: '0 12px 32px rgba(212,178,111,0.25)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  {t('exploreBtn', 'Explore Collection')}
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={5.5} lg={5} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box ref={visualRef} sx={{ position: 'relative', width: '100%', height: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box className="gold-ring" sx={{ position: 'absolute', width: 380, height: 380, border: '1px dashed rgba(212,178,111,0.2)', borderRadius: '50%', zIndex: 1, pointerEvents: 'none', '&::before': { content: '""', position: 'absolute', top: -6, left: '50%', width: 12, height: 12, bgcolor: '#D4B26F', borderRadius: '50%', transform: 'translateX(-50%)' } }} />
              <Box sx={{ position: 'absolute', width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(18,51,34,0.5) 0%, transparent 70%)', zIndex: 1, filter: 'blur(10px)' }} />
              <Box className="mannequin-frame" sx={{ position: 'relative', width: 240, height: 440, zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="180" height="400" viewBox="0 0 100 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.85 }}>
                  <path d="M44 35 H56 V45 H44 Z" fill="#D4B26F" opacity="0.4"/>
                  <path d="M30 55 C30 55 22 85 24 110 C26 135 34 165 34 165 H66 C66 165 74 135 76 110 C78 85 70 55 70 55 C70 55 64 48 50 48 C36 48 30 55 30 55 Z" fill="#050E0A" stroke="#D4B26F" strokeWidth="1.5"/>
                  <line x1="25" y1="80" x2="75" y2="80" stroke="rgba(212,178,111,0.3)" strokeWidth="1" strokeDasharray="2 2"/>
                  <line x1="24" y1="110" x2="76" y2="110" stroke="rgba(212,178,111,0.4)" strokeWidth="1" strokeDasharray="2 2"/>
                  <line x1="30" y1="140" x2="70" y2="140" stroke="rgba(212,178,111,0.3)" strokeWidth="1" strokeDasharray="2 2"/>
                  <line x1="50" y1="165" x2="50" y2="210" stroke="#D4B26F" strokeWidth="2.5"/>
                  <path d="M35 210 H65 L68 215 H32 Z" fill="#D4B26F"/>
                </svg>

                <Box sx={{ position: 'absolute', bottom: 80, right: -20, bgcolor: 'rgba(5,14,10,0.92)', border: '1px solid #D4B26F', backdropFilter: 'blur(12px)', py: 1.5, px: 2.5, borderRadius: '0px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', pointerEvents: 'none' }}>
                  <Typography sx={{ color: '#D4B26F', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, mb: 0.5 }}>{t('badgeMini', 'Premium Fit')}</Typography>
                  <Typography sx={{ color: '#FFF8F0', fontFamily: '"Playfair Display", serif', fontSize: '0.85rem', fontStyle: 'italic' }}>{t('badgeMain', 'Bespoke Atelier')}</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

        </Grid>
      </Container>

      <Box ref={decorativeRef} sx={{ position: 'absolute', right: '3%', top: '50%', transform: 'translateY(-50%)', zIndex: 2, display: { xs: 'none', lg: 'flex' }, flexDirection: 'column', alignItems: 'flex-end', gap: 2.5 }}>
        <Box className="deco-line" sx={{ width: '1px', height: 100, bgcolor: 'rgba(212,178,111,0.15)', transformOrigin: 'top center' }} />
        <Typography sx={{ writingMode: 'vertical-rl', fontFamily: '"Inter", sans-serif', fontSize: '0.55rem', fontWeight: 400, letterSpacing: '0.4em', color: 'rgba(212,178,111,0.25)', textTransform: 'uppercase', userSelect: 'none' }}>{t('verticalBadge', 'Heritage Craftsmanship')}</Typography>
      </Box>

      <Box ref={scrollRef} sx={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, userSelect: 'none' }}>
        <Typography sx={{ color: 'rgba(255,248,240,0.3)', fontSize: '0.55rem', letterSpacing: '0.3em', fontFamily: '"Inter", sans-serif', textTransform: 'uppercase', fontWeight: 400 }}>{t('scrollText', 'Scroll')}</Typography>
        <Box sx={{ width: '2px', height: 36, bgcolor: 'rgba(255,248,240,0.08)', position: 'relative', overflow: 'hidden', borderRadius: '1px' }}>
          <Box className="scroll-dot" sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 10, bgcolor: '#D4B26F', borderRadius: '1px' }} />
        </Box>
      </Box>
    </Box>
  );
}