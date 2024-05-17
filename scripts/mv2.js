const pkg = require('../extension/manifest.json');
pkg.manifest_version = 2;
pkg.web_accessible_resources = ['*'];
pkg.host_permissions = undefined;
pkg.background = { scripts: [pkg.background.service_worker] };
pkg.browser_action = pkg.action;
pkg.action = undefined;
require('fs').writeFileSync('./extension/manifest.json', JSON.stringify(pkg, null, 2));
