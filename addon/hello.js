var addon = require('bindings')('hello');

addon
  .longOperation(() => {
    console.log('this is a callback');
  })
  .then((result) => {
    console.log('Long operation completed successfully', result);
  })
  .catch((err) => {
    console.error('Long operation failed:', err);
  });
