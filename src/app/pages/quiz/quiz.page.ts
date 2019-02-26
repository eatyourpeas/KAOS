import { Component, OnInit, ViewChild } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { UserprofileService } from '../../services/userprofile.service';
import { AlertController, ToastController, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {

  @ViewChild('slides') slides: IonSlides;
    selectedItem: any;
    slideOptions: any;
    flashCardFlipped: boolean = false;

    hasAnswered: boolean = false;
    score: number = 0;
    questions: any;
  //  question: any;

  flip: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private quizService: QuizService,
    private alertController: AlertController,
    private toastController: ToastController,
    private userProfileService: UserprofileService) {
      let profile = this.userProfileService.getCurrentUserProfile();
      profile.then(profile=>{
        if(profile){
          this.isAdmin = profile.admin;
        }
      })

    this.loadData();
  }

  ngOnInit() {
    this.slides.lockSwipes(true);
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

    randomizeAnswers(rawAnswers: any[], rawSolutions: any[]): any[] {

        let answers = [];

        for (let i = rawAnswers.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp_anwer = rawAnswers[i];
            let temp_solution = rawSolutions[i];
            rawAnswers[i] = rawAnswers[j];
            rawSolutions[i] = rawSolutions[j];
            rawAnswers[j] = temp_anwer;
            rawSolutions[j] = temp_solution
        }
        for (let i = 0; i < rawAnswers.length; i++) {
            let answer = {
              answer: rawAnswers[i],
              correct: rawSolutions[i],
              selected: false
            }
            answers.push(answer);
        }

        return answers;

    }

    restartQuiz() {
      this.slides.lockSwipes(false);
        this.score = 0;
        this.slides.lockSwipes(false);
        this.slides.slideTo(0, 1000);
        this.slides.lockSwipes(true);
        this.loadData();
    }

    createQuestion(){
      this.alertController.create({
        header: "KAOS Quiz",
        subHeader: "(Third Answer is the correct one)",
        inputs: [{
          name: 'question_text',
          type: 'text',
          placeholder: 'What is the tallest building in the world?...'
        },
        {
          name: 'answer_1',
          type: 'text',
          placeholder: 'The Eiffel Tower?'
        },
        {
          name: 'answer_2',
          type: 'text',
          placeholder: 'The Shard'
        },
        {
          name: 'answer_3',
          type: 'text',
          placeholder: 'Burj Khalifa'
        }],
        buttons:[{
          text: 'OK',
          handler: (data)=>{
            this.generateNewQuestion(data);
          }
        }, 'Cancel']
      }).then(alert=>{
        alert.present();
      })
    }

    generateNewQuestion(question){
      question.random_id = this.quizService.createRandomId();
      this.quizService.addQuestion(question).then(()=>{
        this.toastController.create({
          message: "Question Created!",
          duration: 1000
        }).then(toast=>{
          toast.present();
        })
      })
    }

    async loadData(){
      let next_question = await this.quizService.getRandomQuestion();


      next_question.subscribe(response=>{
        this.questions = response.map(question=>{
          let originalOrder = [question["answer_1"], question["answer_2"], question["answer_3"]];
          let originalAnswer = [false, false, true];
          question["answers"] = this.randomizeAnswers(originalOrder, originalAnswer);
          question["flashCardBack"] = question["answer_3"];
          question["flashCardFlipped"] = false;
          question["flashCardFront"] = question["question_text"];
          return question;
        });
      });
    }

}
