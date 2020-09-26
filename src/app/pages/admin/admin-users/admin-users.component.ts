import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";

import { CoreConfig } from "../../../../sdk/core.config";
import { FormGroup } from "@angular/forms";
import { HelperService } from "../../../../sdk/services/helper.service";
import { ImagesService } from "../../../../sdk/services/images.service";
import { Subscription } from "rxjs";
import { UserService } from "../../../../sdk/services/user.service";

@Component({
  selector: "app-admin-users",
  templateUrl: "./admin-users.component.html",
  styleUrls: ["./admin-users.component.scss"],
})
export class AdminUsersComponent implements OnInit {
  constructor(
    private userService: UserService,
    private helperService: HelperService,
    private imageService: ImagesService,
    private fb: FormBuilder
  ) {}
  limit = 10;
  pageStart = 1;
  loading = false;
  total = 0;
  listOfData = [];
  images = [];
  isVisible = false;
  saveLoading = false;
  imagesLoading = false;
  isVisibleGallery = false;
  addLoading = false;
  addForm: FormGroup;
  editForm: FormGroup;
  selectedData;
  isVisibleAddNew = false;

  ngOnInit(): void {
    this.formInitializer();
    this.getAll();
  }

  getAll(again = false) {
    this.loading = true;
    // if (!again) {
    //   this.pageStart = 1;
    // }

    let pageStart = 1;

    if (this.pageStart > 1) {
      pageStart = pageStart * this.limit + 1;
    }
    console.log("pageStart", pageStart);

    this.userService.getUsers(this.limit, pageStart).subscribe(
      (response) => {
        console.log("got response", response);
        this.listOfData = response.data.docs;
        this.total = response.data.total;
        this.loading = false;
      },
      (error) => {
        console.log("error", error);
        const errorMsg =
          error?.error?.message || "No response. Please check your internet";
        this.helperService.createMessage("error", errorMsg);

        this.loading = false;
      }
    );
  }

  showImageGallery(_id) {
    this.getUserImages(_id);
    this.isVisibleGallery = true;
  }
  getUserImages(_id) {
    this.imagesLoading = true;
    this.imageService.getUserImagesAdmin(_id).subscribe(
      (response) => {
        for (let item of response.data) {
          item.src =
            CoreConfig.getStaticPath() + "/" + item.destination + item.filename;
        }
        this.images = response.data;

        this.imagesLoading = false;
      },
      (error) => {
        console.log("error", error);
        this.imagesLoading = false;
      }
    );
  }
  cancelGallery() {
    this.isVisibleGallery = false;
    this.images.length = 0;
  }
  formInitializer() {
    this.addForm = this.fb.group({
      username: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          this.noWhitespaceValidator,
        ],
      ],
      // email: [null, []],
      display_name: [null, []],
      role: [{ value: "User", disabled: true }, []],
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
    this.editForm = this.fb.group({
      username: [{ value: "", disabled: true }, []],
      // role: [{ value: "User", disabled: true }, []],
      display_name: [null, []],
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

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || "").trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  addNewUser() {
    this.addForm.reset();
    this.addForm.patchValue({ role: "User" });
    this.isVisibleAddNew = true;
  }

  deleteRow(data) {
    const body = {
      is_deleted: true,
    };
    const _id = data["_id"];
    this.userService.updateUser(_id, body).subscribe(
      (response) => {
        console.log("got response", response);
        this.getAll(true);
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
  updateUser() {
    const body = this.editForm.value;
    this.saveLoading = true;

    const _id = this.selectedData["_id"];
    this.userService.updateUser(_id, body).subscribe(
      (response) => {
        console.log("got response", response);
        this.getAll(true);
        this.saveLoading = false;
      },
      (error) => {
        this.saveLoading = false;

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
  okModal() {
    console.log("c");
    this.updateUser();
    this.isVisible = false;
  }

  okAddNewModal() {
    this.submitForm();
    if (this.addForm.valid) {
      this.addLoading = true;
      this.userService.addUser(this.addForm.value).subscribe(
        (response) => {
          console.log("got response", response);
          this.getAll(true);
          this.helperService.createMessage(
            "success",
            "User added successfully"
          );
          this.isVisibleAddNew = false;
          this.addLoading = false;
        },
        (error) => {
          this.addLoading = false;

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
    // this.isVisibleAddNew = false;
  }
  openEditModal(data) {
    console.log("c");
    this.selectedData = data;
    this.editForm.patchValue(data);
    this.isVisible = true;
    // this.isVisible = false;
  }
  cancelModal() {
    console.log("c");
    this.isVisible = false;
  }
  cancelAddNewModal() {
    this.isVisibleAddNew = false;
  }

  submitForm(): void {
    for (const i in this.addForm.controls) {
      if (i) {
        this.addForm.controls[i].markAsDirty();
        this.addForm.controls[i].updateValueAndValidity();
      }
    }
  }
}
