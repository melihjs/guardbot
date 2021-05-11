const ewe = event => require(`../events/${event}`);

module.exports = client => {
  client.on('message', ewe('message'));
};