// auth.js será para exportar funções relacionadas a autenticação

// getAppAuth- retorno da autenticação do firebase
// getUserId - retorno do id do usuario
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  app,
} from './configFirebase';

// login google
export const getAppAuth = () => getAuth(app);

export const loginGoogle = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAppAuth();
  return signInWithPopup(auth, provider);
};

// criar usuario
export const createUserWithEmail = async (name, email, senha) => {
  let errorMessage;
  try {
    const userCredential = await createUserWithEmailAndPassword(name, email, senha);
    const user = userCredential.user;
    window.location.hash = '#feed';
    await updateProfile(user, {
      displayName: `${name}`,
    });
  } catch (error) {
    errorMessage.textContent = 'E-mail já está em uso';
  }
};

// login
export const loginWithEmail = (email, password) => {
  const auth = getAppAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

// deslogar
export async function userStateLogout() {
  const authLogOut = getAuth();
  await signOut(authLogOut);
}

export async function userAuthChanged(callback) {
  const authLogin = getAuth(app);
  onAuthStateChanged(authLogin, callback);
}

// id do usuario no firebase
export const getUserId = () => {
  const auth = getAppAuth();
  return auth.currentUser.uid;
};

// retorno do usuario autenticado caso exista
export const getUserName = () => {
  const auth = getAppAuth();
  const user = auth.currentUser;
  if (user) {
    return user.displayName;
  }
  return null;
};
