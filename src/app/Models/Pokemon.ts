export class PokemonModel {
    constructor(
        private id: number,
        private nombre: string,
        private imagen: string,
        private vida: number,
        private ataque: number,
        private defensa: number,
        private tipo: string,
        private descripcion?: string // Campo opcional
    ) { }

    getId(): number {
        return this.id;
    }

    getNombre(): string {
        return this.nombre;
    }

    getImagen(): string {
        return this.imagen;
    }

    getVida(): number {
        return this.vida;
    }

    getAtaque(): number {
        return this.ataque;
    }

    getDefensa(): number {
        return this.defensa;
    }

    getTipo(): string {
        return this.tipo;
    }

    getDescripcion(): string | undefined {
        return this.descripcion;
    }

    mostrarPokemon(): string {
        return `ID: ${this.id}, Nombre: ${this.nombre}, Tipo: ${this.tipo}, HP: ${this.vida}, ATK: ${this.ataque}, DEF: ${this.defensa}`;
    }
}
