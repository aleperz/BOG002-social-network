const auth = () => ({
  signInWithEmailAndPassword: (email, password) => new Promise((resolve) => {
    resolve({
      user: {
        displayName: "usuario nuevo",
        emailVerified: true,
        email: "usuarionuevo@example.com",
      },
    });
  }),
});

const firebase = {
  auth: auth,
};
export default jest.fn(() => firebase);
