const fs = require("fs");

const readFile = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

const writeFile = (filename, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, "utf8", (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

const removeDuplicateFilters = (filters) => {
  const uniqueFilters = [];
  const filterRegex = /^(.*)$/gm; // Cambiado para incluir todas las líneas
  const sectionRegex = /^!.*$/gm;

  let match;
  let section = "";

  while ((match = filterRegex.exec(filters)) !== null) {
    const line = match[0].trim();

    if (section !== "") {
      uniqueFilters.push(section);
      section = "";
    }

    if (!uniqueFilters.includes(line)) {
      uniqueFilters.push(line);
    }
  }

  if (section !== "") {
    uniqueFilters.push(section);
  }

  return uniqueFilters.join("\n");
};

(async () => {
  try {
    const filters = await readFile("filtro.txt");
    const uniqueFilters = removeDuplicateFilters(filters);
    const filterCount = uniqueFilters.split("\n").length;
    const finalContent = `${uniqueFilters}`;
    await writeFile("filtros-unicos.txt", finalContent);
    console.log("Filtros únicos generados en filtros-unicos.txt");
  } catch (error) {
    console.error("Error al procesar los filtros:", error);
    process.exit(1);
  }
})();
