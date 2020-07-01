module.exports = {
    "extends": "airbnb",
    "env": {
        "browser": true,
    },
    "rules": {
      "eslint quotes": ["1", "single"]*
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    },
    "globals": {
      "React": true,
      "PropTypes": true,
      "_": true,
    }
};
