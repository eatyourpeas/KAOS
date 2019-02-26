import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private afs: AngularFirestore) {

   }

   createRandomId(){
     return this.afs.createId();
   }

   getRandomQuestion(){
     let random_id = this.createRandomId();
     return this.afs.collection("Quiz", ref=>ref.where("random_id", ">", random_id).limit(3))
     .valueChanges();
   }

   addQuestion(question){
     return this.afs.collection("Quiz").add(question);
   }

   editQuestion(question_id, question){
     return this.afs.collection("Quiz").doc(question_id).update(question);
   }

   deleteQuestion(question_id){
     return this.afs.collection("Quiz").doc(question_id).delete();
   }
}
