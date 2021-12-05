function formatName(name) {
  console.log(`Hello, ${name}`);
}

function setName(name, callback) {
  const myName = name;
  callback(myName);
}

setName("Aufa", formatName);
