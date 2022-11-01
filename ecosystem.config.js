module.exports = {
  apps : [{
    script: 'npm --prefix backend/frontend-component-collection run dev',
  },
  {
    script: 'npm --prefix backend/frontend-component-collection run watch:public',
  }],
};
