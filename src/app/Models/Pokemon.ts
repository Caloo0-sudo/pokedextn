export class PokemonModel {
    constructor(
        private id: number,
        private nombre: string,
        private imagen: string,
        private vida: number,
        private ataque: number,
        private defensa: number,
        private tipo: string,
        private descripcion?: string // Nuevo campo opcional
    ) { }

    // Getters existentes...
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

    // Setters...
    setId(id: number): void {
        this.id = id;
    }

    setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    setImagen(imagen: string): void {
        this.imagen = imagen;
    }

    setVida(vida: number): void {
        this.vida = vida;
    }

    setAtaque(ataque: number): void {
        this.ataque = ataque;
    }

    setDefensa(defensa: number): void {
        this.defensa = defensa;
    }

    setTipo(tipo: string): void {
        this.tipo = tipo;
    }

    setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
    }

    // Métodos de clase
    mostrarPokemon(): string {
        return `ID: ${this.id}, Nombre: ${this.nombre}, Tipo: ${this.tipo}, HP: ${this.vida}, ATK: ${this.ataque}, DEF: ${this.defensa}`;
    }
}