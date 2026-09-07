const F = (key, label, placeholder, required = false, options = {}) => ({ key, label, placeholder, required, ...options });
const E = (id, group, name, method, path, fields = [], options = {}) => ({ id, group, name, title: name, method, path, fields, ...options });

const ENDPOINTS = [
  E('send', 'SMS', 'Send SMS', 'POST', 'sms/send', [F('sender', 'Sender', '10004346', true), F('receptor', 'Receptor', '09123456789', true), F('message', 'Message', 'Hello from Kavenegar!', true, { type: 'textarea', full: true }), F('type', 'Message type', '1'), F('date', 'Send date', 'Unix timestamp'), F('localid', 'Local IDs', 'id-1,id-2'), F('tag', 'Tag', 'campaign'), F('text', 'Text', 'Optional text'), F('hide', 'Hide', 'Optional'), F('localmessageid', 'Local message ID', 'local-123'), F('policy', 'Policy', 'Optional'), F('mediaid', 'Media ID', 'UUID')]),
  E('sendarray', 'SMS', 'Send array', 'POST', 'sms/sendarray', [F('sender', 'Senders (JSON array)', '["10004346"]', true), F('receptor', 'Receptors (JSON array)', '["09123456789"]', true), F('message', 'Messages (JSON array)', '["Hello!"]', true, { full: true }), F('type', 'Types (JSON array)', '[1]', true), F('date', 'Send date', 'Unix timestamp'), F('localmessageids', 'Local message IDs', '["local-1"]'), F('tag', 'Tag', 'campaign'), F('hide', 'Hide', 'Optional'), F('policy', 'Policy', 'Optional'), F('mediaid', 'Media ID', 'UUID')]),
  E('status', 'SMS', 'Message status', 'POST', 'sms/status', [F('messageid', 'Message IDs', '123456789', true, { full: true })]),
  E('statuslocal', 'SMS', 'Status by local ID', 'POST', 'sms/statuslocalmessageid', [F('localid', 'Local IDs', 'local-123', true, { full: true })]),
  E('select', 'SMS', 'Select messages', 'POST', 'sms/select', [F('messageid', 'Message IDs', '123456789', true, { full: true })]),
  E('selectoutbox', 'SMS', 'Select outbox', 'POST', 'sms/selectoutbox', [F('startdate', 'Start date', '1700000000', true), F('enddate', 'End date', '1700086400', true), F('sender', 'Sender', '10004346')]),
  E('latestoutbox', 'SMS', 'Latest outbox', 'POST', 'sms/latestoutbox', [F('pagesize', 'Page size', '20', true), F('sender', 'Sender', '10004346')]),
  E('countoutbox', 'SMS', 'Count outbox', 'POST', 'sms/countoutbox', [F('startdate', 'Start date', '1700000000', true), F('enddate', 'End date', '1700086400', true), F('status', 'Status', '10', true)]),
  E('cancel', 'SMS', 'Cancel message', 'POST', 'sms/cancel', [F('messageid', 'Message IDs', '123456789', true, { full: true })]),
  E('receive', 'SMS', 'Receive messages', 'POST', 'sms/receive', [F('linenumber', 'Line number', '10004346', true), F('isread', 'Read status', '0', true)]),
  E('countinbox', 'SMS', 'Count inbox', 'POST', 'sms/countinbox', [F('startdate', 'Start date', '1700000000', true), F('enddate', 'End date', '1700086400', true), F('linenumber', 'Line number', '10004346', true), F('isread', 'Read status', '0', true)]),
  E('statusreceptor', 'SMS', 'Status by receptor', 'POST', 'sms/statusbyreceptor', [F('receptor', 'Receptor', '09123456789', true), F('startdate', 'Start date', '1700000000'), F('enddate', 'End date', '1700086400')]),
  E('makereceive', 'SMS', 'Create received message', 'POST', 'sms/makereceive', [F('linenumber', 'Line number', '10004346', true), F('sender', 'Sender', '09123456789', true), F('messageid', 'Message ID', '123456789', true), F('message', 'Message', 'Incoming message', true, { type: 'textarea', full: true }), F('isread', 'Read status', '0', true)]),
  E('unreads', 'SMS', 'Unread messages', 'GET', 'sms/unreads', [F('linenumber', 'Line number', '10004346', true), F('isread', 'Read status', '0', true)]),
  E('inboxpaged', 'SMS', 'Paged inbox', 'GET', 'sms/inboxpaged', [F('linenumber', 'Line number', '10004346', true), F('isread', 'Read status', '0'), F('startdate', 'Start date', '1700000000'), F('enddate', 'End date', '1700086400'), F('pagenumber', 'Page number', '1')]),
  E('groupsendreport', 'SMS', 'Group send report', 'GET', 'sms/report/groupsend', [F('startdate', 'Start date', '1700000000', true), F('enddate', 'End date', '1700086400', true)]),

  E('account', 'Account & Voice', 'Account information', 'POST', 'account/info'),
  E('accountconfig', 'Account & Voice', 'Update account config', 'POST', 'account/config', [F('apilogs', 'API logs', 'enabled', true), F('dailyreport', 'Daily report', 'enabled', true), F('debugmode', 'Debug mode', 'disabled', true), F('defaultsender', 'Default sender', '10004346', true), F('mincreditalarm', 'Minimum credit alarm', '10000'), F('resendfailed', 'Resend failed', 'enabled', true)]),
  E('lookup', 'Account & Voice', 'Verify lookup', 'POST', 'verify/lookup', [F('receptor', 'Receptor', '09123456789', true), F('token', 'Token', '123456', true), F('template', 'Template', 'verify', true), F('type', 'Type', '0'), F('token2', 'Token 2', 'Optional'), F('token3', 'Token 3', 'Optional'), F('token10', 'Token 10', 'Optional'), F('token20', 'Token 20', 'Optional'), F('tag', 'Tag', 'signup')]),
  E('maketts', 'Account & Voice', 'Make text-to-speech call', 'POST', 'call/maketts', [F('receptor', 'Receptors', '09123456789', true), F('message', 'Message', 'Your verification code is 123456', true, { type: 'textarea', full: true }), F('date', 'Call date', 'Unix timestamp'), F('localid', 'Local IDs', 'call-1'), F('sender', 'Sender', 'Optional'), F('tag', 'Tag', 'voice'), F('policy', 'Policy', 'Optional'), F('mediaid', 'Media ID', 'UUID')]),

  E('clientadd', 'Subclients', 'Add subclient', 'POST', 'client/add', [F('username', 'Username', 'customer_1'), F('password', 'Password', 'StrongPassword'), F('fullname', 'Full name', 'Customer One'), F('mobile', 'Mobile', '09123456789'), F('credit', 'Credit', '100000'), F('planid', 'Plan ID', '1'), F('localid', 'Local ID', 'customer-1'), F('ip', 'IP', '127.0.0.1'), F('status', 'Status', '1'), F('mininumallowedcredit', 'Minimum allowed credit', '1000'), F('lines', 'Lines', '10004346'), F('canuseparentlines', 'Use parent lines', 'true'), F('expiredate', 'Expire date', '1700086400'), F('enablelink', 'Enable link', 'true')]),
  E('clientupdate', 'Subclients', 'Update subclient', 'POST', 'client/update', [F('apikey', 'Subclient API key', 'SUBCLIENT_API_KEY'), F('localid', 'Local ID', 'customer-1'), F('username', 'Username', 'customer_1'), F('password', 'Password', 'StrongPassword'), F('fullname', 'Full name', 'Customer One'), F('mobile', 'Mobile', '09123456789'), F('credit', 'Credit', '100000'), F('planid', 'Plan ID', '1'), F('lines', 'Lines', '10004346'), F('status', 'Status', '1'), F('ip', 'IP', '127.0.0.1'), F('expiredate', 'Expire date', '1700086400'), F('canuseparentlines', 'Use parent lines', 'true'), F('enablelink', 'Enable link', 'true'), F('cancharge', 'Can charge', 'true'), F('mininumallowedcredit', 'Minimum allowed credit', '1000')]),
  E('clientlist', 'Subclients', 'List subclients', 'GET', 'client/list'),
  E('clientfetch', 'Subclients', 'Fetch subclient', 'GET', 'client/fetch', [F('apikey', 'Subclient API key', 'SUBCLIENT_API_KEY', true, { full: true })]),
  E('clientfetchlocal', 'Subclients', 'Fetch by local ID', 'GET', 'client/fetchbylocalid', [F('localid', 'Local ID', 'customer-1', true, { full: true })]),
  E('clientrenew', 'Subclients', 'Renew subclient key', 'POST', 'client/renewkey', [F('apikey', 'Subclient API key', 'SUBCLIENT_API_KEY'), F('localid', 'Local ID', 'customer-1')]),
  E('clientstatus', 'Subclients', 'Set subclient status', 'POST', 'client/setstatus', [F('apikey', 'Subclient API key', 'SUBCLIENT_API_KEY', true), F('status', 'Status', '1', true)]),
  E('clientcharge', 'Subclients', 'Charge subclient credit', 'POST', 'client/chargecredit', [F('apikey', 'Subclient API key', 'SUBCLIENT_API_KEY', true), F('credit', 'Credit', '100000', true), F('desc', 'Description', 'Credit charge'), F('vat', 'VAT', '0'), F('ip', 'IP', '127.0.0.1')]),

  E('blockedadd', 'Blocked lines', 'Add blocked line', 'POST', 'line/blocked/add', [F('receptor', 'Receptor', '09123456789', true), F('linenumber', 'Line number', '10004346', true)]),
  E('blockedremove', 'Blocked lines', 'Remove blocked line', 'POST', 'line/blocked/remove', [F('receptor', 'Receptor', '09123456789', true), F('linenumber', 'Line number', '10004346', true)]),
  E('blockedlist', 'Blocked lines', 'List blocked lines', 'GET', 'line/blocked/list', [F('linenumber', 'Line number', '10004346', true), F('pagenumber', 'Page number', '1', true), F('startdate', 'Start date', '1700000000', true), F('blockreason', 'Block reason', '1')]),
  E('blockedexists', 'Blocked lines', 'Check blocked line', 'GET', 'line/blocked/exists', [F('linenumber', 'Line number', '10004346', true), F('receptor', 'Receptor', '09123456789', true)]),

  E('templatelist', 'Templates', 'List templates', 'GET', 'verify/templatelist', [F('apikey', 'Subclient API key', 'Optional'), F('localid', 'Local ID', 'Optional'), F('page', 'Page', '1')]),
  E('templateclone', 'Templates', 'Clone template', 'POST', 'verify/clonetemplate', [F('sourcetemplateid', 'Source template ID', '1'), F('sourcetemplatename', 'Source template name', 'verify'), F('newtemplatename', 'New template name', 'verify-copy'), F('apikey', 'Subclient API key', 'Optional'), F('localid', 'Local ID', 'Optional')]),
  E('templateadd', 'Templates', 'Add template', 'POST', 'verify/addtemplate', [F('name', 'Name', 'verify', true), F('sourcetype', 'Source type', '0'), F('sendmethod', 'Send method', '0'), F('fallbackmethod', 'Fallback method', '0'), F('primarylinenumber', 'Primary line', '10004346'), F('secondarylinenumber', 'Secondary line', 'Optional'), F('switchttl', 'Switch TTL', '60'), F('sourceurl', 'Source URL', 'https://example.com'), F('sourcename', 'Source name', 'My app'), F('textmessage', 'Text message', 'Code: %token', false, { type: 'textarea', full: true }), F('voicemessage', 'Voice message', 'Your code is %token'), F('localid', 'Local ID', 'Optional'), F('apikey', 'Subclient API key', 'Optional')]),
  E('templateupdate', 'Templates', 'Update template', 'POST', 'verify/updatetemplate', [F('templateid', 'Template ID', '1', true), F('name', 'Name', 'verify'), F('sourcetype', 'Source type', '0'), F('sendmethod', 'Send method', '0'), F('fallbackmethod', 'Fallback method', '0'), F('primarylinenumber', 'Primary line', '10004346'), F('secondarylinenumber', 'Secondary line', 'Optional'), F('switchttl', 'Switch TTL', '60'), F('sourceurl', 'Source URL', 'https://example.com'), F('sourcename', 'Source name', 'My app'), F('textmessage', 'Text message', 'Code: %token', false, { type: 'textarea', full: true }), F('voicemessage', 'Voice message', 'Your code is %token'), F('apikey', 'Subclient API key', 'Optional'), F('localid', 'Local ID', 'Optional')]),
  E('templateget', 'Templates', 'Get template', 'POST', 'verify/gettemplate', [F('id', 'Template ID', '1', true), F('apikey', 'Subclient API key', 'Optional'), F('localid', 'Local ID', 'Optional')]),
  E('templatedelete', 'Templates', 'Delete template', 'POST', 'verify/deletetemplate', [F('id', 'Template ID', '1', true), F('apikey', 'Subclient API key', 'Optional'), F('localid', 'Local ID', 'Optional')]),

  E('mediaupload', 'Media', 'Upload media', 'POST', 'media/upload', [F('file', 'Media file', '', true, { type: 'file', full: true })], { multipart: true }),
  E('medialist', 'Media', 'List media', 'GET', 'media/list', [F('page', 'Page', '1'), F('size', 'Page size', '20')]),
  E('mediaget', 'Media', 'Get media', 'GET', 'media/get', [F('id', 'Media ID', 'UUID'), F('filename', 'Filename', 'voice.mp3'), F('section', 'Section', '8')]),
  E('mediadelete', 'Media', 'Delete media', 'DELETE', 'media/delete', [F('id', 'Media ID', 'UUID', true, { full: true })]),

  E('contactadd', 'Contacts & Groups', 'Add contact', 'POST', 'group/add', [F('groupid', 'Group ID', '1', true), F('number', 'Number', '09123456789', true), F('title', 'Title', 'Customer'), F('birthdate', 'Birthdate', 'Unix timestamp'), F('email', 'Email', 'user@example.com'), F('tags', 'Tags', 'vip,customer')]),
  E('groupadd', 'Contacts & Groups', 'Add group', 'POST', 'group/addgroup', [F('name', 'Group name', 'Customers', true), F('tag', 'Tag', 'customers'), F('parent', 'Parent group ID', '0')]),
  E('contactremove', 'Contacts & Groups', 'Remove contact', 'DELETE', 'contact/remove', [F('contactid', 'Contact ID', '1'), F('mobile', 'Mobile', '09123456789'), F('groupid', 'Group ID', '1')]),
  E('groupremove', 'Contacts & Groups', 'Remove group', 'DELETE', 'group/removegroup', [F('groupid', 'Group ID', '1', true, { full: true })]),
  E('grouplist', 'Contacts & Groups', 'List groups', 'GET', 'group/listofgroups', [F('parentid', 'Parent ID', '0')]),
  E('groupedit', 'Contacts & Groups', 'Edit group', 'POST', 'group/editgroup', [F('groupid', 'Group ID', '1', true), F('groupname', 'Group name', 'VIP Customers'), F('status', 'Status', '1'), F('tag', 'Tag', 'vip')]),
  E('groupsearch', 'Contacts & Groups', 'Search groups', 'GET', 'group/search', [F('tag', 'Tag', 'vip', true, { full: true })]),

  E('date', 'Utilities', 'Server date', 'GET', 'utils/getdate'),
  E('ping', 'Utilities', 'Ping', 'GET', 'utils/ping'),
];

