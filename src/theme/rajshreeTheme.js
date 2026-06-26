import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Rajshree Fashion - Luxury Brand Theme (Redesigned)
// Burgundy + Ivory / Heritage Palette — refined with deeper, more sophisticated tones
const rawTheme = createTheme({
  palette: {
    primary: {
      main: '#0A3B24',       // Deep Burgundy
      light: '#1A5A3B',
      dark: '#062617',       // Dark Walnut
      contrastText: '#FFF8F0'
    },
    secondary: {
      main: '#C9A96E',       // Antique Gold
      light: '#DFC89A',
      dark: '#A6853E',
      contrastText: '#1A1A1A'
    },
    background: {
      default: '#FFF8F0',    // Warm Ivory
      paper: '#FDF8F3'       // Cream
    },
    text: {
      primary: '#1A1A1A',    // Charcoal
      secondary: '#6B6B6B',  // Warm Gray
      disabled: '#9E9E9E'
    },
    divider: '#D4A574',       // Antique Brass
    error: {
      main: '#C62828'
    },
    success: {
      main: '#2E7D32'
    },
    info: {
      main: '#5B6B7A'
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", "Georgia", serif',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      lineHeight: 1.05
    },
    h2: {
      fontFamily: '"Playfair Display", "Georgia", serif',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.12
    },
    h3: {
      fontFamily: '"Playfair Display", "Georgia", serif',
      fontWeight: 500,
      letterSpacing: '-0.005em',
      lineHeight: 1.2
    },
    h4: {
      fontFamily: '"Playfair Display", "Georgia", serif',
      fontWeight: 500,
      letterSpacing: '0em',
      lineHeight: 1.25
    },
    h5: {
      fontFamily: '"Playfair Display", "Georgia", serif',
      fontWeight: 500,
      letterSpacing: '0.01em',
      lineHeight: 1.3
    },
    h6: {
      fontFamily: '"Playfair Display", "Georgia", serif',
      fontWeight: 500,
      letterSpacing: '0.01em',
      lineHeight: 1.35
    },
    subtitle1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.06em',
      textTransform: 'uppercase'
    },
    subtitle2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 500,
      letterSpacing: '0.1em',
      textTransform: 'uppercase'
    },
    body1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 400,
      lineHeight: 1.8,
      letterSpacing: '0.01em'
    },
    body2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 300,
      lineHeight: 1.7
    },
    button: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 500,
      letterSpacing: '0.1em',
      textTransform: 'uppercase'
    },
    caption: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.06em'
    },
    overline: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 300,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      fontSize: '0.6rem'
    }
  },
  shape: {
    borderRadius: 4
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#FFF8F0',
          scrollBehavior: 'smooth',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          '&::-webkit-scrollbar': {
            width: 6
          },
          '&::-webkit-scrollbar-track': {
            background: '#FDF8F3'
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#D4A574',
            borderRadius: 3
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: '16px 40px',
          fontSize: '0.7rem',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-1px)'
          },
          '&:active': {
            transform: 'translateY(0px)'
          }
        },
        containedPrimary: {
          backgroundColor: '#0A3B24',
          boxShadow: '0 2px 12px rgba(10,59,36,0.15)',
          '&:hover': {
            backgroundColor: '#062617',
            boxShadow: '0 8px 28px rgba(10,59,36,0.3)'
          }
        },
        outlinedPrimary: {
          borderColor: '#0A3B24',
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
            backgroundColor: 'rgba(10,59,36,0.04)'
          }
        },
        textPrimary: {
          '&:hover': {
            backgroundColor: 'rgba(10,59,36,0.04)'
          }
        },
        sizeSmall: {
          padding: '10px 24px',
          fontSize: '0.65rem'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          border: '1px solid rgba(232, 221, 208, 0.6)',
          backgroundColor: '#FDF8F3',
          transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          '&:hover': {
            borderColor: '#D4A574',
            boxShadow: '0 12px 40px rgba(10,59,36,0.08)'
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
          border: '1px solid #E8DDD0',
          backgroundColor: '#FDF8F3'
        },
        elevation1: {
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          border: '1px solid rgba(232, 221, 208, 0.6)'
        },
        elevation2: {
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          border: '1px solid rgba(232, 221, 208, 0.4)'
        },
        elevation3: {
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          border: '1px solid rgba(232, 221, 208, 0.3)'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 248, 240, 0.8)',
            '& fieldset': {
              borderColor: '#E8DDD0',
              borderWidth: 1,
              transition: 'border-color 0.3s'
            },
            '&:hover fieldset': {
              borderColor: '#D4A574'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0A3B24',
              borderWidth: 1.5
            },
            '& .MuiOutlinedInput-input': {
              padding: '14px 16px'
            }
          },
          '& .MuiInputLabel-root': {
            fontFamily: '"Inter", sans-serif',
            letterSpacing: '0.04em',
            color: '#6B6B6B',
            '&.Mui-focused': {
              color: '#0A3B24'
            }
          },
          '& .MuiFormHelperText-root': {
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.03em',
            marginLeft: '4px'
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid transparent',
          backgroundColor: 'transparent',
          backgroundImage: 'none'
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#E8DDD0'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          fontFamily: '"Inter", sans-serif',
          fontWeight: 400,
          letterSpacing: '0.06em',
          fontSize: '0.65rem',
          height: 28
        },
        outlined: {
          borderColor: '#D4A574',
          '&:hover': {
            backgroundColor: 'rgba(212,165,116,0.08)'
          }
        },
        filled: {
          backgroundColor: '#0A3B24',
          color: '#FFF8F0'
        },
        sizeSmall: {
          height: 22,
          fontSize: '0.55rem'
        }
      }
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: 'separate',
          borderSpacing: 0
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            fontFamily: '"Inter", sans-serif',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontSize: '0.6rem',
            color: '#6B6B6B',
            borderBottom: '2px solid #0A3B24',
            padding: '16px 20px',
            backgroundColor: 'rgba(10,59,36,0.02)'
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: '"Inter", sans-serif',
          borderBottom: '1px solid #E8DDD0',
          padding: '14px 20px',
          color: '#1A1A1A',
          fontSize: '0.8rem'
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '16px',
          border: '1px solid #E8DDD0',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          backgroundColor: '#FFF8F0'
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          border: '1px solid',
          fontSize: '0.8rem'
        },
        standardSuccess: {
          backgroundColor: '#F0F8F0',
          borderColor: '#A5D6A7'
        },
        standardError: {
          backgroundColor: '#FFF0F0',
          borderColor: '#EF9A9A'
        }
      }
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: '#F0E8DD',
          borderRadius: '4px',
          '&::after': {
            background: 'linear-gradient(90deg, transparent, rgba(255,248,240,0.4), transparent)'
          }
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            color: '#9E9E9E',
            opacity: 1
          }
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: '8px'
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: '"Inter", sans-serif',
          fontSize: '0.85rem',
          '&:hover': {
            backgroundColor: 'rgba(10,59,36,0.04)'
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(10,59,36,0.08)',
            '&:hover': {
              backgroundColor: 'rgba(10,59,36,0.12)'
            }
          }
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: '6px',
          fontFamily: '"Inter", sans-serif',
          fontSize: '0.7rem',
          backgroundColor: '#062617',
          padding: '8px 14px'
        }
      }
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiPaper-root': {
            borderRadius: '8px'
          }
        }
      }
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(10, 5, 5, 0.6)',
          backdropFilter: 'blur(4px)'
        }
      }
    }
  }
});

const rajshreeTheme = responsiveFontSizes(rawTheme);

export default rajshreeTheme;
