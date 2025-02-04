import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  deleteDoc, 
  updateDoc 
} from 'firebase/firestore';
import { db } from './firebaseConfig';

export const blogService = {
  async getAllPosts() {
    const postsCollection = collection(db, 'posts');
    const postSnapshot = await getDocs(postsCollection);
    return postSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async getPostById(id) {
    const postDoc = doc(db, 'posts', id);
    const postSnapshot = await getDoc(postDoc);
    return { id: postSnapshot.id, ...postSnapshot.data() };
  },

  async createPost(postData) {
    const postsCollection = collection(db, 'posts');
    return await addDoc(postsCollection, {
      ...postData,
      createdAt: new Date()
    });
  },

  async updatePost(id, postData) {
    const postDoc = doc(db, 'posts', id);
    await updateDoc(postDoc, postData);
  },

  async deletePost(id) {
    const postDoc = doc(db, 'posts', id);
    await deleteDoc(postDoc);
  }
};
