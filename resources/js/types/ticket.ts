export interface Proceso {
  id: number;
  nombre_proceso: string;
}

export interface Importancia {
  id: number;
  descripcion: string; 
}

export interface Anexo {
  id: number;
  nombre_archivo: string;
  ruta_archivo: string;
}

export interface Respuesta {
  id: number;
  descripcion: string;
  created_at: string;
  user: {
    name: string;
  };
  anexos: Anexo[];
}

export interface Ticket {
  id: number;
  user_id: number;
  proceso_id: number;
  importancia_id: number;
  descripcion: string;
  estado: string;
  fecha_apertura: string;
  fecha_cierre?: string;
  proceso: Proceso;
  importancia: Importancia;
  anexos: Anexo[];
  respuestas: Respuesta[];
}
