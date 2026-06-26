// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
// import {
//   AppBar, Toolbar, Typography, Button, IconButton, Box,
//   Menu, MenuItem, Container, useMediaQuery, useTheme, Drawer,
//   List, ListItem, ListItemText, ListItemButton, Divider, Fade
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import CloseIcon from '@mui/icons-material/Close';
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
// import { useAuth } from '../../context/AuthContext';

// export default function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const { isLoggedIn, isAdmin, user, logout } = useAuth();
//   const navbarRef = useRef(null);

//   const [scrolled, setScrolled] = useState(false);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [hoveredLink, setHoveredLink] = useState(null);

//   // Track scroll position for transparent/solid navbar
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 40);
//     };
//     window.addEventListener('scroll', handleScroll, { passive: true });
//     handleScroll();
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Close drawer on route change
//   useEffect(() => {
//     setDrawerOpen(false);
//   }, [location.pathname]);

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//     handleMenuClose();
//     setDrawerOpen(false);
//   };

//   const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);

//   const isHomePage = location.pathname === '/';

//   const navItems = [
//     { label: 'Home', path: '/' },
//     { label: 'Shop', path: '/shop' },
//   ];

//   const drawerContent = (
//     <Box sx={{ width: 320, bgcolor: '#FFF8F0', height: '100%', display: 'flex', flexDirection: 'column' }}>
//       {/* Header */}
//       <Box sx={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         p: 2.5,
//         borderBottom: '1px solid #E8DDD0'
//       }}>
//         <Typography
//           variant="h5"
//           sx={{
//             fontFamily: '"Playfair Display", serif',
//             color: '#0A3B24',
//             fontWeight: 600,
//             letterSpacing: '0.02em',
//             lineHeight: 1,
//             '& span': {
//               display: 'block',
//               fontFamily: '"Inter", sans-serif',
//               fontWeight: 300,
//               fontSize: '0.5rem',
//               letterSpacing: '0.2em',
//               color: '#6B6B6B',
//               mt: 0.3
//             }
//           }}
//         >
//           Rajshree
//           <span>FASHION</span>
//         </Typography>
//         <IconButton
//           onClick={() => setDrawerOpen(false)}
//           sx={{ color: '#1A1A1A', '&:hover': { bgcolor: 'rgba(10,59,36,0.06)' } }}
//         >
//           <CloseIcon />
//         </IconButton>
//       </Box>

//       {/* Navigation Links */}
//       <List sx={{ pt: 2, flexGrow: 1 }}>
//         {navItems.map((item, i) => (
//           <ListItem key={item.label} disablePadding sx={{ opacity: 0, animation: `drawerFadeIn 0.4s ${0.05 * i}s forwards` }}>
//             <ListItemButton
//               onClick={() => { navigate(item.path); setDrawerOpen(false); }}
//               sx={{
//                 py: 2,
//                 px: 3,
//                 mx: 1.5,
//                 borderRadius: '8px',
//                 bgcolor: location.pathname === item.path ? 'rgba(10,59,36,0.06)' : 'transparent',
//                 '&:hover': { bgcolor: 'rgba(10,59,36,0.04)' }
//               }}
//             >
//               <ListItemText
//                 primary={item.label}
//                 primaryTypographyProps={{
//                   fontFamily: '"Inter", sans-serif',
//                   fontSize: '0.85rem',
//                   letterSpacing: '0.08em',
//                   textTransform: 'uppercase',
//                   fontWeight: location.pathname === item.path ? 500 : 400,
//                   color: location.pathname === item.path ? '#0A3B24' : '#1A1A1A'
//                 }}
//               />
//               {location.pathname === item.path && (
//                 <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#C9A96E' }} />
//               )}
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>

//       <Divider sx={{ mx: 2, borderColor: '#E8DDD0' }} />

