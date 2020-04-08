import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutPageModule) },
  { path: 'resources/complaints', loadChildren: () => import('./pages/complaints/complaints.module').then(m => m.ComplaintsPageModule) },
  { path: 'resources/consent', loadChildren: () => import('./pages/consent/consent.module').then(m => m.ConsentPageModule) },
  { path: 'resources/contacts', loadChildren: () => import('./pages/contacts/contacts.module').then(m => m.ContactsPageModule) },
  { path: 'resources/driving', loadChildren: () => import('./pages/driving/driving.module').then(m => m.DrivingPageModule) },
  { path: 'resources/drugs', loadChildren: () => import('./pages/drugs/drugs.module').then(m => m.DrugsPageModule) },
  { path: 'resources/entertainment', loadChildren: () => import('./pages/entertainment/entertainment.module').then(m => m.EntertainmentPageModule) },
  { path: 'resources/ethnicity', loadChildren: () => import('./pages/ethnicity/ethnicity.module').then(m => m.EthnicityPageModule) },
  { path: 'resources/gangs', loadChildren: () => import('./pages/gangs/gangs.module').then(m => m.GangsPageModule) },
  { path: 'resources/gender', loadChildren: () => import('./pages/gender/gender.module').then(m => m.GenderPageModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  { path: 'resources/hospital', loadChildren: () => import('./pages/hospital/hospital.module').then(m => m.HospitalPageModule) },
  { path: 'profile/:uid', loadChildren: () => import('./pages/ident/ident.module').then(m => m.IdentPageModule), canActivate: [AuthGuard] },
  { path: 'resources/internet', loadChildren: () => import('./pages/internet/internet.module').then(m => m.InternetPageModule) },
  { path: 'resources/legal', loadChildren: () => import('./pages/legal/legal.module').then(m => m.LegalPageModule) },
  { path: 'list', loadChildren: () => import('./pages/list/list.module').then(m => m.ListPageModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'resources/medical-questions', loadChildren: () => import('./pages/medical-questions/medical-questions.module').then(m => m.MedicalQuestionsPageModule) },
  { path: 'resources/nutrition', loadChildren: () => import('./pages/nutrition/nutrition.module').then(m => m.NutritionPageModule) },
  { path: 'resources/privacy', loadChildren: () => import('./pages/privacy/privacy.module').then(m => m.PrivacyPageModule) },
  { path: 'quiz', loadChildren: () => import('./pages/quiz/quiz.module').then(m => m.QuizPageModule) },
  { path: 'resources/religion', loadChildren: () => import('./pages/religion/religion.module').then(m => m.ReligionPageModule) },
  { path: 'reset-password', loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule) },
  { path: 'roster', loadChildren: () => import('./pages/roster/roster.module').then(m => m.RosterPageModule), canActivate: [AuthGuard] },
  { path: 'resources/schools', loadChildren: () => import('./pages/schools/schools.module').then(m => m.SchoolsPageModule) },
  { path: 'resources/shop', loadChildren: () => import('./pages/shop/shop.module').then(m => m.ShopPageModule) },
  { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule) },
  { path: 'team-members', loadChildren: () => import('./pages/team-members/team-members.module').then(m => m.TeamMembersPageModule) },
  { path: 'resources/visiting-times', loadChildren: () => import('./pages/visiting-times/visiting-times.module').then(m => m.VisitingTimesPageModule) },
  { path: 'walk-through', loadChildren: () => import('./pages/walk-through/walk-through.module').then(m => m.WalkThroughPageModule) },
  { path: 'resources/wards/:uid', loadChildren: () => import('./pages/ward-detail/ward-detail.module').then(m => m.WardDetailPageModule) },
  { path: 'resources/wards', loadChildren: () => import('./pages/wards/wards.module').then(m => m.WardsPageModule) },
  { path: 'roster/:uid', loadChildren: () => import('./pages/selected-roster/selected-roster.module').then(m => m.SelectedRosterPageModule), canActivate: [AuthGuard] },
  { path: 'resources/exercise', loadChildren: () => import('./pages/exercise/exercise.module').then(m => m.ExercisePageModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
