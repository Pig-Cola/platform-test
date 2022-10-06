module.exports = {
  apps: [
    {
      name: 'EAC',
      script: 'node_modules/next/dist/bin/next',
      instances: 2,
      args: 'start',
    },
  ],
}