//       {/* Auth Section */}
//       <List sx={{ pt: 1, pb: 3 }}>
//         {isLoggedIn ? (
//           <>
//             <ListItem disablePadding>
//               <ListItemButton sx={{ py: 1.5, px: 3, mx: 1.5, borderRadius: '8px' }}>
//                 <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: '#0A3B24', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1.5 }}>
//                   <Typography sx={{ color: '#FFF8F0', fontSize: '0.75rem', fontWeight: 500 }}>
//                     {user?.name?.charAt(0)?.toUpperCase() || 'U'}
//                   </Typography>
//                 </Box>
//                 <Box>
//                   <Typography sx={{ fontFamily: '"Inter", sans-serif', fontSize: '0.8rem', color: '#1A1A1A', fontWeight: 500 }}>
//                     {user?.name || 'User'}
//                   </Typography>
//                   <Typography sx={{ fontFamily: '"Inter", sans-serif', fontSize: '0.6rem', color: '#6B6B6B', letterSpacing: '0.05em', textTransform: 'capitalize' }}>
//                     {user?.role || 'Member'}
//                   </Typography>
//                 </Box>
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding>
//               <ListItemButton onClick={handleLogout} sx={{ py: 1.5, px: 3, mx: 1.5, borderRadius: '8px' }}>
//                 <ListItemText
//                   primary="Sign Out"
//                   primaryTypographyProps={{
//                     fontFamily: '"Inter", sans-serif',
//                     fontSize: '0.8rem',
//                     letterSpacing: '0.05em',
//                     color: '#C62828'
//                   }}
//                 />
//               </ListItemButton>
//             </ListItem>
//           </>
//         ) : (
//           <>
//             <ListItem disablePadding>
//               <ListItemButton
//                 onClick={() => { navigate('/login'); setDrawerOpen(false); }}
//                 sx={{ py: 1.5, px: 3, mx: 1.5, borderRadius: '8px' }}
//               >
//                 <ListItemText
//                   primary="Sign In"
//                   primaryTypographyProps={{
//                     fontFamily: '"Inter", sans-serif',
//                     fontSize: '0.8rem',
//                     letterSpacing: '0.05em',
//                     color: '#1A1A1A'
//                   }}
//                 />
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding>
//               <ListItemButton
//                 onClick={() => { navigate('/register'); setDrawerOpen(false); }}
//                 sx={{
//                   py: 1.5,
//                   px: 3,
//                   mx: 1.5,
//                   borderRadius: '8px',
//                   bgcolor: '#0A3B24',
//                   '&:hover': { bgcolor: '#062617' }
//                 }}
//               >
//                 <ListItemText
//                   primary="Create Account"
//                   primaryTypographyProps={{
//                     fontFamily: '"Inter", sans-serif',
//                     fontSize: '0.8rem',
//                     letterSpacing: '0.05em',
//                     color: '#FFF8F0',
//                     fontWeight: 500
//                   }}
//                 />
//               </ListItemButton>
//             </ListItem>
//           </>
//         )}
//       </List>

//       {/* Stagger animation keyframe */}
//       <style>{`
//         @keyframes drawerFadeIn {
//           from { opacity: 0; transform: translateX(12px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
//       `}</style>
//     </Box>
//   );

//   return (
//     <>
//       <AppBar
//         ref={navbarRef}
//         position="fixed"
//         sx={{
//           bgcolor: scrolled
//             ? 'rgba(255, 248, 240, 0.92)'
//             : isHomePage ? 'transparent' : 'rgba(255, 248, 240, 0.98)',
//           backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
//           borderBottom: scrolled
//             ? '1px solid rgba(232, 221, 208, 0.6)'
//             : isHomePage ? '1px solid transparent' : '1px solid #E8DDD0',
//           transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
//         }}
//       >
//         <Container maxWidth="xl">
//           <Toolbar
//             disableGutters
//             sx={{
//               minHeight: { xs: 64, md: 80 },
//               transition: 'min-height 0.4s',
//               position: 'relative'
//             }}
//           >
//             {/* Logo */}
//             <Typography
//               variant="h5"
//               component={RouterLink}
//               to="/"
//               sx={{
//                 fontFamily: '"Playfair Display", serif',
//                 fontWeight: 600,
//                 fontSize: scrolled ? '1.3rem' : { xs: '1.4rem', md: '1.5rem' },
//                 color: (scrolled || !isHomePage) ? '#0A3B24' : '#FFF8F0',
//                 textDecoration: 'none',
//                 letterSpacing: '0.02em',
//                 transition: 'all 0.4s',
//                 flexGrow: { xs: 1, md: 0 },
//                 lineHeight: 1,
//                 '& span': {
//                   fontFamily: '"Inter", sans-serif',
//                   fontWeight: 300,
//                   fontSize: '0.55rem',
//                   letterSpacing: '0.2em',
//                   display: 'block',
//                   mt: 0.2,
//                   color: (scrolled || !isHomePage) ? '#6B6B6B' : 'rgba(255,248,240,0.6)',
//                   transition: 'color 0.4s'
//                 }
//               }}
//             >
//               Rajshree
//               <span>FASHION</span>
//             </Typography>