const LANGUAGES = {
  dotnet: { label: '.NET', file: 'Program.cs', install: 'dotnet add package kavenegar' },
  go: { label: 'Go', file: 'main.go', install: 'go get github.com/kavenegar/kavenegar-go' },
  java: { label: 'Java', file: 'Main.java', install: "implementation 'com.github.kavenegar:kavenegar-java:v2.0.3'" },
  node: { label: 'Node.js', file: 'index.js', install: 'npm install kavenegar-node' },
  php: { label: 'PHP', file: 'index.php', install: 'composer require kavenegar/php' },
  python: { label: 'Python', file: 'main.py', install: 'pip install kavenegar' },
};

const state = { endpoint: ENDPOINTS[0], language: 'dotnet', response: '', controller: null, requestSequence: 0 };
const $ = (selector) => document.querySelector(selector);
const escapeHtml = (value) => String(value).replace(/[&<>"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[character]);
const nav = $('#endpoint-nav');
const fieldsRoot = $('#dynamic-fields');
const NAV_PAGE_SIZE = 12;
let navLimit = NAV_PAGE_SIZE;
let activeNavQuery = '';
let navObserver;

function applyTheme(theme, persist = true) {
  document.documentElement.dataset.theme = theme;
  const dark = theme === 'dark';
  const toggle = $('#theme-toggle');
  toggle.querySelector('.theme-label').textContent = dark ? 'Light' : 'Dark';
  toggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} mode`);
  toggle.title = `Switch to ${dark ? 'light' : 'dark'} mode`;
  $('#theme-color').content = dark ? '#07111d' : '#f5f7fa';
  if (persist) {
    try { localStorage.setItem('kavenegar-theme', theme); } catch { /* Storage may be unavailable. */ }
  }
}

function renderNavigation(filter = '') {
  navObserver?.disconnect();
  nav.innerHTML = '';
  const query = filter.trim().toLowerCase();
  if (query !== activeNavQuery) {
    activeNavQuery = query;
    navLimit = NAV_PAGE_SIZE;
  }
  const matching = ENDPOINTS.filter(item => `${item.name} ${item.path} ${item.group}`.toLowerCase().includes(query));
  const visible = matching.slice(0, navLimit);
  const groups = [...new Set(visible.map(item => item.group))];
  groups.forEach(group => {
    const items = visible.filter(item => item.group === group);
    const groupTotal = matching.filter(item => item.group === group).length;
    if (!items.length) return;
    const section = document.createElement('details');
    section.className = 'nav-group';
    section.open = Boolean(query) || group === state.endpoint.group;
    section.innerHTML = `<summary class="nav-group-title"><span>${group}</span><span class="topic-count">${items.length === groupTotal ? groupTotal : `${items.length}/${groupTotal}`}</span></summary>`;
    const itemRoot = document.createElement('div');
    itemRoot.className = 'nav-group-items';
    items.forEach(item => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `endpoint-button${item.id === state.endpoint.id ? ' active' : ''}`;
      button.innerHTML = `<span class="mini-method ${item.method.toLowerCase()}">${item.method}</span><span class="endpoint-copy"><span class="endpoint-name">${item.name}</span><span class="endpoint-route">/${item.path}</span></span>`;
      button.addEventListener('click', () => selectEndpoint(item));
      itemRoot.append(button);
    });
    section.append(itemRoot);
    nav.append(section);
  });
  const shown = visible.length;
  if (shown < matching.length) {
    const loader = document.createElement('button');
    loader.type = 'button';
    loader.className = 'endpoint-load-more';
    loader.innerHTML = '<span>Load more routes</span><span class="endpoint-load-dots" aria-hidden="true"><i></i><i></i><i></i></span>';
    loader.addEventListener('click', loadMoreNavigation);
    nav.append(loader);
    if ('IntersectionObserver' in window) {
      navObserver = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        navObserver.disconnect();
        loadMoreNavigation();
      }, { root: $('.sidebar'), rootMargin: '160px 0px', threshold: .01 });
      requestAnimationFrame(() => navObserver?.observe(loader));
    }
  }
}

function loadMoreNavigation() {
  navLimit += NAV_PAGE_SIZE;
  renderNavigation(activeNavQuery);
}

function selectEndpoint(endpoint) {
  state.controller?.abort();
  state.controller = null;
  state.requestSequence += 1;
  const runButton = $('#run-request');
  runButton.disabled = false;
  runButton.classList.remove('is-loading');
  runButton.querySelector('.button-label').textContent = 'Run request';
  state.endpoint = endpoint;
  $('#request-title').textContent = endpoint.title;
  $('#endpoint-path').textContent = `/${endpoint.path}.json`;
  const badge = $('#method-badge');
  badge.textContent = endpoint.method;
  badge.className = `method-badge ${endpoint.method.toLowerCase()}`;
  $('#hero-method').textContent = endpoint.method;
  $('#hero-route').textContent = `/${endpoint.path.split('/').pop()}`;
  $('#hero-route').title = `/${endpoint.path}`;
  $('#hero-live-label').textContent = `${endpoint.group} endpoint`;
  renderFields();
  renderNavigation($('#global-endpoint-search').value);
  renderCode();
  clearResponse();
  $('.hero').classList.add('route-selected');
  animateEndpointChange();
  $('.sidebar').classList.remove('open');
}

function closeSidebar() {
  $('.sidebar').classList.remove('open');
}

function animateEndpointChange() {
  const targets = [$('.request-layout'), $('.examples-section')];
  targets.forEach(target => target.classList.remove('endpoint-changing'));
  void document.body.offsetWidth;
  targets.forEach(target => target.classList.add('endpoint-changing'));
  window.setTimeout(() => targets.forEach(target => target.classList.remove('endpoint-changing')), 520);
}

const BOOLEAN_FIELDS = new Set(['canuseparentlines', 'enablelink', 'cancharge']);
const UNIX_FIELDS = new Set(['date', 'startdate', 'enddate', 'birthdate', 'expiredate']);
const ENUM_FIELDS = new Set(['type', 'status', 'isread', 'blockreason', 'section', 'sourcetype', 'sendmethod', 'fallbackmethod']);

function fieldMeta(field) {
  const key = field.key.toLowerCase();
  if (field.type === 'file') return { tag: 'file', control: 'file' };
  if (field.type === 'textarea') return { tag: 'string', control: 'textarea' };
  if (/json array/i.test(field.label)) return { tag: 'JSON[]', control: 'textarea' };
  if (BOOLEAN_FIELDS.has(key)) return { tag: 'boolean', control: 'boolean' };
  if (UNIX_FIELDS.has(key)) return { tag: 'unix', control: 'text', inputmode: 'numeric' };
  if (ENUM_FIELDS.has(key)) return { tag: 'enum', control: 'text', inputmode: 'numeric' };
  if (key === 'password' || key === 'apikey') return { tag: 'secret', control: 'password', autocomplete: 'new-password' };
  if (/uuid/i.test(field.placeholder)) return { tag: 'uuid', control: 'text' };
  if (key.startsWith('local')) return { tag: 'string', control: 'text' };
  if (key === 'email') return { tag: 'email', control: 'email', autocomplete: 'email' };
  if (key.endsWith('url')) return { tag: 'URL', control: 'url' };
  if (/receptor|mobile|linenumber/.test(key)) return { tag: 'phone', control: 'tel', autocomplete: 'tel' };
  if (/id$|ids$|credit|page|size|ttl|vat/.test(key)) return { tag: 'int64', control: 'text', inputmode: 'numeric' };
  return { tag: 'string', control: 'text' };
}

function createFieldGroup(field) {
  const group = document.createElement('div');
  const meta = fieldMeta(field);
  group.className = `field-group${field.full || meta.control === 'textarea' || meta.control === 'file' ? ' full' : ''}`;
  const safePlaceholder = escapeHtml(field.placeholder);
  const common = `class="field-control" id="field-${field.key}" name="${field.key}" ${field.required ? 'required' : ''}`;
  let control;
  if (meta.control === 'textarea') {
    control = `<textarea ${common} placeholder="${safePlaceholder}" spellcheck="false"></textarea>`;
  } else if (meta.control === 'boolean') {
    control = `<select ${common}><option value="">Select a value</option><option value="1">True (1)</option><option value="0">False (0)</option></select>`;
  } else {
    control = `<input ${common} type="${meta.control}" placeholder="${safePlaceholder}" ${meta.inputmode ? `inputmode="${meta.inputmode}"` : ''} ${meta.autocomplete ? `autocomplete="${meta.autocomplete}"` : 'autocomplete="off"'}>`;
  }
  group.innerHTML = `<label class="field-label" for="field-${field.key}"><span class="field-name">${escapeHtml(field.label)} <code class="field-type">${meta.tag}</code><code class="wire-key">${field.key}</code></span><span class="requirement ${field.required ? 'is-required' : ''}">${field.required ? 'Required' : 'Optional'}</span></label>${control}`;
  const input = group.querySelector('.field-control');
  input.addEventListener('input', renderCode);
  input.addEventListener('change', renderCode);
  return group;
}

function renderFields() {
  fieldsRoot.innerHTML = '';
  const fields = state.endpoint.fields;
  const required = fields.filter(field => field.required);
  const optional = fields.filter(field => !field.required);
  $('#parameters-count').textContent = `${fields.length} parameter${fields.length === 1 ? '' : 's'} · ${required.length} required`;
  if (!state.endpoint.fields.length) {
    fieldsRoot.innerHTML = '<div class="no-parameters"><span>✓</span><div><strong>No parameters required</strong><p>Authenticate and run the request as-is.</p></div></div>';
    return;
  }
  required.forEach(field => fieldsRoot.append(createFieldGroup(field)));
  if (optional.length) {
    const details = document.createElement('details');
    details.className = 'optional-fields';
    details.open = required.length === 0;
    details.innerHTML = `<summary><span>Optional parameters</span><span>${optional.length}</span></summary>`;
    const optionalGrid = document.createElement('div');
    optionalGrid.className = 'fields-grid optional-fields-grid';
    optional.forEach(field => optionalGrid.append(createFieldGroup(field)));
    details.append(optionalGrid);
    fieldsRoot.append(details);
  }
}

function values() {
  return Object.fromEntries(state.endpoint.fields.map(field => {
    const input = $(`#field-${field.key}`);
    const entered = input?.type === 'file' ? input.files?.[0]?.name : input?.value.trim();
    const fallback = field.required ? (field.type === 'file' ? 'path/to/file' : field.placeholder) : '';
    return [field.key, entered || fallback];
  }));
}

