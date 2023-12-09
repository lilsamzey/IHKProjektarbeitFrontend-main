import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService, Role } from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;


userMessage='';


  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }
  adminSet() {
    this.authForm.get('username')?.setValue('admin@gmail.com');
    this.authForm.get('password')?.setValue('password123');
  }
  teacherSet() {
    this.authForm.get('username')?.setValue('sinem@gmail.com');
    this.authForm.get('password')?.setValue('4SinemTaskesen');
  }
  studentSet() {
    this.authForm.get('username')?.setValue('samett@gmail.com');
    this.authForm.get('password')?.setValue('7SametToprak');
  }
  onSubmit(event: Event) {

    const startTime = new Date().getTime();

    event.preventDefault();
    this.submitted = true;
    this.loading = true;
    this.error = '';

    if (this.authForm.invalid) {
      this.error = 'Username and Password not valid !';
      return;
    } else {
      this.subs.sink = this.authService
        .login(this.f['username'].value, this.f['password'].value)
        .subscribe({
          next: (res) => {
            if (res) {
              setTimeout(() => {
               const currentUser = this.authService.currentUserValue;
               console.log('current Username:', currentUser);
                const role = this.authService.currentUserValue.role;

                 if (role === Role.All || role === Role.Admin) {
                  this.router.navigate(['/admin/dashboard/main']);
                } else if (role === Role.Teacher) {
                  this.router.navigate(['/teacher/dashboard']);
                } else if (role === Role.Student) {
                  this.router.navigate(['/student/dashboard']);
                } else {
                  this.router.navigate(['/authentication/signin']);
                }
                this.loading = false;
                const duration = (new Date().getTime() - startTime) / 1000;
                    console.log(`Login ${duration} second.`);
              }, 1000);
            } else {
              this.error = 'Invalid Login';

            }
          },
          error: (error) => {
            this.error = 'Username and Password not valid !';
            this.submitted = false;
            this.loading = false;

          },

        });
    }
  }
}
