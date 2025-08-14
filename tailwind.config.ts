import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				serif: ['Playfair Display', 'serif'],
				display: ['Space Grotesk', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					hover: 'hsl(var(--primary-hover))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				electric: {
					DEFAULT: 'hsl(var(--electric))',
					foreground: 'hsl(var(--electric-foreground))'
				},
				magenta: {
					DEFAULT: 'hsl(var(--magenta))',
					foreground: 'hsl(var(--magenta-foreground))'
				},
				lime: {
					DEFAULT: 'hsl(var(--lime))',
					foreground: 'hsl(var(--lime-foreground))'
				},
				coral: {
					DEFAULT: 'hsl(var(--coral))',
					foreground: 'hsl(var(--coral-foreground))'
				},
				violet: {
					DEFAULT: 'hsl(var(--violet))',
					foreground: 'hsl(var(--violet-foreground))'
				},
				cyan: {
					DEFAULT: 'hsl(var(--cyan))',
					foreground: 'hsl(var(--cyan-foreground))'
				},
				gold: {
					DEFAULT: 'hsl(var(--gold))',
					foreground: 'hsl(var(--gold-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				info: {
					DEFAULT: 'hsl(var(--info))',
					foreground: 'hsl(var(--info-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in-left': {
					'0%': {
						opacity: '0',
						transform: 'translateX(-30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'glow': {
					'0%, 100%': {
						boxShadow: '0 0 40px hsl(212 100% 50% / 0.5)'
					},
					'50%': {
						boxShadow: '0 0 80px hsl(212 100% 50% / 0.8)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px) scale(1)',
						opacity: '0.7'
					},
					'50%': {
						transform: 'translateY(-20px) scale(1.1)',
						opacity: '1'
					}
				},
				'pulse-glow': {
					'0%, 100%': {
						opacity: '0.5',
						transform: 'scale(1)'
					},
					'50%': {
						opacity: '1',
						transform: 'scale(1.05)'
					}
				},
				'ken-burns': {
					'0%': {
						transform: 'scale(1) translate(0, 0)'
					},
					'25%': {
						transform: 'scale(1.1) translate(-2%, -1%)'
					},
					'50%': {
						transform: 'scale(1.05) translate(1%, -2%)'
					},
					'75%': {
						transform: 'scale(1.08) translate(-1%, 1%)'
					},
					'100%': {
						transform: 'scale(1) translate(0, 0)'
					}
				},
				'float-slow': {
					'0%, 100%': {
						transform: 'translateY(0px) rotate(0deg)',
						opacity: '0.6'
					},
					'50%': {
						transform: 'translateY(-30px) rotate(3deg)',
						opacity: '1'
					}
				},
				'float-slower': {
					'0%, 100%': {
						transform: 'translateY(0px) translateX(0px)',
						opacity: '0.4'
					},
					'33%': {
						transform: 'translateY(-15px) translateX(10px)',
						opacity: '0.8'
					},
					'66%': {
						transform: 'translateY(-25px) translateX(-5px)',
						opacity: '0.9'
					}
				},
				'gradient-x': {
					'0%, 100%': {
						'background-size': '200% 200%',
						'background-position': 'left center'
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'right center'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.8s ease-out',
				'slide-in-left': 'slide-in-left 0.6s ease-out',
				'glow': 'glow 2s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'ken-burns': 'ken-burns 20s ease-in-out infinite',
				'float-slow': 'float-slow 4s ease-in-out infinite',
				'float-slower': 'float-slower 5s ease-in-out infinite',
				'gradient-x': 'gradient-x 15s ease infinite',
				'spin-slow': 'spin 4s linear infinite'
			},
			backgroundImage: {
				'hero-gradient': 'var(--hero-gradient)',
				'neo-gradient': 'var(--neo-gradient)',
				'cyber-gradient': 'var(--cyber-gradient)',
				'plasma-gradient': 'var(--plasma-gradient)',
				'aurora-ultra': 'var(--aurora-ultra)',
				'holographic': 'var(--holographic)',
				'crystal-gradient': 'var(--crystal-gradient)',
				'glass-ultra': 'var(--glass-ultra)',
				'text-gradient': 'var(--text-gradient)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
