
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubs: Subscription;

  constructor() {



    // this.retornaObservable().pipe(
    //   retry(1)     // retry es como intentalo de nuevo si se le pasa un parametro por ejemplo (1) este lo va intentar una sola vez
    // ).subscribe(
    //   valor => console.log('Subs:', valor),
    //   error => console.warn('Error', error),
    //   () => console.info('Obs terminado')
    // );0.........................................................................................0

    this.intervalSubs = this.retornaIntervalo().subscribe(console.log)
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {

    return interval(100)
      .pipe(
        take(10),
        map(valor => valor + 1),
        filter((valor) => ( valor % 2 === 0 ) ? true : false ),
      )
  }

  ngOnInit(): void {
  }


  retornaObservable(): Observable<number> {

    let i = -1;

    // El Observable tiene la capacidad de ejecutarse mientra se le indique lo contrario
    return new Observable<number>(observer => {


      const intervalo = setInterval(() => {

        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
 
          observer.complete(); //Esto marca al observable como completado
        }

        if (i === 2) {
          observer.error('i llego al valor de 2');
        }


      }, 1000);
    });

  }
}
