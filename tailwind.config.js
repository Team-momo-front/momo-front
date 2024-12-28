export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter'],
        nanumGothic: ['NanumGothic'],
      },
      colors: {
        primary: '#ADE145',
        gray: {
          100: '#EFF2F6',
          200: '#EEEEEE',
          300: '#ECECEC',
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
        momotheme: {
          primary: '#ADE145',
          secondary: '#ADE145',
          accent: '#ADE145',
          neutral: '#9E9E9E',
          'base-100': '#ffffff',
          info: '#0000ff',
          success: '#ADE145',
          warning: '#ADE145',
          error: '#EC160A',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
