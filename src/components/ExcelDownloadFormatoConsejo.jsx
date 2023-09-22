import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ExcelDownloadButton = () => {
  const handleDownload = () => {
    // Create a sample data for the Excel template
    const data = [
      ['Name', 'Age', 'Email'],
      ['John Doe', 30, 'john@example.com'],
      ['Jane Smith', 25, 'jane@example.com'],
      // Add more data rows as needed
    ];

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.aoa_to_sheet(data);

    // Add the sheet to the workbook
    XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');

    // Generate Excel file binary data
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Convert binary data to Blob
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Save the Blob as a file using file-saver
    saveAs(blob, 'sample_template.xlsx');
  };

  return (
    <div onClick={handleDownload}>
      Descargar plantilla
    </div>
  );
};

export default ExcelDownloadButton;