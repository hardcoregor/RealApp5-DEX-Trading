/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#243c5a',
        'nft-dark': '#24252D',
        'nft-gray-1': '#E3E1E3',
        'nft-gray-2': '#888888',
        'nft-gray-3': '#4F4F4F',
        'nft-black-1': '#2D2E36',
        'nft-black-2': '#1B1A21',
        'nft-black-3': '#2A2D3A',
        'nft-black-4': '#24252D',
        'nft-red-violet': '#DA18A3',
        'file-active': '#2196f3',
        'file-accept': '#00e676',
        'file-reject': '#ff1744',
        'overlay-black': 'rgba(0, 0, 0, 0.8)',
        'pink-1': '#eb1484',
        'redSell': '#F45353',
        'greenBuy': '#25CE8F',
        'light-gray': '#66646b',
        'link' : '#8ba9fe',
        'bordergray' : '#777479',
      },
      width: {
        215: '215px',
        357: '357px',
        557: '557px',
        36: '36%',
        49: '49%',
        72: '72%',
        73: '73%',
        200: '200%',
      },
      minWidth: {
        155: '155px',
        190: '190px',
        215: '215px',
        240: '240px',
        256: '256px',
        327: '327px',
        '1/2': '50%',
        '2/3': '67%',
      },
      minHeight: {
        '3/4': '75%',
      },
      height: {
        300: '300px',
        557: '557px',
      },
      inset: {
        45: '45%',
        65: '65px',
      },
      spacing: {
        65: '65px',
        69: '69px',
      },
      flex: {
        2: '2 2 0%',
      },
      lineHeight: {
        70: '70px',
      },
      zIndex: {
        '-5': '-5',
        0: '0',
      },
    },
    screens: {
      lg: { max: '1800px' },
      md: { max: '990px' },
      sm: { max: '600px' },
      xs: { max: '400px' },
      minmd: '1700px',
      minlg: '2100px',
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}