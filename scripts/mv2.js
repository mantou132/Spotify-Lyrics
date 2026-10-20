const pkg = require('../extension/manifest.json');
pkg.manifest_version = 2;
pkg.web_accessible_resources = ['*'];
// MV2 has no `host_permissions`, host patterns live in `permissions`,
// `tabs.query({ url })` needs them when the `tabs` permission is absent (Firefox 86+)
pkg.permissions = [...pkg.host_permissions];
pkg.host_permissions = undefined;
pkg.background = { scripts: [pkg.background.service_worker] };
pkg.browser_action = pkg.action;
pkg.action = undefined;
require('fs').writeFileSync('./extension/manifest.json', JSON.stringify(pkg, null, 2));
