const characteristics = {
  tooShort: false,
  isCommon: false,
  contains: {
    symbol: true,
    number: true,
    mixedCase: true,
  },
};

const commonPass = [
  "12345678",
  "password",
  "Password!",
  "p4ssw0rd",
  "pass",
  "letmein",
];

export { characteristics, commonPass };
