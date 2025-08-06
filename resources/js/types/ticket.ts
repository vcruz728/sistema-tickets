export interface Anexo {
  id: number;
  nombre_archivo: string;
  ruta_archivo: string;
  mime: string;
  size: number;
}

export interface Respuesta {
  id: number;
  descripcion: string;
  created_at: string;
  user?: {
    name: string;
  };
  anexos?: Anexo[];
}

export interface Ticket {
  id: number;
  estado: string;
  descripcion: string;
  fecha_apertura: string;
  fecha_cierre?: string;
  importancia?: {
    nombre_importancia: string;
  };
  proceso?: {
    nombre_proceso: string;
  };
  respuestas?: Respuesta[];
  anexos?: any[];
}
