import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { JsonService } from './json.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Detalles } from './detalles';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {


  areas: string[] = [];
  departamentos: string[] = [];
  contador: number = 0;
  validacion = false;
  tituloDetalles: string;


  claseDetalles = new Detalles();

  constructor(
    public areasjson: JsonService,
    public detallesJSON: JsonService,
  
  ) {
    this.areasjson
      .getJSON('http://www.mocky.io/v2/5d4cc7853300004a0033742b')
      .forEach((area) => this.añadirAreaDepartamento(area));
 
    this.detallesJSON
      .getJSON('http://www.mocky.io/v2/5d4cc839330000520033742d')
      .forEach((deta) => this.añadirDetalles(deta));

    /* console.log(this.areas);
    console.log(this.departamentos);
    console.log(this.detalles); */
  }

  añadirAreaDepartamento(area) {
    for (this.contador; this.contador <= area['areas'].length; this.contador++) {
      this.areas.push(area['areas'][this.contador].name);
      this.departamentos.push(area['areas'][this.contador].departament);
    }
  }

  añadirDetalles(deta) {
    
    this.claseDetalles.town =  deta['details'][0]['town'];
    this.claseDetalles.boss = deta['details'][0]['boss'];
    this.claseDetalles.age = deta['details'][0]['age'];
    this.claseDetalles.last_degree = deta['details'][0]['last_degree'];

    this.claseDetalles.name = deta['name'];

    
  }

  areaSeleccionada(area) {

    this.tituloDetalles = area;

    if (area === "Finanzas" || area === "contabilidad" ||
        area === "Sistemas" || area === "Desarrollo" ||
        area === "pqrs") {

      this.validacion = true;
      
    } else {
      
      this.validacion = false;
    }
  }
}
