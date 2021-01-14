import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UsuarioModel } from "../../models/usuario.model";
import { AuthService } from "../../services/auth.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"],
})
export class RegistroComponent implements OnInit {
  usuario: UsuarioModel;
  recordarme: false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    Swal.fire({
      allowOutsideClick: false,
      icon: "info",
      text: "Espere por favor...",
    });
    Swal.showLoading();

    this.auth.nuevoUsuario(this.usuario).subscribe(
      (resp) => {
        Swal.close();

        if (this.recordarme) {
          localStorage.setItem("email", this.usuario.email);
        }

        console.log(resp);
        this.router.navigateByUrl("/home");
      },
      (err) => {
        Swal.fire({
          allowOutsideClick: false,
          icon: "error",
          title: "Error al autenticar",
          text: err.error.error.message,
        });
        console.log(err.error.error.message);
      }
    );
  }
}
