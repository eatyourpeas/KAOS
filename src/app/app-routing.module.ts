import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'resources/complaints', loadChildren: './pages/complaints/complaints.module#ComplaintsPageModule' },
  { path: 'resources/consent', loadChildren: './pages/consent/consent.module#ConsentPageModule' },
  { path: 'resources/contacts', loadChildren: './pages/contacts/contacts.module#ContactsPageModule' },
  { path: 'resources/driving', loadChildren: './pages/driving/driving.module#DrivingPageModule' },
  { path: 'resources/drugs', loadChildren: './pages/drugs/drugs.module#DrugsPageModule' },
  { path: 'resources/entertainment', loadChildren: './pages/entertainment/entertainment.module#EntertainmentPageModule' },
  { path: 'resources/ethnicity', loadChildren: './pages/ethnicity/ethnicity.module#EthnicityPageModule' },
  { path: 'resources/gangs', loadChildren: './pages/gangs/gangs.module#GangsPageModule' },
  { path: 'resources/gender', loadChildren: './pages/gender/gender.module#GenderPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'resources/hospital', loadChildren: './pages/hospital/hospital.module#HospitalPageModule' },
  { path: 'profile/:uid', loadChildren: './pages/ident/ident.module#IdentPageModule', canActivate: [AuthGuard] },
  { path: 'resources/internet', loadChildren: './pages/internet/internet.module#InternetPageModule' },
  { path: 'resources/legal', loadChildren: './pages/legal/legal.module#LegalPageModule' },
  { path: 'list', loadChildren: './pages/list/list.module#ListPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'resources/medical-questions', loadChildren: './pages/medical-questions/medical-questions.module#MedicalQuestionsPageModule' },
  { path: 'resources/nutrition', loadChildren: './pages/nutrition/nutrition.module#NutritionPageModule' },
  { path: 'resources/privacy', loadChildren: './pages/privacy/privacy.module#PrivacyPageModule' },
  { path: 'quiz', loadChildren: './pages/quiz/quiz.module#QuizPageModule' },
  { path: 'resources/religion', loadChildren: './pages/religion/religion.module#ReligionPageModule' },
  { path: 'reset-password', loadChildren: './pages/reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'roster', loadChildren: './pages/roster/roster.module#RosterPageModule', canActivate: [AuthGuard] },
  { path: 'resources/schools', loadChildren: './pages/schools/schools.module#SchoolsPageModule' },
  { path: 'resources/shop', loadChildren: './pages/shop/shop.module#ShopPageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'team-members', loadChildren: './pages/team-members/team-members.module#TeamMembersPageModule' },
  { path: 'resources/visiting-times', loadChildren: './pages/visiting-times/visiting-times.module#VisitingTimesPageModule' },
  { path: 'walk-through', loadChildren: './pages/walk-through/walk-through.module#WalkThroughPageModule' },
  { path: 'resources/wards/:uid', loadChildren: './pages/ward-detail/ward-detail.module#WardDetailPageModule' },
  { path: 'resources/wards', loadChildren: './pages/wards/wards.module#WardsPageModule' },
  { path: 'roster/:uid', loadChildren: './pages/selected-roster/selected-roster.module#SelectedRosterPageModule', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
