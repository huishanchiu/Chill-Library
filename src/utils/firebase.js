const noop = () => {};

const createEmptyCollectionSnapshot = () => ({
  docs: [],
  forEach: noop,
});

const createEmptyDocSnapshot = () => ({
  id: "",
  data: () => ({}),
});

const createDocApi = () => ({
  set: () => Promise.resolve(),
  update: () => Promise.resolve(),
  delete: () => Promise.resolve(),
  collection: () => createQueryApi(),
  onSnapshot: (callback = noop) => {
    callback(createEmptyDocSnapshot());
    return noop;
  },
  get: () => Promise.resolve(createEmptyDocSnapshot()),
});

const createQueryApi = () => {
  const queryApi = {
    where: () => queryApi,
    limit: () => queryApi,
    orderBy: () => queryApi,
    onSnapshot: (callback = noop) => {
      callback(createEmptyCollectionSnapshot());
      return noop;
    },
    get: () => Promise.resolve(createEmptyCollectionSnapshot()),
    doc: () => createDocApi(),
  };
  return queryApi;
};

const createBatchApi = () => ({
  set: noop,
  update: noop,
  delete: noop,
  commit: () => Promise.resolve(),
});

const FieldValue = {
  arrayUnion: (...values) => values,
  arrayRemove: (...values) => values,
  increment: (value) => value,
};

const Timestamp = {
  now: () => ({
    toDate: () => new Date(),
    seconds: Math.floor(Date.now() / 1000),
    nanoseconds: 0,
  }),
};

const createFirestoreApi = () => ({
  collection: () => createQueryApi(),
  doc: () => createDocApi(),
  batch: () => createBatchApi(),
});

let authCurrentUser = null;
const authListeners = new Set();

const notifyAuthListeners = () => {
  authListeners.forEach((callback) => {
    try {
      callback(authCurrentUser);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Auth listener error", error);
    }
  });
};

const createAuthApi = () => ({
  get currentUser() {
    return authCurrentUser;
  },
  onAuthStateChanged: (callback = noop) => {
    authListeners.add(callback);
    callback(authCurrentUser);
    return () => {
      authListeners.delete(callback);
    };
  },
  signInWithEmailAndPassword: (email) => {
    authCurrentUser = {
      uid: "local-user",
      email,
      displayName: email?.split("@")[0] || "Local User",
      photoURL: "",
    };
    notifyAuthListeners();
    return Promise.resolve({ user: authCurrentUser });
  },
  createUserWithEmailAndPassword: (email) => {
    authCurrentUser = {
      uid: "local-user",
      email,
      displayName: email?.split("@")[0] || "Local User",
      photoURL: "",
    };
    notifyAuthListeners();
    return Promise.resolve({ user: authCurrentUser });
  },
  signInWithPopup: () => {
    authCurrentUser = {
      uid: "social-user",
      email: "social@example.com",
      displayName: "Social User",
      photoURL: "",
    };
    notifyAuthListeners();
    return Promise.resolve({ user: authCurrentUser });
  },
  signOut: () => {
    authCurrentUser = null;
    notifyAuthListeners();
    return Promise.resolve();
  },
});

const createStorageRef = () => ({
  put: () => Promise.resolve(),
  delete: () => Promise.resolve(),
  getDownloadURL: () => Promise.resolve(""),
  child: () => createStorageRef(),
});

const createStorageApi = () => ({
  ref: () => createStorageRef(),
});

const firebase = {
  auth: () => createAuthApi(),
  firestore: () => createFirestoreApi(),
  storage: () => createStorageApi(),
};

firebase.firestore.FieldValue = FieldValue;
firebase.firestore.Timestamp = Timestamp;
firebase.auth.FacebookAuthProvider = class FacebookAuthProvider {};
firebase.auth.GoogleAuthProvider = class GoogleAuthProvider {};

export default firebase;
