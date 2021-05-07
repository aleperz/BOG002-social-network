import MockFirebase from 'mock-cloud-firestore';
import { AdminPost } from '../src/firebase/post_User.js';

const posts = new AdminPost();

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        "1suIqp56g0rizXRdpSUf": {
          description: "prueba de post con edicion incluida",
          name: "Alejandra",
          photoUrl: "null",
          uid: "Sef0Hp71o2RoAnjkSBsJLJkBpeB3",
          date: 1620089351399,
        },
        "2PDZFzKWHGZX646nfh8I": {
          description: "hola que tal",
          name: "Tatiana",
          photoUrl: "null",
          uid: "Nd1UM0HlPnMjtZCRbdcFr6e8AYi2",
          date: 1619806970225,
        },
      },
    },
  },
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });
global.db = firebase.firestore();

const user = {
  name: "Alejandra",
  photoUrl: "null",
  uid: "Sef0Hp71o2RoAnjkSBsJLJkBpeB3",
};

const objectRef = {
  description: "editeee el  post",
};

describe('getPost', () => {
  it('deberia mostrar la descripcion del primer post', (done) => {
    const callback = (querySnapshot) => {
      const allPosts = [];
      querySnapshot.forEach((doc) => {
        allPosts.push({ ...doc.data() });
      });
      expect(allPosts[0].description).toBe('prueba de post con edicion incluida');
      expect(allPosts).toHaveLength(2);
      done();
    };
    posts.getPost(callback);
  });
});

describe('savePost', () => {
  it('deberia guardar post', (done) => posts.savePost("este es un post", user).then((result) => {
    console.log(result);
    // expect(typeof result).toBe("object");
    done();
  }));
});

describe('getPostToEdit', () => {
  it('deberia traer un post por el id', (done) => posts.getPostToEdit("2PDZFzKWHGZX646nfh8I").then((result) => {
    expect(typeof result).toBe("object");
    expect(result.description).toBe("hola que tal");
    done();
  }));
});

describe('updatePost', () => {
  it('deberia editar el post por el id', (done) => posts.updatePost(objectRef, "2PDZFzKWHGZX646nfh8I").then((result) => {
    expect(typeof result).toBe("string");
    expect(result).toBe("post editado");
    done();
  }));
});

describe('deletePost', () => {
  it('deberia borrar el post por el id', (done) => posts.deletePost("2PDZFzKWHGZX646nfh8I").then((result) => {
    expect(typeof result).toBe("string");
    expect(result).toBe("post eliminado");
    done();
  }));
});