//             {/* Desktop Nav - Centered */}
//             {!isMobile && (
//               <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 0.5 }}>
//                 {navItems.map((item) => {
//                   const isActive = location.pathname === item.path ||
//                     (item.path === '/shop' && location.pathname === '/shop');
//                   return (
//                     <Button
//                       key={item.label}
//                       component={RouterLink}
//                       to={item.path}
//                       onMouseEnter={() => setHoveredLink(item.label)}
//                       onMouseLeave={() => setHoveredLink(null)}
//                       sx={{
//                         color: (scrolled || !isHomePage) ? '#1A1A1A' : 'rgba(255,248,240,0.85)',
//                         fontSize: '0.7rem',
//                         letterSpacing: '0.12em',
//                         py: 2,
//                         px: 2.5,
//                         fontWeight: isActive ? 500 : 400,
//                         position: 'relative',
//                         transition: 'color 0.3s',
//                         '&::after': {
//                           content: '""',
//                           position: 'absolute',
//                           bottom: 16,
//                           left: '50%',
//                           transform: 'translateX(-50%)',
//                           width: isActive ? '60%' : (hoveredLink === item.label ? '60%' : '0%'),
//                           height: 2,
//                           bgcolor: (scrolled || !isHomePage) ? '#0A3B24' : '#C9A96E',
//                           transition: 'width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
//                           borderRadius: '1px'
//                         },
//                         '&:hover': {
//                           bgcolor: 'transparent',
//                           color: (scrolled || !isHomePage) ? '#0A3B24' : '#FFF8F0'
//                         }
//                       }}
//                     >
//                       {item.label}
//                     </Button>
//                   );
//                 })}
//               </Box>
//             )}

