// Corte del archivo histórico que se manda al índice de Google.
//
// Las páginas de mes son todas la misma plantilla rellenada con los datos de Red Eléctrica.
// Están bien para quien llega buscando un mes concreto, pero 70 páginas iguales sobre 102
// hacen que el sitio parezca generado en masa, y eso es justo lo que penaliza tanto Google
// como la revisión de AdSense. Los meses anteriores a este año siguen publicados y
// enlazados desde el archivo; simplemente no se ofrecen al buscador.
//
// Se sube o se baja el año, o se pone 0 para volver a indexarlos todos.
export const ARCHIVO_INDEXABLE_DESDE = 2024;
