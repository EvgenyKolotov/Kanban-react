import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

export const initialize = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyCyJ2yRAZ6xaO0inbaf8xNQ8idHfeTOgsc",
    authDomain: "kanban-d9872.firebaseapp.com",
    databaseURL: "https://kanban-d9872-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "kanban-d9872",
    storageBucket: "kanban-d9872.appspot.com",
    messagingSenderId: "780719952712",
    appId: "1:780719952712:web:2ec7ac67d073d17b0c597d",
    measurementId: "G-WY5PLYZVK7"
  });
  firebase.analytics();
};

const getDesks = () => {
  const db = firebase.firestore();
  return db.collection('desks').get()
    .then((querySnapshot) => {
      const desks = [];
      querySnapshot.forEach((doc) => {
        desks.push({
          id: doc.id,
          name: doc.data().name,
        })
      })
      return desks;
    });
};

const createDesk = (name) => {
  const db = firebase.firestore();
  return db.collection('desks').add({ name })
    .then((docRef) => docRef.get());
};

const editDesk = (id, name) => {
  const db = firebase.firestore();
  return db.collection('desks').doc(id).update({ name });
};

const deleteDesk = (id) => {
  const db = firebase.firestore();
  return db.collection('desks').doc(id).delete();
};

const getColumns = (deskId) => {
  const db = firebase.firestore();
  return db.collection('columns').where('deskId', '==', deskId).get()
    .then((querySnapshot) => {
      const columns = [];
      querySnapshot.forEach((doc) => {
        const { deskId, name } = doc.data();
        columns.push({ id: doc.id, name, deskId });
      })
      return columns;
    });
};

const createColumn = (name, deskId) => {
  const db = firebase.firestore();
  return db.collection('columns').add({ name, deskId })
    .then((docRef) => docRef.get());
};

const editColumn = (id, name) => {
  const db = firebase.firestore();
  return db.collection('columns').doc(id).update({ name });
};

const deleteColumn = (id) => {
  const db = firebase.firestore();
  return db.collection('columns').doc(id).delete();
};

const getCards = (columnId) => {
  const db = firebase.firestore();
  return db.collection('cards').where('columnId', '==', columnId).get()
    .then((querySnapshot) => {
      const cards = [];
      querySnapshot.forEach((doc) => {
        const { columnId, name } = doc.data();
        cards.push({ id: doc.id, name, columnId });
      })
      return cards;
    });
};

const getCard = (cardId) => {
  const db = firebase.firestore();
  return db.collection('cards').doc(cardId).get()
    .then((doc) => ({ id: doc.id, ...doc.data() }));
};

const createCard = (name, columnId) => {
  const db = firebase.firestore();
  return db.collection('cards').add({ name, columnId })
    .then((docRef) => docRef.get());
};

const editCard = (id, data = {}) => {
  const db = firebase.firestore();
  return db.collection('cards').doc(id).update(data);
};

const deleteCard = (id) => {
  const db = firebase.firestore();
  return db.collection('cards').doc(id).delete();
};

export const api = {
  createDesk,
  editDesk,
  getDesks,
  deleteDesk,
  getColumns,
  deleteColumn,
  getCards,
  deleteCard,
  createCard,
  createColumn,
  getCard,
  editColumn,
  editCard,
};
