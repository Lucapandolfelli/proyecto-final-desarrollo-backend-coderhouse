class ContenedorMemoria {
  constructor() {
    this.array = [];
  }

  getById(id) {
    const obj = this.array.find((item) => item.id == id);
    if (!obj) {
      return false; // No se encontró
    } else {
      return obj;
    }
  }

  getAll() {
    if (this.array.length > 0) {
      return [...this.array];
    } else {
      return false; // No se encontraron elementos
    }
  }

  deleteById(id) {
    const element = this.getById(id);
    if (element === false) {
      return false; // No se encontró el elemento
    } else {
      let data = this.getAll();
      if (data === false) {
        return null; // No se encontraron elementos
      } else {
        this.array = data.filter((item) => item.id !== element.id);
        return true;
      }
    }
  }
}

export default ContenedorMemoria;
