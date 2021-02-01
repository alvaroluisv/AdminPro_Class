import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert';
import { delay } from 'rxjs/operators';

import { Usuario } from '../../../models/usuario.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;

  constructor( private usuarioService: UsuarioService,
               private busquedasService: BusquedasService,
               private modalImagenService: ModalImagenService ) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.cargarUsuarios() );
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios( this.desde )
      .subscribe( ({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
    })
  }

  cambiarPagina( valor: number ) {
    this.desde += valor;

    if ( this.desde < 0 ) {
      this.desde = 0;
    } else if ( this.desde >= this.totalUsuarios ) {
      this.desde -= valor; 
    }

    this.cargarUsuarios();
  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedasService.buscar( 'usuarios', termino )
        .subscribe( resp => {

          this.usuarios = resp;

        });
  }

  eliminarUsuario( usuario: Usuario ) {

    if ( usuario.uid === this.usuarioService.uid ) {
      return Swal({
        title: 'Error',
        text:  'No puede borrarse a si mismo', 
        icon: 'error'});
    }

    Swal({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${ usuario.nombre }`,
      icon: 'info',
      buttons: {
        cancel: {
          text: 'Cancel',
          value: undefined,
          visible: true,
          className: '',
          closeModal: true,
        },
        confirm: {
          text: 'Si',
          value: true,
          visible: true,
          className: '',
          closeModal: true
        },
      },
      // showCancelButton: true,
      // confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      
      if (result) {
        // console.log(result);
        this.usuarioService.eliminarUsuario( usuario )
          .subscribe( resp => {
            
            this.cargarUsuarios();
            Swal({
              title: 'Usuario borrado',
              text:`${ usuario.nombre } fue eliminado correctamente`,
              icon: 'success'
            });
            
          });

      }
    })

  }

  cambiarRole( usuario: Usuario ) {
    
    this.usuarioService.guardarUsuario( usuario )
      .subscribe( resp => {
        console.log(resp); 
      })
  }


  abrirModal( usuario: Usuario ) {
  
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img );
  }

}
