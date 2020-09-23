import { AbstractControl, FormBuilder } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

import { AuthService } from "src/sdk/services/auth.service";
import { FormGroup } from "@angular/forms";
import { HelperService } from "../../../../sdk/services/helper.service";
import { Subscription } from "rxjs";
import { UserService } from "../../../../sdk/services/user.service";
import { Validators } from "@angular/forms";

@Component({
  selector: "app-admin-profile",
  templateUrl: "./admin-profile.component.html",
  styleUrls: ["./admin-profile.component.scss"],
})
export class AdminProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private helperService: HelperService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}
  profilePasswordForm: FormGroup;
  profilePasswordSaveLoading = false;
  admin;
  ngOnInit(): void {
    this.formInitializer();
    this.getCurrentUser();
  }

  formInitializer() {
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

  updatePassword() {
    const body = this.profilePasswordForm.value;
    this.profilePasswordSaveLoading = true;

    const _id = this.admin["_id"];
    this.userService.updateUserPassword(_id, body).subscribe(
      (response) => {
        this.helperService.createMessage(
          "success",
          "Password updated successfully"
        );

        this.profilePasswordForm.reset();
        this.profilePasswordForm.patchValue({ username: this.admin.username });
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
        this.admin = response.data;
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
}
