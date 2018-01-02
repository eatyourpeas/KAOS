import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {

  @ViewChild('slides') slides: any;
    selectedItem: any;
    slideOptions: any;
    flashCardFlipped: boolean = false;

    hasAnswered: boolean = false;
    score: number = 0;
    questions: any;
  //  question: any;

    db: AngularFireDatabase;

    constructor(public navCtrl: NavController, afDb: AngularFireDatabase){
      this.db = afDb;
      this.loadData();

    }


    goBack(){
      this.navCtrl.pop();
    }

    ionViewDidLoad() {

        this.slides.lockSwipes(true);


        /*
        this.dataService.load().then((data) => {

            data.map((question) => {

                let originalOrder = question.answers;
                question.answers = this.randomizeAnswers(originalOrder);
                return question;

            });

            this.questions = data;

        });
        */

    }

    nextSlide(){
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
    }

    selectAnswer(answer, question){

        this.hasAnswered = true;
        answer.selected = true;
        question.flashCardFlipped = true;

        if(answer.correct){

            this.score++;
        }

        setTimeout(() => {
            this.hasAnswered = false;
            this.nextSlide();
            answer.selected = false;
            question.flashCardFlipped = false;
        }, 3000);
    }

    randomizeAnswers(rawAnswers: any[]): any[] {

        for (let i = rawAnswers.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = rawAnswers[i];
            rawAnswers[i] = rawAnswers[j];
            rawAnswers[j] = temp;
        }

        return rawAnswers;

    }

    restartQuiz() {
        this.score = 0;
        this.slides.lockSwipes(false);
        this.slides.slideTo(1, 1000);
        this.slides.lockSwipes(true);
        this.loadData();
    }

    loadData(){
      this.db.list('questions').snapshotChanges().map(questions =>{
        return questions.map(question => ({ key: question.key, ...question.payload.val() }));
      }).subscribe(questions=>{
        questions.map((question) => {

            let originalOrder = question.answers;
            question.answers = this.randomizeAnswers(originalOrder);
            return question;

        });
        this.questions = questions;
      });
    }
}