//             {/* Auth Actions - Desktop */}
//             {!isMobile && (
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                 {isLoggedIn ? (
//                   <>
//                     <IconButton
//                       onClick={handleMenuOpen}
//                       sx={{
//                         color: (scrolled || !isHomePage) ? '#1A1A1A' : 'rgba(255,248,240,0.85)',
//                         transition: 'color 0.3s',
//                         '&:hover': { bgcolor: 'rgba(10,59,36,0.06)' }
//                       }}
//                     >
//                       <PersonOutlineIcon />
//                     </IconButton>
//                     <Menu
//                       anchorEl={anchorEl}
//                       open={Boolean(anchorEl)}
//                       onClose={handleMenuClose}
//                       transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//                       anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//                       TransitionComponent={Fade}
//                       transitionDuration={250}
//                       PaperProps={{
//                         sx: {
//                           borderRadius: '12px',
//                           border: '1px solid #E8DDD0',
//                           boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
//                           bgcolor: '#FFF8F0',
//                           mt: 1.5,
//                           minWidth: 220,
//                           overflow: 'hidden',
//                           '& .MuiList-root': { py: 0.5 }
//                         }
//                       }}
//                     >
//                       <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #E8DDD0', mb: 0.5 }}>
//                         <Typography sx={{ fontFamily: '"Inter", sans-serif', fontSize: '0.8rem', fontWeight: 500, color: '#1A1A1A' }}>
//                           {user?.name}
//                         </Typography>
//                         <Typography sx={{ fontFamily: '"Inter", sans-serif', fontSize: '0.65rem', color: '#6B6B6B', mt: 0.2, letterSpacing: '0.05em', textTransform: 'capitalize' }}>
//                           {user?.role || 'Member'}
//                         </Typography>
//                       </Box>

//                       <MenuItem
//                         onClick={handleLogout}
//                         sx={{
//                           fontFamily: '"Inter", sans-serif',
//                           fontSize: '0.8rem',
//                           letterSpacing: '0.03em',
//                           borderRadius: '6px',
//                           mx: 0.5,
//                           py: 1,
//                           color: '#C62828',
//                           '&:hover': { bgcolor: 'rgba(198,40,40,0.06)' }
//                         }}
//                       >
//                         Sign Out
//                       </MenuItem>
//                     </Menu>
//                   </>
//                 ) : (
//                   <>
//                     <Button
//                       component={RouterLink}
//                       to="/login"
//                       sx={{
//                         color: (scrolled || !isHomePage) ? '#1A1A1A' : 'rgba(255,248,240,0.85)',
//                         fontSize: '0.7rem',
//                         letterSpacing: '0.1em',
//                         py: 1.5,
//                         px: 2,
//                         '&:hover': { bgcolor: 'transparent', color: (scrolled || !isHomePage) ? '#0A3B24' : '#FFF8F0' }
//                       }}
//                     >
//                       Sign In
//                     </Button>
//                     <Button
//                       component={RouterLink}
//                       to="/register"
//                       variant="outlined"
//                       size="small"
//                       sx={{
//                         fontSize: '0.65rem',
//                         py: 1.2,
//                         px: 2.5,
//                         borderColor: (scrolled || !isHomePage) ? '#0A3B24' : 'rgba(255,248,240,0.5)',
//                         color: (scrolled || !isHomePage) ? '#0A3B24' : '#FFF8F0',
//                         '&:hover': {
//                           borderColor: (scrolled || !isHomePage) ? '#062617' : '#FFF8F0',
//                           bgcolor: 'transparent'
//                         }
//                       }}
//                     >
//                       Create Account
//                     </Button>
//                   </>
//                 )}
//               </Box>
//             )}

//             {/* Mobile Menu Button */}
//             {isMobile && (
//               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                 <IconButton
//                   onClick={() => setDrawerOpen(true)}
//                   sx={{
//                     color: (scrolled || !isHomePage) ? '#1A1A1A' : '#FFF8F0',
//                     ml: 1,
//                     '&:hover': { bgcolor: 'rgba(10,59,36,0.06)' }
//                   }}
//                 >
//                   <MenuIcon />
//                 </IconButton>
//               </Box>
//             )}
//           </Toolbar>
//         </Container>
//       </AppBar>

//       {/* Mobile Drawer */}
//       <Drawer
//         anchor="right"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         PaperProps={{
//           sx: {
//             bgcolor: 'transparent',
//             boxShadow: 'none',
//             '& .MuiBackdrop-root': { bgcolor: 'rgba(10, 5, 5, 0.5)', backdropFilter: 'blur(8px)' }
//           }
//         }}
//         ModalProps={{
//           keepMounted: true,
//           slotProps: {
//             backdrop: {
//               sx: { bgcolor: 'rgba(10, 5, 5, 0.5)', backdropFilter: 'blur(8px)' }
//             }
//           }
//         }}
//       >
//         {drawerContent}
//       </Drawer>
//     </>
//   );
// }


import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Button, IconButton, Box,
  Menu, MenuItem, Container, useMediaQuery, useTheme, Drawer,
  List, ListItem, ListItemText, ListItemButton, Divider, Fade, Stack
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useAuth } from '../../context/AuthContext';
import LanguageToggle from '../common/LanguageToggle';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isLoggedIn, user, logout } = useAuth();
  const navbarRef = useRef(null);

  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
    handleMenuClose();
    setDrawerOpen(false);
  };

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const isHomePage = location.pathname === '/';
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
  ];  const drawerContent = (
    <Box sx={{ width: 320, bgcolor: '#FFFBF5', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2.5, borderBottom: '1px solid #E3D9CB' }}>
        <Typography variant="h5" sx={{ fontFamily: '"Playfair Display", serif', color: '#0A1E14', fontWeight: 600, letterSpacing: '0.02em', lineHeight: 1, '& span': { display: 'block', fontFamily: '"Inter", sans-serif', fontWeight: 300, fontSize: '0.5rem', letterSpacing: '0.2em', color: '#5A6E65', mt: 0.3 } }}>
          Rajshree<span>FASHION</span>
        </Typography>
        <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: '#1A1A1A', '&:hover': { bgcolor: 'rgba(10,30,20,0.06)' } }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List sx={{ pt: 2, flexGrow: 1 }}>
        {navItems.map((item, i) => (
          <ListItem key={item.label} disablePadding sx={{ opacity: 0, animation: `drawerFadeIn 0.4s ${0.05 * i}s forwards` }}>
            <ListItemButton onClick={() => { navigate(item.path); setDrawerOpen(false); }} sx={{ py: 2, px: 3, mx: 1.5, borderRadius: '8px', bgcolor: location.pathname === item.path ? 'rgba(10,30,20,0.06)' : 'transparent', '&:hover': { bgcolor: 'rgba(10,30,20,0.04)' } }}>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontFamily: '"Inter", sans-serif', fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: location.pathname === item.path ? 500 : 400, color: location.pathname === item.path ? '#0A1E14' : '#1A1A1A' }} />
              {location.pathname === item.path && <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#D4B26F' }} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <LanguageToggle insideDrawer={true} scrolled={scrolled} isHomePage={isHomePage} />
      <Divider sx={{ mx: 2, borderColor: '#E3D9CB' }} />

      <List sx={{ pt: 1, pb: 3 }}>
        {isLoggedIn ? (
          <>
            <ListItem disablePadding>
              <ListItemButton sx={{ py: 1.5, px: 3, mx: 1.5, borderRadius: '8px' }}>
                <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: '#0A1E14', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1.5 }}>
                  <Typography sx={{ color: '#FFF8F0', fontSize: '0.75rem', fontWeight: 500 }}>{user?.name?.charAt(0)?.toUpperCase() || 'U'}</Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontFamily: '"Inter", sans-serif', fontSize: '0.8rem', color: '#1A1A1A', fontWeight: 500 }}>{user?.name || 'User'}</Typography>
                  <Typography sx={{ fontFamily: '"Inter", sans-serif', fontSize: '0.6rem', color: '#6B6B6B', letterSpacing: '0.05em', textTransform: 'capitalize' }}>{user?.role || 'Member'}</Typography>
                </Box>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout} sx={{ py: 1.5, px: 3, mx: 1.5, borderRadius: '8px' }}>
                <ListItemText primary="Sign Out" primaryTypographyProps={{ fontFamily: '"Inter", sans-serif', fontSize: '0.8rem', letterSpacing: '0.05em', color: '#C62828' }} />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate('/login'); setDrawerOpen(false); }} sx={{ py: 1.5, px: 3, mx: 1.5, borderRadius: '8px' }}>
                <ListItemText primary="Sign In" primaryTypographyProps={{ fontFamily: '"Inter", sans-serif', fontSize: '0.8rem', letterSpacing: '0.05em', color: '#1A1A1A' }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate('/register'); setDrawerOpen(false); }} sx={{ py: 1.5, px: 3, mx: 1.5, borderRadius: '8px', bgcolor: '#0A1E14', '&:hover': { bgcolor: '#123322' } }}>
                <ListItemText primary="Create Account" primaryTypographyProps={{ fontFamily: '"Inter", sans-serif', fontSize: '0.8rem', letterSpacing: '0.05em', color: '#FFF8F0', fontWeight: 500 }} />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
      <style>{`@keyframes drawerFadeIn { from { opacity: 0; transform: translateX(12px); } to { opacity: 1; transform: translateX(0); } }`}</style>
    </Box>
  );

  return (
    <>
      <AppBar ref={navbarRef} position="fixed" sx={{ bgcolor: scrolled ? 'rgba(255, 251, 245, 0.94)' : isHomePage ? 'transparent' : 'rgba(255, 251, 245, 0.98)', backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none', borderBottom: scrolled ? '1px solid rgba(225, 217, 203, 0.6)' : isHomePage ? '1px solid transparent' : '1px solid #E3D9CB', boxShadow: 'none', transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 80 }, transition: 'min-height 0.4s', position: 'relative' }}>
            
            <Typography variant="h5" component={RouterLink} to="/" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 600, fontSize: scrolled ? '1.3rem' : { xs: '1.4rem', md: '1.5rem' }, color: (scrolled || !isHomePage) ? '#0A1E14' : '#FFF8F0', textDecoration: 'none', letterSpacing: '0.02em', transition: 'all 0.4s', flexGrow: { xs: 1, md: 0 }, lineHeight: 1, '& span': { fontFamily: '"Inter", sans-serif', fontWeight: 300, fontSize: '0.55rem', letterSpacing: '0.2em', display: 'block', mt: 0.2, color: (scrolled || !isHomePage) ? '#5A6E65' : 'rgba(255,248,240,0.6)', transition: 'color 0.4s' } }}>
              Rajshree<span>FASHION</span>
            </Typography>

            {!isMobile && (
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Button key={item.label} component={RouterLink} to={item.path} onMouseEnter={() => setHoveredLink(item.label)} onMouseLeave={() => setHoveredLink(null)} sx={{ color: (scrolled || !isHomePage) ? '#1A1A1A' : 'rgba(255,248,240,0.85)', fontSize: '0.7rem', letterSpacing: '0.12em', py: 2, px: 2.5, fontWeight: isActive ? 500 : 400, position: 'relative', transition: 'color 0.3s', '&::after': { content: '""', position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', width: isActive ? '60%' : (hoveredLink === item.label ? '60%' : '0%'), height: 2, bgcolor: (scrolled || !isHomePage) ? '#0A1E14' : '#D4B26F', transition: 'width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)', borderRadius: '1px' }, '&:hover': { bgcolor: 'transparent', color: (scrolled || !isHomePage) ? '#0A1E14' : '#FFF8F0' } }}>
                      {item.label}
                    </Button>
                  );
                })}
              </Box>
            )}

            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LanguageToggle scrolled={scrolled} isHomePage={isHomePage} />
                
                <Divider orientation="vertical" flexItem sx={{ my: 2.5, borderColor: (scrolled || !isHomePage) ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.15)' }} />

                {isLoggedIn ? (
                  <>
                    <IconButton onClick={handleMenuOpen} sx={{ color: (scrolled || !isHomePage) ? '#1A1A1A' : 'rgba(255,248,240,0.85)', transition: 'color 0.3s', '&:hover': { bgcolor: 'rgba(10,30,20,0.06)' } }}>
                      <PersonOutlineIcon />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} TransitionComponent={Fade} transitionDuration={250} PaperProps={{ sx: { borderRadius: '12px', border: '1px solid #E3D9CB', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', bgcolor: '#FFFBF5', mt: 1.5, minWidth: 220, overflow: 'hidden', '& .MuiList-root': { py: 0.5 } } }}>
                      <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #E3D9CB', mb: 0.5 }}>
                        <Typography sx={{ fontFamily: '"Inter", sans-serif', fontSize: '0.8rem', fontWeight: 500, color: '#1A1A1A' }}>{user?.name}</Typography>
                        <Typography sx={{ fontFamily: '"Inter", sans-serif', fontSize: '0.65rem', color: '#6B6B6B', mt: 0.2, letterSpacing: '0.05em', textTransform: 'capitalize' }}>{user?.role || 'Member'}</Typography>
                      </Box>
                      <MenuItem onClick={handleLogout} sx={{ fontFamily: '"Inter", sans-serif', fontSize: '0.8rem', letterSpacing: '0.03em', borderRadius: '6px', mx: 0.5, py: 1, color: '#C62828', '&:hover': { bgcolor: 'rgba(198,40,40,0.06)' } }}>Sign Out</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    <Button component={RouterLink} to="/login" sx={{ color: (scrolled || !isHomePage) ? '#1A1A1A' : 'rgba(255,248,240,0.85)', fontSize: '0.7rem', letterSpacing: '0.1em', py: 1.5, px: 2, '&:hover': { bgcolor: 'transparent', color: (scrolled || !isHomePage) ? '#0A1E14' : '#FFF8F0' } }}>
                      Sign In
                    </Button>
                    <Button component={RouterLink} to="/register" variant="outlined" size="small" sx={{ fontSize: '0.65rem', py: 1.2, px: 2.5, borderColor: (scrolled || !isHomePage) ? '#0A1E14' : 'rgba(255,248,240,0.5)', color: (scrolled || !isHomePage) ? '#0A1E14' : '#FFF8F0', '&:hover': { borderColor: (scrolled || !isHomePage) ? '#123322' : '#FFF8F0', bgcolor: 'transparent' } }}>
                      Create Account
                    </Button>
                  </>
                )}
              </Box>
            )}

            {isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: (scrolled || !isHomePage) ? '#1A1A1A' : '#FFF8F0', ml: 1, '&:hover': { bgcolor: 'rgba(10,30,20,0.06)' } }}>
                  <MenuIcon />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ sx: { bgcolor: 'transparent', boxShadow: 'none', '& .MuiBackdrop-root': { bgcolor: 'rgba(5, 15, 10, 0.5)', backdropFilter: 'blur(8px)' } } }} ModalProps={{ keepMounted: true, slotProps: { backdrop: { sx: { bgcolor: 'rgba(5, 15, 10, 0.5)', backdropFilter: 'blur(8px)' } } } }}>
        {drawerContent}
      </Drawer>
    </>
  );
}