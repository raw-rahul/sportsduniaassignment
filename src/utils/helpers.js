import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
export const exportToCSV = (data, filename) => {
  const csvRows = [];
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(","));

  data.forEach((row) => {
    const values = headers.map((header) => row[header]);
    csvRows.push(values.join(","));
  });

  const csvData = csvRows.join("\n");
  const blob = new Blob([csvData], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportToPDF = (data, filename) => {
  const doc = new jsPDF();
  const headers = Object.keys(data[0]);

  const rows = data.map((item) => headers.map((header) => item[header]));

  doc.text("Payout Report", 14, 10);
  autoTable(doc, {
    startY: 20,
    head: [headers],
    body: rows,
  });

  doc.save(filename);
};
