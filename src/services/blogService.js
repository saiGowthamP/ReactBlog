import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  increment,
  query,
  where
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
    await updateDoc(postDoc, {
      viewCount: increment(1)
    });
    const postSnapshot = await getDoc(postDoc);
    return { id: postSnapshot.id, ...postSnapshot.data() };
  },

  async createPost(postData) {
    const postsCollection = collection(db, 'posts');
    return await addDoc(postsCollection, {
      ...postData,
      createdAt: new Date(),
      viewCount: 0
    });
  },

  async updatePost(id, postData) {
    const postDoc = doc(db, 'posts', id);
    await updateDoc(postDoc, postData);
  },

  async deletePost(id) {
    const postDoc = doc(db, 'posts', id);
    const commentsCollection = collection(db, 'comments');
    const commentsQuery = query(commentsCollection, where('postId', '==', id));
    const commentSnapshot = await getDocs(commentsQuery);
    const deletePromises = commentSnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all([...deletePromises, deleteDoc(postDoc)]);
  },

  async getComments(postId) {
    const commentsCollection = collection(db, 'comments');
    const commentsQuery = query(
      commentsCollection,
      where('postId', '==', postId)
    );
    const commentSnapshot = await getDocs(commentsQuery);
    return commentSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async addComment(postId, commentData) {
    const commentsCollection = collection(db, 'comments');
    return await addDoc(commentsCollection, {
      postId,
      ...commentData,
      createdAt: new Date()
    });
  },

  async deleteComment(commentId) {
    const commentDoc = doc(db, 'comments', commentId);
    await deleteDoc(commentDoc);
  }
};