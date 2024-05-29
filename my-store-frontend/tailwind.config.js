/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      "logo": ["Josefin Sans", "Arial", "sans-serif"],
      "nav": ["Jost"],
      "slider-text": ["Josefin Sans"],
      "sale": ["Playfair Display"]
    },
    letterSpacing: {
      "slider": ".25em",
      "tightest": '-.075em',
      "tighter": '-.05em',
      "tight": '-.025em',
      "normal": '0',
      "wide": '.025em',
      "wider": '.05em',
      "widest": '.1em'

    },
    screens: {
      "480": "480px",
      "768": "768px",
      "992": "992px "
    },
    keyframes: {
      'slide-right': {
        '0%': {
          transform: 'translateX(-500px);'
        },
        '100%': {
          transform: 'translateX(0);'
        }
      },
      'slide-left': {
        '0%': {
          transform: 'translateX(500px);'
        },
        '100%': {
          transform: 'translateX(0);'
        }
      },
      'slide-left2': {
        '0%': {
          transform: 'translateX(-100px);'
        },
        '100%': {
          transform: 'translateX(0);'
        }
      },
      'rotate-center': {
        '0%': {
          transform: 'rotate(0);',
          'border-radius': '9999px',
        },
        '100%': {
          transform: 'rotate(360deg);'
        }
      },
      'rotate-center-pause': {
        '0%': {
          transform: 'rotate(360deg);',
          'border-radius': '9999px',
        },
        '100%': {
          transform: 'rotate(0);'
        }
      },
    },
    animation: {
      'slide-right': 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
      'slide-left': 'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
      'slide-left2': 'slide-left2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
      'rotate-center': 'rotate-center 6s linear infinite;',
      'rotate-center-pause': 'rotate-center-pause 0.2s linear 1;',
    },
  },
  plugins: [],
}