const quote = (value, language) => {
  if (language === 'php' && value === null) return 'null';
  const clean = String(value || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r?\n/g, language === 'php' ? ' ' : '\\n');
  return `"${clean}"`;
};

function transportExample(language) {
  const endpoint = state.endpoint;
  const allValues = values();
  const params = Object.entries(allValues).filter(([key, value]) => value && key !== 'file');
  const method = endpoint.method;
  const path = endpoint.path;
  const queryMethod = method === 'GET' || method === 'DELETE';
  const multipart = Boolean(endpoint.multipart);
  const filePath = allValues.file || 'path/to/file';
  const jsParams = JSON.stringify(Object.fromEntries(params), null, 2);

  if (language === 'dotnet') {
    const entries = params.map(([key, value]) => `    [${quote(key)}] = ${quote(value)},`).join('\n');
    const content = multipart
      ? `using var form = new MultipartFormDataContent();\nawait using var file = File.OpenRead(${quote(filePath)});\nform.Add(new StreamContent(file), "file", Path.GetFileName(file.Name));\nrequest.Content = form;`
      : queryMethod ? `url += parameters.Count == 0 ? "" : "?" + string.Join("&", parameters.Select(p => $"{Uri.EscapeDataString(p.Key)}={Uri.EscapeDataString(p.Value)}"));`
        : `request.Content = new FormUrlEncodedContent(parameters);`;
    return `using System.Net.Http;\n\nvar apiKey = Environment.GetEnvironmentVariable("KAVENEGAR_API_KEY")!;\nvar url = $"https://api.kavenegar.com/v1/{apiKey}/${path}.json";\nvar parameters = new Dictionary<string, string>\n{\n${entries}\n};\n${queryMethod ? content : ''}\nusing var http = new HttpClient();\nusing var request = new HttpRequestMessage(HttpMethod.${method[0] + method.slice(1).toLowerCase()}, url);\n${queryMethod ? '' : content}\nusing var response = await http.SendAsync(request);\nConsole.WriteLine(await response.Content.ReadAsStringAsync());`;
  }
  if (language === 'go') {
    const sets = params.map(([key, value]) => `\tform.Set(${quote(key)}, ${quote(value)})`).join('\n');
    if (multipart) return `package main\n\nimport (\n\t"bytes"\n\t"fmt"\n\t"io"\n\t"mime/multipart"\n\t"net/http"\n\t"os"\n\t"path/filepath"\n)\n\nfunc main() {\n\tfile, _ := os.Open(${quote(filePath)})\n\tdefer file.Close()\n\tvar body bytes.Buffer\n\tform := multipart.NewWriter(&body)\n\tpart, _ := form.CreateFormFile("file", filepath.Base(file.Name()))\n\tio.Copy(part, file)\n\tform.Close()\n\tendpoint := fmt.Sprintf("https://api.kavenegar.com/v1/%s/${path}.json", os.Getenv("KAVENEGAR_API_KEY"))\n\treq, _ := http.NewRequest("POST", endpoint, &body)\n\treq.Header.Set("Content-Type", form.FormDataContentType())\n\tres, err := http.DefaultClient.Do(req)\n\tfmt.Println(res, err)\n}`;
    return `package main\n\nimport (\n\t"fmt"\n\t"net/http"\n\t"net/url"\n\t"os"\n\t"strings"\n)\n\nfunc main() {\n\tform := url.Values{}\n${sets}\n\tendpoint := fmt.Sprintf("https://api.kavenegar.com/v1/%s/${path}.json", os.Getenv("KAVENEGAR_API_KEY"))\n${queryMethod ? '\tif len(form) > 0 { endpoint += "?" + form.Encode() }\n\tbody := strings.NewReader("")' : '\tbody := strings.NewReader(form.Encode())'}\n\treq, _ := http.NewRequest("${method}", endpoint, body)\n${queryMethod ? '' : '\treq.Header.Set("Content-Type", "application/x-www-form-urlencoded")'}\n\tres, err := http.DefaultClient.Do(req)\n\tfmt.Println(res, err)\n}`;
  }
  if (language === 'java') {
    const puts = params.map(([key, value]) => `        params.put(${quote(key)}, ${quote(value)});`).join('\n');
    if (multipart) return `import java.io.ByteArrayOutputStream;\nimport java.net.URI;\nimport java.net.http.*;\nimport java.nio.charset.StandardCharsets;\nimport java.nio.file.*;\n\npublic class Main {\n  public static void main(String[] args) throws Exception {\n    var file = Path.of(${quote(filePath)});\n    var boundary = "KavenegarBoundary" + System.currentTimeMillis();\n    var out = new ByteArrayOutputStream();\n    out.write(("--" + boundary + "\\r\\nContent-Disposition: form-data; name=\\\"file\\\"; filename=\\\"" + file.getFileName() + "\\\"\\r\\nContent-Type: application/octet-stream\\r\\n\\r\\n").getBytes(StandardCharsets.UTF_8));\n    out.write(Files.readAllBytes(file));\n    out.write(("\\r\\n--" + boundary + "--\\r\\n").getBytes(StandardCharsets.UTF_8));\n    var url = "https://api.kavenegar.com/v1/" + System.getenv("KAVENEGAR_API_KEY") + "/${path}.json";\n    var request = HttpRequest.newBuilder(URI.create(url)).header("Content-Type", "multipart/form-data; boundary=" + boundary).POST(HttpRequest.BodyPublishers.ofByteArray(out.toByteArray())).build();\n    var response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());\n    System.out.println(response.body());\n  }\n}`;
    return `import java.net.URI;\nimport java.net.URLEncoder;\nimport java.net.http.*;\nimport java.nio.charset.StandardCharsets;\nimport java.util.*;\nimport java.util.stream.Collectors;\n\npublic class Main {\n  public static void main(String[] args) throws Exception {\n    var params = new LinkedHashMap<String, String>();\n${puts}\n    var encoded = params.entrySet().stream().map(e -> URLEncoder.encode(e.getKey(), StandardCharsets.UTF_8) + "=" + URLEncoder.encode(e.getValue(), StandardCharsets.UTF_8)).collect(Collectors.joining("&"));\n    var url = "https://api.kavenegar.com/v1/" + System.getenv("KAVENEGAR_API_KEY") + "/${path}.json";\n    ${queryMethod ? 'if (!encoded.isEmpty()) url += "?" + encoded;' : ''}\n    var builder = HttpRequest.newBuilder(URI.create(url));\n    ${queryMethod ? `builder.method("${method}", HttpRequest.BodyPublishers.noBody());` : `builder.header("Content-Type", "application/x-www-form-urlencoded").POST(HttpRequest.BodyPublishers.ofString(encoded));`}\n    var response = HttpClient.newHttpClient().send(builder.build(), HttpResponse.BodyHandlers.ofString());\n    System.out.println(response.body());\n  }\n}`;
  }
  if (language === 'node') {
    if (multipart) return `import { readFile } from 'node:fs/promises';\nimport { basename } from 'node:path';\n\nconst apiKey = process.env.KAVENEGAR_API_KEY;\nconst filePath = ${quote(filePath)};\nconst form = new FormData();\nform.set('file', new Blob([await readFile(filePath)]), basename(filePath));\nconst response = await fetch(\`https://api.kavenegar.com/v1/\${apiKey}/${path}.json\`, { method: 'POST', body: form });\nconsole.log(await response.json());`;
    return `const apiKey = process.env.KAVENEGAR_API_KEY;\nconst params = new URLSearchParams(${jsParams});\nlet url = \`https://api.kavenegar.com/v1/\${apiKey}/${path}.json\`;\n${queryMethod ? `if (params.size) url += \`?\${params}\`;` : ''}\nconst response = await fetch(url, {\n  method: '${method}',${queryMethod ? '' : "\n  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },\n  body: params,"}\n});\nconsole.log(await response.json());`;
  }
  if (language === 'php') {
    const entries = params.map(([key, value]) => `    ${quote(key, 'php')} => ${quote(value, 'php')},`).join('\n');
    return `<?php\n$apiKey = getenv('KAVENEGAR_API_KEY');\n$url = "https://api.kavenegar.com/v1/{$apiKey}/${path}.json";\n$params = [\n${entries}\n];\n${queryMethod ? `if ($params) $url .= '?' . http_build_query($params);` : ''}\n$curl = curl_init($url);\ncurl_setopt($curl, CURLOPT_RETURNTRANSFER, true);\ncurl_setopt($curl, CURLOPT_CUSTOMREQUEST, '${method}');\n${multipart ? `curl_setopt($curl, CURLOPT_POSTFIELDS, ['file' => new CURLFile(${quote(filePath, 'php')})]);` : queryMethod ? '' : `curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($params));`}\necho curl_exec($curl);\ncurl_close($curl);`;
  }
  return `import os\nimport httpx\n\napi_key = os.environ["KAVENEGAR_API_KEY"]\nurl = f"https://api.kavenegar.com/v1/{api_key}/${path}.json"\nparams = ${jsParams.replace(/true/g, 'True').replace(/false/g, 'False')}\n${multipart ? `with open(${quote(filePath)}, "rb") as file:\n    response = httpx.request("POST", url, files={"file": file})` : `response = httpx.request("${method}", url, ${queryMethod ? 'params' : 'data'}=params)`}\nresponse.raise_for_status()\nprint(response.json())`;
}

function sdkExample(language) {
  return SDKExamples.generate(language, state.endpoint, values());
}

function curlExample() {
  const endpoint = state.endpoint;
  const shellQuote = value => String(value).replace(/'/g, `'"'"'`);
  const url = `https://api.kavenegar.com/v1/\${KAVENEGAR_API_KEY}/${endpoint.path}.json`;
  if (endpoint.multipart) {
    return `curl --request POST \\\n+  --url '${url}' \\\n+  --form 'file=@${shellQuote(values().file || 'path/to/file')}'`;
  }
  const flags = Object.entries(values()).filter(([, value]) => value).map(([key, value]) => `  --data-urlencode '${key}=${shellQuote(value)}'`).join(' \\\n+');
  const query = endpoint.method === 'GET' || endpoint.method === 'DELETE';
  return `curl --request ${endpoint.method} \\\n+  --url '${url}'${query && flags ? ' \\\n+  --get' : ''}${flags ? ` \\\n+${flags}` : ''}`;
}

