export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter'],
        nanumGothic: ['NanumGothic'],
      },
      colors: {
        primary: '#FFA726',
        gray: {
          100: '#EFF2F6',
          200: '#EEEEEE',
          300: '#e8e8e8',
          400: '#CACACA',
          500: '#A1A1A1',
          600: '#9E9E9E',
          700: '#656565',
          800: '#535353',
          900: '#505050',
        },
        error: '#EC160A',
      },
    },
  },
  daisyui: {
    themes: [
      {
        theme: {
          primary: '#FFA726',
          secondary: '#FFA726',
          accent: '#FFA726',
          neutral: '#9E9E9E',
          'base-100': '#ffffff',
          info: '#0000ff',
          success: '#FFA726',
          warning: '#FFA726',
          error: '#EC160A',
          '.btn-primary': {
            'background-color': '#FFA726',
            'border-color': '#FFA726',
          },
          '.btn-primary:hover': {
            'background-color': '#FFA726',
            'border-color': '#FFA726',
          },
          '.btn-second': {
            'background-color': '#e8e8e8',
            'border-color': '#e8e8e8',
          },
          '.btn-second:hover': {
            'background-color': '#FFA726',
            'border-color': '#FFA726',
          },
          '.btn-second:focus': {
            'background-color': '#FFA726',
            'border-color': '#FFA726',
            'outline-color': '#FFA726',
          },
          '.btn-social': {
            'background-color': '#fee501',
            'border-color': '#fee501',
          },
          '.btn-social:hover': {
            'background-color': '#fee501',
            'border-color': '#fee501',
          },
          '.btn-social:focus': {
            'outline-color': '#fee501',
          },
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
