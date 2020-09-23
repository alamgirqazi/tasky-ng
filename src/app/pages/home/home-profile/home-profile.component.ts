import { Component, OnInit } from "@angular/core";

import { AbstractControl } from "@angular/forms";
import { AuthService } from "src/sdk/services/auth.service";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { HelperService } from "./../../../../sdk/services/helper.service";
import { Subscription } from "rxjs";
import { UserService } from "src/sdk/services/user.service";
import { Validators } from "@angular/forms";

@Component({
  selector: "app-home-profile",
  templateUrl: "./home-profile.component.html",
  styleUrls: ["./home-profile.component.scss"],
})
export class HomeProfileComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private helperService: HelperService
  ) {}
  profilePasswordForm: FormGroup;
  profileForm: FormGroup;
  profileSaveLoading = false;
  profilePasswordSaveLoading = false;
  user;

  ngOnInit(): void {
    this.getCurrentUser();
    this.formInitializer();
  }

  formInitializer() {
    this.profileForm = this.fb.group({
      username: [{ value: null, disabled: true }, []],
      // email: [null, []],
      display_name: [null, [Validators.required]],
    });
    this.profilePasswordForm = this.fb.group({
      username: [{ value: "", disabled: true }, []],
      // role: [{ value: "User", disabled: true }, []],
      old_password: [null, [Validators.required, Validators.minLength(6)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirm_password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          this.matchOtherValidator("password"),
        ],
      ],
    });
  }

  updateUser() {
    const body = this.profileForm.value;
    this.profileSaveLoading = true;

    const _id = this.user["_id"];
    this.userService.updateUser(_id, body).subscribe(
      (response) => {
        this.helperService.createMessage("success", "Updated successfully");

        console.log("got response", response);
        this.getCurrentUser();
        this.profileSaveLoading = false;
      },
      (error) => {
        this.profileSaveLoading = false;

        console.log("error", error);
        if (error.error.code === 422) {
          return;
        }
        const errorMsg =
          error?.error?.message || "No response. Please check your internet";
        this.helperService.createMessage("error", errorMsg);
      }
    );
  }
  updatePassword() {
    const body = this.profilePasswordForm.value;
    this.profilePasswordSaveLoading = true;

    const _id = this.user["_id"];
    this.userService.updateUserPassword(_id, body).subscribe(
      (response) => {
        this.helperService.createMessage(
          "success",
          "Password updated successfully"
        );

        this.profilePasswordForm.reset();
        this.profilePasswordForm.patchValue({ username: this.user.username });
        console.log("got response", response);
        this.profilePasswordSaveLoading = false;
      },
      (error) => {
        this.profilePasswordSaveLoading = false;

        console.log("error", error);
        if (error.error.code === 422) {
          return;
        }
        const errorMsg =
          error?.error?.message || "No response. Please check your internet";
        this.helperService.createMessage("error", errorMsg);
      }
    );
  }

  getCurrentUser() {
    const { _id } = this.authService.getdecodedAccessTokenId();

    this.userService.getCurrentUser(_id).subscribe(
      (response) => {
        console.log("got response", response);
        this.user = response.data;
        this.profileForm.patchValue(response?.data);
        this.profilePasswordForm.patchValue({
          username: response?.data?.username,
        });
        // this.getAll(true);
        // this.saveLoading = false;
      },
      (error) => {
        // this.saveLoading = false;

        console.log("error", error);
        if (error.error.code === 422) {
          return;
        }
        const errorMsg =
          error?.error?.message || "No response. Please check your internet";
        this.helperService.createMessage("error", errorMsg);
      }
    );
  }
  matchOtherValidator(otherControlName: string) {
    return (control: AbstractControl): { [key: string]: any } => {
      const otherControl: AbstractControl = control.root.get(otherControlName);

      if (otherControl) {
        const subscription: Subscription = otherControl.valueChanges.subscribe(
          () => {
            control.updateValueAndValidity();
            subscription.unsubscribe();
          }
        );
      }

      return otherControl && control.value !== otherControl.value
        ? { match: true }
        : null;
    };
  }
}
