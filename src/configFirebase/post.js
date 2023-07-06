import {
  collection, db, auth, addDoc, getDocs,
} from './configFirebase.js';

export const publicações = async (mensagem) => {
  const document = await addDoc(collection(db, 'post'), {
    name: auth.currentUser.displayName,
    author: auth.currentUser.uid,
    msg: mensagem,
    likes: [],
  });
  return document;
};

export const retornoPublicacoes = async () => {
  const publicacoes = [];
  const querySnapshot = await getDocs(collection(db, 'post'));

  querySnapshot.forEach((post) => {
    publicacoes.push({ ...post.data(), id: post.id });
  });

  return publicacoes;
};
