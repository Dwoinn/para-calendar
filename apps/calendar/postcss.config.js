module.exports = {
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('postcss-prefixer')({
      prefix: 'para-calendar-',
    }),
  ],
};
