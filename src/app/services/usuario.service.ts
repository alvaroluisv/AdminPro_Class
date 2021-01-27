import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  public auth2: any;

  public usuario: Usuario;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }


  // googleInit() {
  //   return new Promise(resolve => {
  //     gapi.load('auth2', () => {
  //       this.auth2 = gapi.auth2.init({
  //         client_id: '334938705628-ov0q217lssjjeoqppphm6ljf4r8rh9f2.apps.googleusercontent.com',
  //         cookiepolicy: 'single_host_origin',
  //       });
  //       // resolve();
  //     });
  //   })

  // }

  //Modificado para verificar el proceso ** Alvaro Luis **
    async googleInit() {
    return  await gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '334938705628-ov0q217lssjjeoqppphm6ljf4r8rh9f2.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        // resolve();
      });
   

  }


  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });

  }

  validarToken(): Observable<boolean> {
    // const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`, {
      // return this.http.get(`${base_url}/login`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {

        const { email, google, nombre, role, img = '',  uid } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid );0
        localStorage.setItem('token', resp.token);

        return true;
      }),
      catchError(error => of(false))
    );
  }


  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          // console.log(resp.token);
          localStorage.setItem('token', resp.token)
        })
      )
  }


  actualizarPerfil( data: { email: string, nombre: string, role: string } ) {

    data = {
      ...data, // esto quiere decir que la data tendra todo o que trae mas lo que se le expecifica abajo
      role: this.usuario.role
    }


    return this.http.put(`${ base_url }/usuarios/${ this.uid }`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }


  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      );
  }

  loginGoogle(token) {

    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      );

  }



}
