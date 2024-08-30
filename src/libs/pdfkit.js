import PDFDocument from "pdfkit";
import { Buffer } from "buffer";
import axios from 'axios';

export async function buildPDF(dataCallback, endCallback) {
  const doc = new PDFDocument();

  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;

  // Definir el tamaño deseado para las imágenes
  const imageWidth = 250; // Ancho máximo disponible en la página
  const imageHeight = 200; // Altura ajustada para que las imágenes se acomoden bien

  // Agregar logo (suponiendo que tienes un archivo llamado 'logo.png')
  const logoPath = 'src/libs/logo.png';
  const startX = 50; // Margen izquierdo
  const startY = 40; // Margen superior
  const columnWidth = 150; // Ancho de cada columna
  const rowHeight = 80; // Altura de la fila ajustada
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('es-ES'); // Formato de fecha en español (dd/mm/yyyy)

  // Dibujar una fila con tres columnas
  function drawRow(y) {
    // Dibujar el borde de toda la fila
    doc.rect(startX, y, 510, rowHeight).stroke();

    // Dibujar bordes de las columnas
    // Borde de la Columna 1 (Logo)
    doc.rect(startX, y, 100, rowHeight).stroke();

    // Borde de la Columna 2 (Título)
    doc.rect(startX + 100, y, 300, rowHeight).stroke();

    // Borde de la Columna 3 (Fecha)
    doc.rect(startX + 400, y, 110, rowHeight).stroke();

    // Calcula el margen superior para centrar verticalmente
    const textY = y + (rowHeight - doc.heightOfString('Reporte de Monitoreo de Datos')) / 2;

    // Columna 1 - Logo
    doc.image(logoPath, startX + 10, y + 5, { width: 80 });

    // Columna 2 - Título (centrado verticalmente)
    doc.text('Reporte de Monitoreo de Datos', startX + columnWidth, textY, {
      width: 200,
      align: 'center'
    });

    // Columna 3 - Fecha (centrado verticalmente)
    doc.text(`Fecha: ${formattedDate}`, startX + 2.6 * columnWidth + 10, textY, {
      width: 100, // Reduce el ancho para evitar el borde
      align: 'right'
    });
  }

  // Dibujar la primera fila
  drawRow(startY);

  // Agregar la introducción
  const introY = startY + rowHeight + 20; // Posicionar la introducción debajo de la fila
  doc.fontSize(12)
    .text('El presente reporte tiene como objetivo proporcionar una representación visual detallada de los datos recopilados por EcoNexus. En este documento se presentan gráficamente las siguientes variables ambientales:', startX, introY, {
      width: pageWidth - 100,
      align: 'left'
    });

  // Añadir margen izquierdo a la lista
  const bulletY = introY + 20; // Ajusta este valor para cambiar la distancia entre la introducción y las viñetas
  const bulletMargin = 20; // Margen izquierdo para la lista

  doc.fontSize(12)
    .list([
      'Humedad',
      'Temperatura',
      'Pluviometría',
      'Dirección del viento',
      'Velocidad del viento',
      'Irradiancia'
    ], {
      start: bulletY,
      width: pageWidth - 100 - bulletMargin, // Ajusta el ancho considerando el margen
      align: 'left',
      indent: bulletMargin // Margen izquierdo adicional
    });

  // Dejar un margen adicional antes de las gráficas
  const marginAfterList = 20; // Margen después de la lista
  const imagesStartY = bulletY + 90 + marginAfterList; // Posición inicial para las gráficas

  // Obtener y agregar imágenes al PDF
  const addImageToPDF = async (imageData, xPosition, yPosition, label) => {
    const imageBuffer = Buffer.from(imageData.split(',')[1], 'base64');
    // Asegúrate de que la imagen cabe en la página
    doc.image(imageBuffer, xPosition, yPosition, { width: imageWidth, height: imageHeight });
    doc.text(label, xPosition, yPosition + imageHeight + 5, { width: imageWidth, align: 'center' }); // Reducir el espacio entre la imagen y el label
  };

  // Supongamos que recibes las imágenes en base64 como un argumento
  try {
    const response = await axios.get('http://localhost:3000/api/getgraph');
    const graphs = response.data;

    let xPosition = startX; // Posición X inicial para la imagen
    let yPosition = imagesStartY; // Posición Y inicial para la primera fila de imágenes

    // Añadir el primer gráfico (Luz) y el segundo gráfico (Humedad) en la misma fila
    await addImageToPDF(graphs[0].light, xPosition, yPosition, 'Gráfico de Luz');
    xPosition += imageWidth + 20; // Mueve la posición X para el siguiente gráfico (añade 20px de margen entre gráficos)
    await addImageToPDF(graphs[0].humidity, xPosition, yPosition, 'Gráfico de Humedad');
    
    // Mueve a la siguiente fila para el tercer gráfico si es necesario
    yPosition += imageHeight + 20; // Añade un margen entre filas

    // Verifica si el tercer gráfico cabe en la página actual
    if (yPosition + imageHeight > pageHeight) {
      doc.addPage();
      yPosition = 50; // Reinicia la posición Y para la nueva página
    }

    // Añadir el tercer gráfico (Temperatura)
    await addImageToPDF(graphs[0].temperature, startX, yPosition, 'Gráfico de Temperatura');
  } catch (error) {
    console.error('Error fetching graphs:', error);
  }

  doc.end();
}