function renderLanguages() {
  const root = $('#language-tabs');
  root.innerHTML = '';
  Object.entries(LANGUAGES).forEach(([key, language]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'tab';
    button.className = `language-tab${key === state.language ? ' active' : ''}`;
    button.textContent = language.label;
    button.addEventListener('click', () => { state.language = key; renderLanguages(); renderCode(); });
    root.append(button);
  });
}

function renderCode() {
  const language = LANGUAGES[state.language];
  $('#code-filename').textContent = language.file;
  $('#install-command').textContent = language.install;
  $('#code-output').textContent = sdkExample(state.language);
}

async function runRequest(event) {
  event.preventDefault();
  const key = $('#api-key').value.trim();
  if (!key) { $('#api-key').focus(); showToast('Enter your API key first'); return; }
  const data = new FormData(event.currentTarget);
  const params = new URLSearchParams();
  for (const [name, value] of data.entries()) if (typeof value === 'string' && value.trim()) params.set(name, value.trim());
  const base = `https://api.kavenegar.com/v1/${encodeURIComponent(key)}/${state.endpoint.path}.json`;
  const usesQuery = state.endpoint.method === 'GET' || state.endpoint.method === 'DELETE';
  const isMultipart = Boolean(state.endpoint.multipart);
  const url = usesQuery && params.size ? `${base}?${params}` : base;
  const button = $('#run-request');
  state.controller?.abort();
  const controller = new AbortController();
  const requestId = ++state.requestSequence;
  state.controller = controller;
  button.disabled = true;
  button.classList.add('is-loading');
  button.querySelector('.button-label').textContent = 'Sending…';
  setResponseLoading(true);
  if (window.matchMedia('(max-width: 1050px)').matches) {
    $('.response-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  const started = performance.now();
  try {
    const response = await fetch(url, {
      method: state.endpoint.method,
      headers: usesQuery || isMultipart ? {} : { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: usesQuery ? undefined : isMultipart ? data : params.toString(),
      signal: controller.signal,
    });
    const text = await response.text();
    let payload; try { payload = JSON.parse(text); } catch { payload = { raw: text }; }
    state.response = JSON.stringify(payload, null, 2);
    const networkTime = Math.round(performance.now() - started);
    await new Promise(resolve => setTimeout(resolve, Math.max(0, 480 - networkTime)));
    if (requestId !== state.requestSequence) return;
    showResponse(response.ok, `${response.status} ${response.statusText}`, networkTime);
  } catch (error) {
    if (error.name === 'AbortError') return;
    state.response = JSON.stringify({ error: 'Request could not be completed', message: error.message, hint: 'If the browser reports a CORS error, run this playground behind a same-origin server or API proxy.' }, null, 2);
    const networkTime = Math.round(performance.now() - started);
    await new Promise(resolve => setTimeout(resolve, Math.max(0, 480 - networkTime)));
    if (requestId !== state.requestSequence) return;
    showResponse(false, 'Network error', networkTime);
  } finally {
    if (requestId === state.requestSequence) {
      state.controller = null;
      button.disabled = false;
      button.classList.remove('is-loading');
      button.querySelector('.button-label').textContent = 'Run request';
    }
  }
}

function setResponseLoading(active) {
  const panel = $('.response-panel');
  const layout = $('.request-layout');
  panel.classList.toggle('is-loading', active);
  panel.setAttribute('aria-busy', String(active));
  layout.classList.toggle('is-requesting', active);
  $('#response-loading').hidden = !active;
  if (active) {
    $('#loading-endpoint').textContent = `${state.endpoint.method} /${state.endpoint.path}.json`;
    $('#response-empty').hidden = true;
    $('#response-output').hidden = true;
    $('#response-meta').hidden = true;
    $('#copy-response').disabled = true;
    $('#clear-response').disabled = true;
  }
}

function showResponse(ok, status, time) {
  setResponseLoading(false);
  const panel = $('.response-panel');
  panel.classList.remove('result-success', 'result-error', 'is-revealing');
  void panel.offsetWidth;
  panel.classList.add(ok ? 'result-success' : 'result-error', 'is-revealing');
  $('#response-empty').hidden = true;
  const output = $('#response-output'); output.hidden = false; output.querySelector('code').textContent = state.response;
  $('#response-meta').hidden = false;
  const statusNode = $('#response-status'); statusNode.textContent = status; statusNode.className = ok ? 'success' : 'error';
  $('#response-time').textContent = `${time} ms`;
  $('#copy-response').disabled = false;
  $('#clear-response').disabled = false;
}

function clearResponse() {
  state.response = '';
  setResponseLoading(false);
  $('.response-panel').classList.remove('result-success', 'result-error', 'is-revealing');
  $('#response-empty').hidden = false;
  $('#response-output').hidden = true;
  $('#response-meta').hidden = true;
  $('#copy-response').disabled = true;
  $('#clear-response').disabled = true;
}

async function copy(text, message = 'Copied to clipboard') {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.append(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
    showToast(message);
  } catch {
    showToast('Copy failed — select the text manually');
  }
}
let toastTimer;
function showToast(message) { const toast = $('#toast'); toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 1800); }

function syncEndpointSearch(value, source) {
  const globalSearch = $('#global-endpoint-search');
  if (source !== globalSearch) globalSearch.value = value;
  renderNavigation(value);
}

$('#global-endpoint-search').addEventListener('input', event => syncEndpointSearch(event.target.value, event.target));
$('#theme-toggle').addEventListener('click', () => applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
$('#toggle-key').addEventListener('click', event => { const input = $('#api-key'); const visible = input.type === 'text'; input.type = visible ? 'password' : 'text'; event.currentTarget.textContent = visible ? 'Show' : 'Hide'; event.currentTarget.setAttribute('aria-label', visible ? 'Show API key' : 'Hide API key'); });
$('#api-key').addEventListener('input', event => { const ready = Boolean(event.target.value.trim()); const status = $('#key-status'); status.textContent = ready ? 'Ready' : 'Secure'; status.classList.toggle('ready', ready); });
$('#request-form').addEventListener('submit', runRequest);
$('#reset-request').addEventListener('click', () => { $('#request-form').reset(); renderCode(); showToast('Request fields reset'); });
$('#copy-curl').addEventListener('click', () => copy(curlExample(), 'cURL request copied'));
$('#clear-response').addEventListener('click', clearResponse);
$('#copy-response').addEventListener('click', () => copy(state.response));
$('#copy-code').addEventListener('click', () => copy($('#code-output').textContent, `${LANGUAGES[state.language].label} example copied`));
$('#copy-install').addEventListener('click', () => copy($('#install-command').textContent, 'Install command copied'));
$('.menu-button').addEventListener('click', () => $('.sidebar').classList.add('open'));
$('.mobile-close').addEventListener('click', closeSidebar);
$('.sidebar-scrim').addEventListener('click', closeSidebar);
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeSidebar(); });
document.addEventListener('keydown', event => {
  if (event.key !== '/' || /input|textarea|select/i.test(document.activeElement?.tagName)) return;
  event.preventDefault();
  $('#global-endpoint-search').focus();
});

applyTheme(document.documentElement.dataset.theme || 'light', false);

renderNavigation();
renderFields();
renderLanguages();
renderCode();
