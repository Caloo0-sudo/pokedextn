export class Pokemones { /* Representacion de un objeto existente */
/* No movimientos no habs */
/* Atributos */
private ataque: number;
private tipo: string;
private nombre: string;
private id: number;
private defensa: number;
private vida: number;

/* Constructor */
constructor(id_recibido: number, nombre_recibido: string, tipo_recibido: string, 
    ataque_recibido: number, defensa_recibido: number, vida_recibido: number){
        
this.ataque=ataque_recibido;//Recibo el ataque como parametro de mi clase
this.tipo=tipo_recibido;//Recibo el tipo como parametro de mi clase
this.nombre=nombre_recibido;//Recibo el nombre como parametro de mi clase
this.id=id_recibido;//Recibo el id como parametro de mi clase
this.defensa=defensa_recibido;//Recibo la defensa como parametro de mi clase
this.vida=vida_recibido;//Recibo la vida como parametro de mi clase

}

/* Métodos */
public atacar(){
    console.log("Estoy atacando");
}

public defender(){
    console.log("Estoy defendiendo");
}

public quitarVida(cantidad_quitar: number){
    this.vida-=cantidad_quitar;
}

public agregarVida(cantidad_sumar: number){
    this.vida+=cantidad_sumar;
}

public mostrar(){
    console.log(`id: ${this.id} nombre: ${this.nombre} tipo: ${this.tipo} ataque: ${this.ataque} 
    defensa: ${this.defensa} vida: ${this.vida}`);
}
}


