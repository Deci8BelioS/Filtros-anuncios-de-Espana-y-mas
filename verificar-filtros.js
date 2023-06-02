const fs = require('fs');

const readFile = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (error, data) => {
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
    fs.writeFile(filename, data, 'utf8', (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

const removeDuplicateFilters = (filters) => {
  const uniqueFilters = new Map();
  const filterRegex = /^([^!].*)$/gm;
  let match;
  while ((match = filterRegex.exec(filters)) !== null) {
    const filter = match[1].trim();
    if (!uniqueFilters.has(filter)) {
      uniqueFilters.set(filter, true);
    }
  }
  return Array.from(uniqueFilters.keys()).join('\n');
};

(async () => {
  try {
    const filters = await readFile('filtro.txt');
    const uniqueFilters = removeDuplicateFilters(filters);
    await writeFile('filtros-unicos.txt', uniqueFilters);
    console.log('Filtros únicos generados en filtros-unicos.txt');
  } catch (error) {
    console.error('Error al procesar los filtros:', error);
    process.exit(1);
  }
})();
