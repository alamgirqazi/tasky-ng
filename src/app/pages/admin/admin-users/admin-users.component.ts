import { Component, OnInit } from "@angular/core";

import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { HelperService } from "../../../../sdk/services/helper.service";
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
    private fb: FormBuilder
  ) {}
  limit = 10;
  pageStart = 1;
  loading = false;
  total = 0;
  listOfData = [];
  isVisible = false;
  saveLoading = false;
  editForm: FormGroup;
  selectedData;

  ngOnInit(): void {
    this.formInitializer();
    this.getAll();
  }

  getAll(again = false) {
    this.loading = true;
    if (!again) {
      this.pageStart = 1;
    }

    this.userService.getUsers(this.limit, this.pageStart).subscribe(
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

  formInitializer() {
    this.editForm = this.fb.group({
      username: [{ value: null, disabled: true }, []],
      // email: [null, []],
      display_name: [null, []],
      role: [null, []],
      // password: [null, [Validators.required, Validators.minLength(6)]],
    });
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
}
